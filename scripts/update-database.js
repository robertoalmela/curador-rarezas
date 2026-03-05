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

// Prompt para la IA
const DISCOVERY_PROMPT = `Eres un curador cultural obsesivo que trabaja en un estudio de diseño creativo. No eres un algoritmo — eres esa persona del equipo que siempre llega el lunes con links imposibles que encontró a las 2am.

Tu tarea es encontrar 10 descubrimientos REALES, ACTUALES y SORPRENDENTES. Nada de listas recicladas de "webs raras de internet". Queremos cosas que un diseñador, un creativo o un curioso cultural compartiría con sus amigos.

CATEGORÍAS (usa variedad, no repitas la misma):
- herramienta creativa — apps, webs, plugins que cambian cómo diseñas o creas (tipo grainrad.com, colorspot.app, herramientas WebGL raras)
- arte digital contemporáneo — artistas con web o Instagram activos AHORA, no outsider art del siglo XX
- experimento web interactivo — cosas jugables en el navegador, experimentos con WebGPU, Three.js, cosas tipo gradient.horse o adrift.site
- lectura que pica — ensayos, artículos, reports culturales que te hacen repensar algo (tipo ai-2027.com, informes de tendencias asiáticas, reflexiones sobre IA y creatividad)
- audiovisual inesperado — videoensayos, cortos, análisis visuales de películas, documentales nicho en YouTube con pocas vistas
- música y sonido — productores nicho, cuentas que recomiendan música rara, proyectos sonoros experimentales, playlists con alma
- cuenta o comunidad — Instagrams, Substacks, canales de YouTube pequeños pero magnéticos, comunidades de Discord/Are.na
- proyecto con alma — mapas interactivos, archivos digitales con propósito, webs que preservan memoria o provocan reflexión social
- IA experimental — proyectos que usan IA de formas no obvias, herramientas generativas raras, experimentos artísticos con modelos
- libro u objeto raro — novelas de culto, ediciones raras, objetos de diseño sorprendentes, zines, publicaciones independientes

CRITERIOS ESTRICTOS:
1. DEBEN existir REALMENTE — no inventes URLs. Si no estás seguro de que la URL funciona, no la incluyas.
2. Prioriza cosas de los últimos 2-3 años. Nada de webs de los 2000s que ya conoce todo el mundo.
3. Evita los Greatest Hits de internet raro: NADA de The Useless Web, Cookie Clicker, Library of Babel, Wait But Why, Atlas Obscura, Kottke, o cualquier cosa que salga en listicles de BuzzFeed.
4. Preferencia por contenido en inglés o español, pero si encuentras algo brutal en japonés, francés o portugués, adelante.
5. Evita sitios puramente comerciales o de marketing corporativo.
6. Cada descubrimiento debe provocar una reacción: "¿¡esto existe!?", "necesito enseñar esto a alguien", o "me acabo de perder 2 horas aquí".

TONO DE LAS DESCRIPCIONES:
- Escribe como si se lo contaras a un colega en una cerveza. NADA de tono enciclopédico.
- BIEN: "El otro día encontré esta web donde dibujas un caballo y lo ves competir contra los de otros desconocidos de internet. Me he tirado media hora."
- MAL: "Una fascinante plataforma interactiva que permite a los usuarios crear ilustraciones equinas en un entorno colaborativo."
- La quote debe ser breve, ingeniosa, poética o absurda. Como un pie de foto de Instagram de alguien con criterio.

Devuelve un JSON válido con este formato:

{
  "discoveries": [
    {
      "category": "categoría exacta de la lista de arriba",
      "title": "Título corto y descriptivo",
      "url": "https://url-real-que-existe.com",
      "description": "Descripción en 2-3 frases con tono personal y conversacional.",
      "quote": "Frase corta, ingeniosa o poética."
    }
  ]
}

NO agregues texto adicional, solo el JSON válido.`;

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

        if (!parsed || typeof parsed !== 'object') {
            console.error('❌ Respuesta no parseable como JSON. Primeros 500 chars:', raw.slice(0, 500));
            return [];
        }

        return parsed.discoveries || [];
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
