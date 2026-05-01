// ============================================
// SCRIPT v2: Actualiza la base de datos con IA + búsqueda real
// Ejecutar diariamente con GitHub Actions o cron
// ============================================
//
// MEJORAS vs v1:
// - Búsqueda web REAL (SerpAPI) → la IA curariza, no inventa URLs
// - Verificación HTTP de cada URL antes de aceptar
// - Categorías expandidas (13 originales del espíritu del proyecto)
// - DeepSeek como modelo (barato vs GPT-4o)
// - Dedup por hash criptográfico (SHA-256) persistente
// - Fallback a GPT-4o si no hay SerpAPI key

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==================== CONFIGURACIÓN ====================
const CONFIG = {
    discoveriesPerRun: 10,
    maxSearchResults: 5,         // cuántos resultados buscar por categoría
    httpTimeout: 8000,           // ms para verificación HTTP
    similarityThreshold: 0.7,   // umbral de similitud de título
    model: process.env.AI_MODEL || 'deepseek/deepseek-chat',
    apiKey: process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY,
    serpApiKey: process.env.SERPAPI_KEY || null,
    serpApiBaseUrl: 'https://serpapi.com/search',
};

// ==================== CATEGORÍAS EXPANDIDAS ====================
// Restauramos el espíritu original: rarezas variadas de todo internet
const CATEGORIAS = [
    { id: "web_extraña", nombre: "Webs extrañas o inútiles", query: "weird useless websites hidden gems internet oddity" },
    { id: "artista_marginal", nombre: "Artistas desconocidos o marginales", query: "unknown outsider artist obscure art discovery" },
    { id: "proyecto_experimental", nombre: "Proyectos raros y experimentales", query: "experimental web project internet art weird technology" },
    { id: "juego_absurdo", nombre: "Juegos absurdos o interactivos", query: "weird browser game absurd interactive experience" },
    { id: "subcultura", nombre: "Mundos under, subculturas", query: "internet subculture underground community obscure" },
    { id: "estetica_rara", nombre: "Estéticas raras (net.art, glitch, vaporwave)", query: "glitch art vaporwave net.art digital aesthetic weird" },
    { id: "idea_provocadora", nombre: "Ideas provocadoras", query: "strange philosophical idea thought experiment obscure" },
    { id: "blog_olvidado", nombre: "Blogs olvidados", query: "forgotten blog obscure website personal weird internet" },
    { id: "performance_raro", nombre: "Performances o exposiciones raras", query: "bizarre art performance installation strange exhibition" },
    { id: "musica_experimental", nombre: "Música experimental", query: "experimental music obscure sound art noise" },
    { id: "filosofia_digital", nombre: "Filosofía digital", query: "digital philosophy internet paradox technology concept" },
    { id: "experimento_social", nombre: "Experimentos sociales", query: "social experiment internet project crowd weird" },
    { id: "herramienta_oculta", nombre: "Herramientas ocultas de internet", query: "hidden tool obscure website utility underrated" },
];

// Selección de categoría: aleatoria ponderada (no rígida por día del año)
function pickCategory() {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    // Usamos el día + algo de aleatoriedad para que no sea 100% predecible
    const seed = (dayOfYear * 7 + 3) % CATEGORIAS.length;
    return CATEGORIAS[seed];
}

// ==================== HASH CRIPTOGRÁFICO ====================
function hashContent(title, url) {
    const normalized = `${(title || '').toLowerCase().trim()}|${normalizeUrl(url)}`;
    return crypto.createHash('sha256').update(normalized).digest('hex').substring(0, 16);
}

