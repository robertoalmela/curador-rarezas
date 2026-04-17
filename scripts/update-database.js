// ============================================
// SCRIPT: Actualiza la base de datos con IA
// Ejecutar diariamente con GitHub Actions o cron
// ============================================

// REQUISITOS:
// - Node.js 18+
// - npm install openai
// - Variable de entorno: OPENAI_API_KEY

import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicializa OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Categorías en rotación para variedad diaria
const categorias = [
  "herramienta_ai",
  "tecnica_fotografia", 
  "recurso_diseno",
  "proyecto_visual",
  "concepto_investigacion"
];
const diaDelAnio = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
const categoriaHoy = categorias[diaDelAnio % categorias.length];

// Prompt para la IA
const DISCOVERY_PROMPT = `Eres un curador especializado en fotografía profesional, diseño visual e inteligencia artificial creativa. Tu misión es encontrar contenido genuinamente raro, poco conocido o infravalorado dentro de estos mundos.

HOY debes generar exactamente 10 descubrimientos nuevos. La categoría de hoy es: ${categoriaHoy}.

CATEGORÍAS EN ROTACIÓN (usa la que corresponda según el día):
- "herramienta_ai" → Apps, modelos o pipelines de IA para imagen/vídeo/diseño con poca visibilidad
- "tecnica_fotografia" → Métodos de iluminación, óptica, procesos híbridos analógico-digital, física de la imagen
- "recurso_diseno" → Fuentes, sistemas de color, librerías, datasets visuales o archivos históricos libres
- "proyecto_visual" → Obras, instalaciones, experimentos artísticos con tecnología no convencional
- "concepto_investigacion" → Papers, teorías o estudios sobre percepción visual, luz, color o IA generativa

REGLAS OBLIGATORIAS:
1. Nada que aparezca en la primera página de Google buscándolo directamente
2. Evitar: ProductHunt top charts, PetaPixel, Creative Bloq, TechCrunch, Futurism
3. Priorizar: GitHub repos con pocas estrellas, arxiv accesible, blogs de practitioners, proyectos universitarios poco citados, tools en beta
4. Cada descubrimiento debe tener URL real y verificable

Devuelve SOLO un array JSON válido con esta estructura exacta, sin texto adicional:
[
  {
    "category": "nombre de la categoría en español",
    "title": "Título específico y llamativo",
    "url": "https://url-real.com",
    "description": "Qué es, por qué es raro o valioso, y qué lo diferencia. 2-3 frases.",
    "quote": "Una idea provocadora o dato sorprendente relacionado con el descubrimiento."
  }
]`;

// Lee la base de datos actual
function loadCurrentDatabase() {
    const scriptPath = path.join(__dirname, '../script.js');
    const content = fs.readFileSync(scriptPath, 'utf-8');

    // Extrae el array de descubrimientos
    const match = content.match(/const discoveriesDatabase = (\[[\s\S]*?\]);/);
    if (match) {
        // Evalúa de forma segura (solo para desarrollo)
        const dbArray = eval(match[1]);
        return dbArray;
    }
    return [];
}

// Normaliza una URL para comparaciones: lowercase, sin protocolo, sin www, sin trailing slash
function normalizeUrl(url) {
    if (!url) return '';
    return url
        .toLowerCase()
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .replace(/\/+$/, '')
        .trim();
}

// Extrae el dominio base de una URL
function extractDomain(url) {
    if (!url) return '';
    const normalized = normalizeUrl(url);
    const slash = normalized.indexOf('/');
    return slash === -1 ? normalized : normalized.substring(0, slash);
}

// Genera lista de URLs existentes para evitar duplicados
function getExistingURLs(database) {
    return database.map(d => d.url);
}

// Genera lista de títulos existentes para evitar duplicados semánticos
function getExistingTitles(database) {
    return database.map(d => d.title.toLowerCase().trim());
}

