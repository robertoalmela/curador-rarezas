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

    // Fallback: recorta desde el primer "{" hasta el último "}"
    const start = noFences.indexOf('{');
    const end = noFences.lastIndexOf('}');
    if (start === -1 || end === -1 || end <= start) return null;

    const candidate = noFences.slice(start, end + 1);
    try {
        return JSON.parse(candidate);
    } catch (_) {
        return null;
    }
}

// Filtra descubrimientos duplicados comparando URL normalizada, título y dominio
function filterDuplicates(newDiscoveries, existingUrls, existingTitles) {
    const normalizedExistingUrls = new Set(existingUrls.map(normalizeUrl));
    const existingDomains = new Set(existingUrls.map(extractDomain));
    const normalizedExistingTitles = new Set(existingTitles);

    // También rastreamos los nuevos para no añadir duplicados dentro del mismo batch
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

        // Comprueba URL exacta normalizada
        if (normalizedExistingUrls.has(normUrl) || seenUrls.has(normUrl)) {
            console.log(`  ⏭️  Duplicado por URL: ${d.title} → ${d.url}`);
            return false;
        }

        // Comprueba título exacto
        if (normalizedExistingTitles.has(normTitle) || seenTitles.has(normTitle)) {
            console.log(`  ⏭️  Duplicado por título: ${d.title}`);
            return false;
        }

        // Comprueba dominio (para evitar múltiples entradas del mismo sitio)
        if (normalizedExistingUrls.has(domain) || existingDomains.has(domain)) {
            // Solo avisamos pero NO descartamos por dominio — puede haber páginas diferentes del mismo sitio
            console.log(`  ⚠️  Mismo dominio que una entrada existente: ${d.title} → ${domain} (se añade igualmente)`);
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

    // 2. Obtiene URLs y títulos existentes
    const existingUrls = getExistingURLs(currentDb);
    const existingTitles = getExistingTitles(currentDb);
    console.log(`🔗 URLs existentes: ${existingUrls.length}`);
    console.log(`📝 Títulos existentes: ${existingTitles.length}`);

    // 3. Genera nuevos descubrimientos con IA
    const rawDiscoveries = await generateDiscoveries(existingUrls, existingTitles);
    console.log(`\n🤖 La IA generó ${rawDiscoveries.length} descubrimientos`);

    // 4. Filtra duplicados programáticamente (por URL normalizada, título y dominio)
    console.log('\n🔍 Filtrando duplicados...');
    const newDiscoveries = filterDuplicates(rawDiscoveries, existingUrls, existingTitles);
    console.log(`\n✅ ${newDiscoveries.length} descubrimientos únicos después del filtrado`);

    if (rawDiscoveries.length !== newDiscoveries.length) {
        console.log(`⚠️  Se descartaron ${rawDiscoveries.length - newDiscoveries.length} duplicados`);
    }

    if (newDiscoveries.length > 0) {
        // Muestra los nuevos
        console.log('\n🆕 Nuevos descubrimientos:');
        newDiscoveries.forEach((d, i) => {
            console.log(`  ${i + 1}. [${d.category}] ${d.title}`);
            console.log(`     ${d.url}`);
        });

        // 5. Añade a script.js
        appendToDatabase(newDiscoveries);

        console.log('\n✨ Base de datos actualizada exitosamente!');
    } else {
        console.log('\n⚠️  No se encontraron descubrimientos nuevos no-duplicados.');
    }
}

// Ejecuta
main().catch(console.error);