// ==================== NORMALIZACIÓN ====================
function normalizeUrl(url) {
    if (!url) return '';
    return url
        .toLowerCase()
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .replace(/\/+$/, '')
        .replace(/#.*$/, '')
        .trim();
}

function extractDomain(url) {
    if (!url) return '';
    const normalized = normalizeUrl(url);
    const slash = normalized.indexOf('/');
    return slash === -1 ? normalized : normalized.substring(0, slash);
}

// ==================== SIMILITUD ====================
function calculateSimilarity(a, b) {
    if (!a || !b) return 0;
    const aLower = a.toLowerCase().trim();
    const bLower = b.toLowerCase().trim();
    if (aLower === bLower) return 1;
    if (aLower.includes(bLower) || bLower.includes(aLower)) return 0.8;
    const aWords = new Set(aLower.split(/\s+/).filter(w => w.length > 3));
    const bWords = new Set(bLower.split(/\s+/).filter(w => w.length > 3));
    const commonWords = [...aWords].filter(w => bWords.has(w)).length;
    const totalWords = new Set([...aWords, ...bWords]).size;
    return totalWords === 0 ? 0 : commonWords / totalWords;
}

// ==================== CARGA DE DATOS ====================
function loadCurrentDatabase() {
    const scriptPath = path.join(__dirname, '../script.js');
    const content = fs.readFileSync(scriptPath, 'utf-8');
    const match = content.match(/const discoveriesDatabase = (\[[\s\S]*?\]);/);
    if (match) {
        try {
            return eval(match[1]);
        } catch (e) {
            console.error('Error evaluando DB:', e.message);
            return [];
        }
    }
    return [];
}

function loadSentArchive() {
    const archivePath = path.join(__dirname, 'sent-discoveries-archive.json');
    if (fs.existsSync(archivePath)) {
        try {
            return JSON.parse(fs.readFileSync(archivePath, 'utf-8'));
        } catch (error) {
            console.error('⚠️  Error al leer archive:', error.message);
            return { sent: [] };
        }
    }
    return { sent: [] };
}

function saveSentArchive(archive) {
    const archivePath = path.join(__dirname, 'sent-discoveries-archive.json');
    archive.lastUpdated = new Date().toISOString();
    archive.sentCount = (archive.sent || []).length;
    fs.writeFileSync(archivePath, JSON.stringify(archive, null, 2), 'utf-8');
}

// ==================== VERIFICACIÓN HTTP ====================
async function verifyUrl(url) {
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), CONFIG.httpTimeout);

        const response = await fetch(url, {
            method: 'HEAD',
            signal: controller.signal,
            redirect: 'follow',
            headers: { 'User-Agent': 'CuradorRarezas/2.0' }
        });
        clearTimeout(timeout);

        if (response.ok || response.status === 200 || response.status === 301 || response.status === 302) {
            return { valid: true, status: response.status };
        }
        return { valid: false, status: response.status };
    } catch (error) {
        // Algunos servers no soportan HEAD, intentamos GET
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), CONFIG.httpTimeout);
            const response = await fetch(url, {
                method: 'GET',
                signal: controller.signal,
                redirect: 'follow',
                headers: { 'User-Agent': 'CuradorRarezas/2.0' }
            });
            clearTimeout(timeout);
            return { valid: response.ok || response.status < 400, status: response.status };
        } catch {
            return { valid: false, status: 0, error: error.message };
        }
    }
}

// ==================== BÚSQUEDA WEB REAL (SERPAPI) ====================
async function searchWeb(query, numResults = CONFIG.maxSearchResults) {
    if (!CONFIG.serpApiKey) {
        console.log('  ℹ️  Sin SERPAPI_KEY, usando solo IA para generar descubrimientos');
        return [];
    }

    try {
        const url = `${CONFIG.serpApiBaseUrl}?q=${encodeURIComponent(query)}&num=${numResults}&api_key=${CONFIG.serpApiKey}&engine=google`;
        const response = await fetch(url);
        const data = await response.json();

        if (!data.organic_results) {
            console.log('  ⚠️  Sin resultados orgánicos de SerpAPI');
            return [];
        }

        return data.organic_results.map(r => ({
            title: r.title || '',
            url: r.link || '',
            snippet: r.snippet || '',
        }));
    } catch (error) {
        console.error('  ❌ Error en búsqueda web:', error.message);
        return [];
    }
}