// Extrae un objeto JSON desde una respuesta que puede traer texto extra o markdown
function extractJsonObject(text) {
    if (!text) return null;

    // Quita fences de markdown si existen
    const noFences = String(text)
        .replace(/```json\s*/gi, '')
        .replace(/```\s*/g, '')
        .trim();

    // Caso ideal: es JSON puro
    try {
        return JSON.parse(noFences);
    } catch (_) {
        // sigue intentando
    }

    // Fallback: recorta desde el primer "{" o "[" hasta el último "}" o "]"
    const start = Math.min(
        noFences.indexOf('{') === -1 ? Infinity : noFences.indexOf('{'),
        noFences.indexOf('[') === -1 ? Infinity : noFences.indexOf('[')
    );
    const end = Math.max(
        noFences.lastIndexOf('}'),
        noFences.lastIndexOf(']')
    );
    
    if (start === Infinity || end === -1 || end <= start) return null;

    const candidate = noFences.slice(start, end + 1);
    try {
        return JSON.parse(candidate);
    } catch (_) {
        return null;
    }
}

// ==================== NUEVO: ARCHIVO HISTÓRICO DE DESCUBRIMIENTOS ENVIADOS ====================
// Lee el histórico de descubrimientos que ya han sido ENVIADOS por email
function loadSentDiscoveriesArchive() {
    const archivePath = path.join(__dirname, 'sent-discoveries-archive.json');
    if (fs.existsSync(archivePath)) {
        try {
            return JSON.parse(fs.readFileSync(archivePath, 'utf-8'));
        } catch (error) {
            console.error('⚠️  Error al leer sent-discoveries-archive.json, usando vacío:', error.message);
            return { sent: [] };
        }
    }
    return { sent: [] };
}

// Guarda el histórico
function saveSentDiscoveriesArchive(archive) {
    const archivePath = path.join(__dirname, 'sent-discoveries-archive.json');
    archive.lastUpdated = new Date().toISOString();
    archive.sentCount = (archive.sent || []).length;
    fs.writeFileSync(archivePath, JSON.stringify(archive, null, 2), 'utf-8');
}

// Crea un hash simple de una URL para detectar variaciones
function hashUrl(url) {
    if (!url) return '';
    const normalized = normalizeUrl(url);
    // Toma los primeros 50 chars normalizados para comparar
    return normalized.substring(0, 50);
}

// Calcula similitud simple entre dos strings (Levenshtein distancia simplificada)
function calculateSimilarity(a, b) {
    if (!a || !b) return 0;
    const aLower = a.toLowerCase().trim();
    const bLower = b.toLowerCase().trim();
    
    // Si ya son idénticos
    if (aLower === bLower) return 1;
    
    // Si uno contiene al otro (substring)
    if (aLower.includes(bLower) || bLower.includes(aLower)) return 0.8;
    
    // Conta palabras comunes
    const aWords = new Set(aLower.split(/\s+/).filter(w => w.length > 3));
    const bWords = new Set(bLower.split(/\s+/).filter(w => w.length > 3));
    
    const commonWords = [...aWords].filter(w => bWords.has(w)).length;
    const totalWords = new Set([...aWords, ...bWords]).size;
    
    return totalWords === 0 ? 0 : commonWords / totalWords;
}

// ==================== DEDUPLICACIÓN SEVERA ====================
// Filtra descubrimientos duplicados con comprobación EXHAUSTIVA
function filterDuplicates(newDiscoveries, existingUrls, existingTitles, sentArchive) {
    const normalizedExistingUrls = new Set(existingUrls.map(normalizeUrl));
    const existingDomains = new Set(existingUrls.map(extractDomain));
    const normalizedExistingTitles = new Set(existingTitles);
    
    // Dos nuevas validaciones severas
    const sentArchiveUrls = new Set((sentArchive.sent || []).map(d => normalizeUrl(d.url || '')));
    const sentArchiveTitles = new Set((sentArchive.sent || []).map(d => (d.title || '').toLowerCase().trim()));

    // Rastreamos los nuevos para no añadir duplicados dentro del mismo batch
    const seenUrls = new Set();
    const seenTitles = new Set();

    return newDiscoveries.filter(d => {
        if (!d.url || !d.title) {
            console.log(`  ⏭️  Descartado (sin URL o título): ${d.title || '(sin título)'}`);
            return false;
        }

        const normUrl = normalizeUrl(d.url);
        const normTitle = d.title.toLowerCase().trim();
        const domain = extractDomain(d.url);

        // ===== NIVEL 1: URL exacta normalizada (en BD actual) =====
        if (normalizedExistingUrls.has(normUrl) || seenUrls.has(normUrl)) {
            console.log(`  ⏭️  Duplicado L1 (URL exacta en BD): ${d.title}`);
            return false;
        }

        // ===== NIVEL 2: URL exacta normalizada (en histórico de ENVIADOS) =====
        if (sentArchiveUrls.has(normUrl)) {
            console.log(`  ⏭️  Duplicado L2 (URL ya ENVIADA): ${d.title} → ${d.url}`);
            return false;
        }

        // ===== NIVEL 3: Título exacto (en BD actual) =====
        if (normalizedExistingTitles.has(normTitle) || seenTitles.has(normTitle)) {
            console.log(`  ⏭️  Duplicado L3 (Título exacto en BD): ${d.title}`);
            return false;
        }

        // ===== NIVEL 4: Título exacto (en histórico de ENVIADOS) =====
        if (sentArchiveTitles.has(normTitle)) {
            console.log(`  ⏭️  Duplicado L4 (Título ya ENVIADO): ${d.title}`);
            return false;
        }

        // ===== NIVEL 5: Similitud de título (>85%) =====
        for (const existingTitle of existingTitles) {
            const similarity = calculateSimilarity(d.title, existingTitle);
            if (similarity > 0.85) {
                console.log(`  ⏭️  Duplicado L5 (Título similar 85%+ en BD): "${d.title}" ≈ "${existingTitle}"`);
                return false;
            }
        }

        // ===== NIVEL 6: Similitud de título contra histórico (>85%) =====
        for (const sentDiscovery of (sentArchive.sent || [])) {
            const similarity = calculateSimilarity(d.title, sentDiscovery.title || '');
            if (similarity > 0.85) {
                console.log(`  ⏭️  Duplicado L6 (Título similar 85%+ en ENVIADOS): "${d.title}"`);
                return false;
            }
        }

        // ===== NIVEL 7: Mismo dominio + categoría similar (evita múltiples items del mismo site) =====
        if (normalizedExistingUrls.has(domain)) {
            console.log(`  ⚠️  Mismo dominio (L7) pero se añade: ${d.title} → ${domain}`);
        }

        // ===== NIVEL 8: Descripción muy corta o genérica (posible generación falsa) =====
        if (!d.description || d.description.length < 20) {
            console.log(`  ⏭️  Descartado L8 (descripción muy corta/vacía): ${d.title}`);
            return false;
        }

        seenUrls.add(normUrl);
        seenTitles.add(normTitle);
        return true;
    });
}

// Llama a OpenAI para generar nuevos descubrimientos
async function generateDiscoveries(existingUrls, existingTitles) {
    console.log('🤖 Consultando a la IA...');

    // Envía TODAS las URLs y títulos existentes (sin límite)
    const existingUrlList = existingUrls.map(u => `  - ${u}`).join('\n');
    const existingTitleList = existingTitles.map(t => `  - ${t}`).join('\n');

    const fullPrompt = `${DISCOVERY_PROMPT}

URLS YA EN LA BASE DE DATOS (NO REPETIR NINGUNA, NI PARECIDAS):
${existingUrlList}

TÍTULOS YA USADOS (NO REPETIR):
${existingTitleList}

Ahora genera 10 descubrimientos completamente nuevos y únicos:`;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                { role: 'system', content: 'Eres el curador cultural de un estudio de diseño. Encuentras cosas que nadie más encuentra. Tu obsesión es la calidad, no la cantidad. Solo recomiendas cosas que existen de verdad.' },
                { role: 'user', content: fullPrompt }
            ],
            response_format: { type: 'json_object' },
            temperature: 0.95,
            max_tokens: 4000
        });

        const raw = (response?.choices?.[0]?.message?.content ?? '').trim();
        const parsed = extractJsonObject(raw);

        if (!parsed) {
            console.error('❌ Respuesta no parseable como JSON. Primeros 500 chars:', raw.slice(0, 500));
            return [];
        }

        // El nuevo prompt devuelve un array directo
        return Array.isArray(parsed) ? parsed : (parsed.discoveries || []);
    } catch (error) {
        console.error('❌ Error al generar descubrimientos:', error);
        return [];
    }
}