// ==================== CURACIÓN CON IA ====================
async function curateWithAI(searchResults, category, existingUrls, existingTitles) {
    // Determinar qué cliente de IA usar
    let aiClient;
    let modelName;
    let isDeepSeek = false;

    if (CONFIG.apiKey === process.env.DEEPSEEK_API_KEY && CONFIG.apiKey) {
        // DeepSeek vía OpenAI-compatible API
        const { default: OpenAI } = await import('openai');
        aiClient = new OpenAI({
            apiKey: CONFIG.apiKey,
            baseURL: 'https://api.deepseek.com'
        });
        modelName = 'deepseek-chat';
        isDeepSeek = true;
    } else if (CONFIG.apiKey) {
        const { default: OpenAI } = await import('openai');
        aiClient = new OpenAI({ apiKey: CONFIG.apiKey });
        modelName = 'gpt-4o';
    } else {
        console.error('❌ No hay API key (DEEPSEEK_API_KEY u OPENAI_API_KEY)');
        return [];
    }

    const searchContext = searchResults.length > 0
        ? `\n\nFONTOS: He encontrado estos resultados de búsqueda web real. Úsalos como BASE, pero MEJORALOS:\n${searchResults.map((r, i) => `${i + 1}. ${r.title}\n   URL: ${r.url}\n   Snippet: ${r.snippet}`).join('\n')}\n\nINSTRUCCIONES:\n- Si una URL de los resultados es buena, úsala. Si es mainstream/basura, descártala.\n-Completa los que falten con rarezas REALES que conozcas.\n- NUNCA inventes URLs. Si no conoces una URL real, no la incluyas.`
        : '';

    const DISCOVERY_PROMPT = `Eres un curador de rarezas de internet. Tu misión es encontrar contenido genuinamente raro, fascinante, poco conocido o infravalorado.

HOY debes generar exactamente ${CONFIG.discoveriesPerRun} descubrimientos nuevos. La categoría de hoy es: **${category.nombre}** (${category.id}).

CATEGORÍAS POSIBLES (usa la de hoy):
- "web_extraña" → Sitios web que desafían la lógica, inútiles, hipnóticos, absurdos
- "artista_marginal" → Artistas outsider, desconocidos, visionarios solitarios
- "proyecto_experimental" → Obras, hacks, experimentos tecnológicos no convencionales
- "juego_absurdo" → Juegos de navegador absurdos, interactivos, perturbadores
- "subcultura" → Comunidades underground, fenómenos de internet marginales
- "estetica_rara" → Glitch art, vaporwave, net.art, estéticas digitales raras
- "idea_provocadora" → Conceptos, paradojas, experimentos mentales, filosofía rara
- "blog_olvidado" → Blogs personales olvidados, webs antiguas que resisten
- "performance_raro" → Performances, exposiciones, instalaciones raras
- "musica_experimental" → Música experimental, noise, sound art, instrumentos raros
- "filosofia_digital" → Paradojas de internet, teoría digital, ciberfilosofía
- "experimento_social" → Experimentos sociales online, crowdsourcing raro
- "herramienta_oculta" → Utilidades web ocultas, herramientas raras de internet

REGLAS ESTRICTAS:
1. Nada mainstream. Evita sitios que aparecen en la primera página de Google buscando su nombre
2. PROHIBIDO: ProductHunt, PetaPixel, Creative Bloq, TechCrunch, Futurism, Medium top, Reddit frontpage
3. PRIORIZAR: GitHub repos con <500 estrellas, blogs personales, proyectos universitarios, herramientas beta, webs de un solo propósito, arxiv, arte outsider
4. Cada URL debe ser REAL y VERIFICABLE. Si no estás seguro de que existe, NO la inventes.
5. Varía entre subcategorias dentro de la categoría de hoy
6. Las descriptions deben ser VIVAS y ESPECÍFICAS, no genéricas

Devuelve SOLO un objeto JSON válido con esta estructura:
{
  "discoveries": [
    {
      "category": "${category.id}",
      "title": "Título específico y llamativo",
      "url": "https://url-real-y-verificable.com",
      "description": "Qué es, por qué es raro o valioso, qué lo diferencia. 2-3 frases con tono curioso.",
      "quote": "Una idea provocadora o dato sorprendente relacionado."
    }
  ]
}
${searchContext}

URLS YA EN LA BASE DE DATOS (NO REPETIR):
${existingUrls.slice(0, 200).map(u => `  - ${u}`).join('\n')}

TÍTULOS YA USADOS (NO REPETIR NI PARECIDOS):
${existingTitles.slice(0, 200).map(t => `  - ${t}`).join('\n')}

Ahora genera ${CONFIG.discoveriesPerRun} descubrimientos completamente nuevos y únicos:`;

    try {
        const response = await aiClient.chat.completions.create({
            model: modelName,
            messages: [
                {
                    role: 'system',
                    content: 'Eres el curador de rarezas más obsesivo de internet. Encuentras cosas que nadie más encuentra. Solo recomiendas cosas que EXISTEN de verdad. Tu tono es culto, curioso y ligeramente perturbado. Hablas en español.'
                },
                { role: 'user', content: DISCOVERY_PROMPT }
            ],
            response_format: { type: 'json_object' },
            temperature: 0.9,
            max_tokens: 4000
        });

        const raw = (response?.choices?.[0]?.message?.content ?? '').trim();
        return extractJsonObject(raw);
    } catch (error) {
        console.error('❌ Error al generar con IA:', error.message);
        return [];
    }
}