// Añade nuevos descubrimientos a script.js
function appendToDatabase(newDiscoveries) {
    if (!newDiscoveries || newDiscoveries.length === 0) {
        console.log('⚠️  No hay nuevos descubrimientos para añadir.');
        return;
    }

    const scriptPath = path.join(__dirname, '../script.js');
    let content = fs.readFileSync(scriptPath, 'utf-8');

    // Encuentra el final del array discoveriesDatabase
    // Busca el último } antes de ];
    const arrayEndIndex = content.lastIndexOf('];');
    if (arrayEndIndex === -1) {
        console.error('❌ No se encontró el cierre del array discoveriesDatabase');
        return;
    }

    // Encuentra el último } antes de ];
    let lastBraceIndex = -1;
    for (let i = arrayEndIndex - 1; i >= 0; i--) {
        if (content[i] === '}') {
            lastBraceIndex = i;
            break;
        }
    }

    if (lastBraceIndex === -1) {
        console.error('❌ No se encontró el último objeto en el array');
        return;
    }

    // Genera el código de los nuevos items
    const newItemsCode = newDiscoveries.map(d => {
        // Escapar comillas en las strings
        const title = d.title.replace(/"/g, '\\"');
        const description = d.description.replace(/"/g, '\\"');
        const quote = d.quote.replace(/"/g, '\\"');

        return `    {
        category: "${d.category}",
        title: "${title}",
        url: "${d.url}",
        description: "${description}",
        quote: "${quote}"
    }`;
    }).join(',\n');

    // Inserta después del último } con una coma
    const before = content.substring(0, lastBraceIndex + 1);
    const after = content.substring(lastBraceIndex + 1);
    content = before + ',\n' + newItemsCode + after;

    // Guarda el archivo actualizado
    fs.writeFileSync(scriptPath, content, 'utf-8');
    console.log(`✅ Añadidos ${newDiscoveries.length} nuevos descubrimientos a script.js`);
}

// Main
async function main() {
    console.log('🔍 Actualizando base de datos con IA...\n');

    // 1. Carga base de datos actual
    const currentDb = loadCurrentDatabase();
    console.log(`📚 Base de datos actual: ${currentDb.length} items`);

    // 1b. Carga el histórico de descubrimientos ENVIADOS
    const sentArchive = loadSentDiscoveriesArchive();
    console.log(`📦 Histórico de enviados: ${sentArchive.sent?.length || 0} items`);

    // 2. Obtiene URLs y títulos existentes
    const existingUrls = getExistingURLs(currentDb);
    const existingTitles = getExistingTitles(currentDb);
    console.log(`🔗 URLs existentes: ${existingUrls.length}`);
    console.log(`📝 Títulos existentes: ${existingTitles.length}`);

    // 3. Genera nuevos descubrimientos con IA
    const rawDiscoveries = await generateDiscoveries(existingUrls, existingTitles);
    console.log(`\n🤖 La IA generó ${rawDiscoveries.length} descubrimientos`);

    // 4. Filtra duplicados con deduplicación SEVERA (ve contra BD actual + histórico de enviados)
    console.log('\n🔍 Filtrando duplicados (8 niveles de validación)...');
    const newDiscoveries = filterDuplicates(rawDiscoveries, existingUrls, existingTitles, sentArchive);
    console.log(`\n✅ ${newDiscoveries.length} descubrimientos únicos después del filtrado`);

    if (rawDiscoveries.length !== newDiscoveries.length) {
        console.log(`⚠️  Se descartaron ${rawDiscoveries.length - newDiscoveries.length} duplicados`);
    }

    if (newDiscoveries.length > 0) {
        // Muestra los nuevos
        console.log('\n🆕 Nuevos descubrimientos (listos para enviar):');
        newDiscoveries.forEach((d, i) => {
            console.log(`  ${i + 1}. [${d.category}] ${d.title}`);
            console.log(`     ${d.url}`);
        });

        // 5. Añade a script.js
        appendToDatabase(newDiscoveries);

        // 6. NUEVO: Registra en el histórico de enviados (marca como "potencial para enviar")
        console.log('\n📦 Registrando en histórico (para validación en envío)...');
        for (const discovery of newDiscoveries) {
            sentArchive.sent.push({
                title: discovery.title,
                url: discovery.url,
                category: discovery.category,
                addedToDb: new Date().toISOString(),
                sent: false  // Aún no se ha enviado por email
            });
        }
        saveSentDiscoveriesArchive(sentArchive);
        console.log(`  ✓ Registrados ${newDiscoveries.length} descubrimientos en histórico`);

        console.log('\n✨ Base de datos actualizada exitosamente!');
    } else {
        console.log('\n⚠️  No se encontraron descubrimientos nuevos no-duplicados.');
    }
}

// Ejecuta
main().catch(console.error);