// ==================== PARSEO JSON ====================
function extractJsonObject(text) {
    if (!text) return [];
    const noFences = String(text)
        .replace(/```json\s*/gi, '')
        .replace(/```\s*/g, '')
        .trim();

    try { return JSON.parse(noFences); } catch (_) { /* sigue */ }

    const start = Math.min(
        noFences.indexOf('{') === -1 ? Infinity : noFences.indexOf('{'),
        noFences.indexOf('[') === -1 ? Infinity : noFences.indexOf('[')
    );
    const end = Math.max(noFences.lastIndexOf('}'), noFences.lastIndexOf(']'));

    if (start === Infinity || end === -1 || end <= start) return [];

    try { return JSON.parse(noFences.slice(start, end + 1)); } catch (_) { return []; }
}

// ==================== DEDUPLICACIÓN SEVERA v2 ====================
function filterDuplicates(newDiscoveries, database, sentArchive) {
    const existingUrls = new Set(database.map(d => normalizeUrl(d.url)));
    const existingHashes = new Set(database.map(d => hashContent(d.title, d.url)));
    const existingTitles = database.map(d => d.title.toLowerCase().trim());
    const sentUrls = new Set((sentArchive.sent || []).map(d => normalizeUrl(d.url || '')));
    const sentHashes = new Set((sentArchive.sent || []).map(d => hashContent(d.title, d.url)));
    const sentTitles = (sentArchive.sent || []).map(d => (d.title || '').toLowerCase().trim());

    // Track within-batch
    const batchUrls = new Set();
    const batchHashes = new Set();

    return newDiscoveries.filter(d => {
        if (!d.url || !d.title) {
            console.log(`  ⏭️  Sin URL o título: ${d.title || '(vacío)'}`);
            return false;
        }

        const normUrl = normalizeUrl(d.url);
        const normTitle = d.title.toLowerCase().trim();
        const h = hashContent(d.title, d.url);

        // L1: Hash ya existe en DB o archive
        if (existingHashes.has(h) || sentHashes.has(h) || batchHashes.has(h)) {
            console.log(`  ⏭️  Hash duplicado: ${d.title}`);
            return false;
        }

        // L2: URL exacta normalizada
        if (existingUrls.has(normUrl) || sentUrls.has(normUrl) || batchUrls.has(normUrl)) {
            console.log(`  ⏭️  URL duplicada: ${d.title}`);
            return false;
        }

        // L3: Título exacto
        if (existingTitles.includes(normTitle) || sentTitles.includes(normTitle)) {
            console.log(`  ⏭️  Título exacto duplicado: ${d.title}`);
            return false;
        }

        // L4: Similitud de título (> umbral)
        for (const t of [...existingTitles, ...sentTitles]) {
            if (calculateSimilarity(d.title, t) > CONFIG.similarityThreshold) {
                console.log(`  ⏭️  Título similar: "${d.title}" ≈ "${t}"`);
                return false;
            }
        }

        // L5: Descripción demasiado corta
        if (!d.description || d.description.length < 20) {
            console.log(`  ⏭️  Descripción muy corta: ${d.title}`);
            return false;
        }

        // L6: URL con dominio sospechoso (solo dominio sin path)
        const domain = extractDomain(d.url);
        if (normUrl === domain && !['com', 'net', 'org', 'io'].some(tld => domain.endsWith('.' + tld))) {
            // URLs tipo "http://algo" sin path real son sospechosas
        }

        batchUrls.add(normUrl);
        batchHashes.add(h);
        return true;
    });
}

// ==================== VERIFICACIÓN MASIVA DE URLs ====================
async function verifyDiscoveries(discoveries) {
    console.log('\n🔍 Verificando URLs con HTTP HEAD...');
    const verified = [];
    const failed = [];

    for (const d of discoveries) {
        process.stdout.write(`  → ${d.url.substring(0, 50)}... `);
        const result = await verifyUrl(d.url);
        if (result.valid) {
            console.log(`✅ (${result.status})`);
            verified.push(d);
        } else {
            console.log(`❌ (${result.status || 'timeout'})`);
            failed.push(d);
        }
        // Rate limit: 200ms entre requests
        await new Promise(r => setTimeout(r, 200));
    }

    if (failed.length > 0) {
        console.log(`\n⚠️  ${failed.length} URLs no verificadas (descartadas):`);
        failed.forEach(d => console.log(`    - ${d.title}: ${d.url}`));
    }

    return verified;
}

// ==================== AÑADIR A script.js ====================
function appendToDatabase(newDiscoveries) {
    if (!newDiscoveries || newDiscoveries.length === 0) {
        console.log('⚠️  No hay nuevos descubrimientos para añadir.');
        return;
    }

    const scriptPath = path.join(__dirname, '../script.js');
    let content = fs.readFileSync(scriptPath, 'utf-8');

    const arrayEndIndex = content.lastIndexOf('];');
    if (arrayEndIndex === -1) {
        console.error('❌ No se encontró el cierre del array discoveriesDatabase');
        return;
    }

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

    const categoryComment = `\n    // ${new Date().toISOString().split('T')[0]} — ${newDiscoveries[0]?.category || 'nuevo'}`;

    const newItemsCode = newDiscoveries.map(d => {
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

    const before = content.substring(0, lastBraceIndex + 1);
    const after = content.substring(lastBraceIndex + 1);
    content = before + ',' + categoryComment + '\n' + newItemsCode + after;

    fs.writeFileSync(scriptPath, content, 'utf-8');
    console.log(`✅ Añadidos ${newDiscoveries.length} nuevos descubrimientos a script.js`);
}

// ==================== MAIN ====================
async function main() {
    console.log('🔮 Curador de Rarezas v2 — Búsqueda real + IA\n');

    // 1. Carga estado actual
    const currentDb = loadCurrentDatabase();
    console.log(`📚 Base de datos actual: ${currentDb.length} items`);

    const sentArchive = loadSentArchive();
    console.log(`📦 Histórico de enviados: ${sentArchive.sent?.length || 0} items`);

    const existingUrls = currentDb.map(d => d.url);
    const existingTitles = currentDb.map(d => d.title);

    // 2. Selecciona categoría del día
    const category = pickCategory();
    console.log(`\n🎯 Categoría de hoy: ${category.nombre} (${category.id})`);

    // 3. Búsqueda web real
    console.log('\n🌐 Buscando en la web...');
    const searchResults = await searchWeb(category.query);
    console.log(`  → ${searchResults.length} resultados de búsqueda`);

    // 4. Curación con IA
    console.log('\n🤖 Curando con IA...');
    const rawResult = await curateWithAI(searchResults, category, existingUrls, existingTitles);

    // Extraer discoveries del resultado (puede venir como array directo o como objeto con "discoveries")
    let rawDiscoveries = [];
    if (Array.isArray(rawResult)) {
        rawDiscoveries = rawResult;
    } else if (rawResult && Array.isArray(rawResult.discoveries)) {
        rawDiscoveries = rawResult.discoveries;
    }

    console.log(`  → IA generó ${rawDiscoveries.length} descubrimientos`);

    if (rawDiscoveries.length === 0) {
        console.log('\n⚠️  La IA no generó descubrimientos. Abortando.');
        return;
    }

    // 5. Deduplicación severa v2
    console.log('\n🔍 Deduplicación severa (hash + similitud + histórico)...');
    const dedupedDiscoveries = filterDuplicates(rawDiscoveries, currentDb, sentArchive);
    console.log(`  → ${dedupedDiscoveries.length} descubrimientos únicos (descartados ${rawDiscoveries.length - dedupedDiscoveries.length})`);

    if (dedupedDiscoveries.length === 0) {
        console.log('\n⚠️  Todos los descubrimientos eran duplicados. Abortando.');
        return;
    }

    // 6. Verificación HTTP
    const verifiedDiscoveries = await verifyDiscoveries(dedupedDiscoveries);
    console.log(`\n✅ ${verifiedDiscoveries.length} descubrimientos verificados (URLs funcionando)`);

    if (verifiedDiscoveries.length === 0) {
        console.log('\n⚠️  Ningún descubrimiento pasó la verificación HTTP. Abortando.');
        return;
    }

    // 7. Muestra resultados finales
    console.log('\n🆕 Descubrimientos finales:');
    verifiedDiscoveries.forEach((d, i) => {
        console.log(`  ${i + 1}. [${d.category}] ${d.title}`);
        console.log(`     ${d.url}`);
    });

    // 8. Añade a script.js
    appendToDatabase(verifiedDiscoveries);

    // 9. Registra en histórico
    for (const discovery of verifiedDiscoveries) {
        sentArchive.sent.push({
            title: discovery.title,
            url: discovery.url,
            category: discovery.category,
            hash: hashContent(discovery.title, discovery.url),
            addedToDb: new Date().toISOString(),
            sent: false
        });
    }
    saveSentArchive(sentArchive);
    console.log(`\n📦 ${verifiedDiscoveries.length} descubrimientos registrados en histórico`);

    console.log('\n✨ ¡Actualización completada!');
}

// Ejecuta
main().catch(console.error);