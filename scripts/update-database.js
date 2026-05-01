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
// Proveedores gratuitos con prioridad: Groq (gratis, rápido) > OpenRouter (gratis) > DeepSeek (barato) > OpenAI (fallback)
const AI_PROVIDERS = [
    { name: 'groq',   baseURL: 'https://api.groq.com/openai/v1', model: 'llama-3.3-70b-versatile', key: process.env.GROQ_API_KEY },
    { name: 'openrouter-free', baseURL: 'https://openrouter.ai/api/v1', model: 'meta-llama/llama-3.3-70b-instruct:free', key: process.env.OPENROUTER_API_KEY },
    { name: 'deepseek', baseURL: 'https://api.deepseek.com', model: 'deepseek-chat', key: process.env.DEEPSEEK_API_KEY },
    { name: 'openai',  baseURL: 'https://api.openai.com/v1', model: 'gpt-4o', key: process.env.OPENAI_API_KEY },
];

function getConfig() {
    const provider = AI_PROVIDERS.find(p => p.key);
    if (!provider) {
        console.error('❌ No hay API key disponible. Configura GROQ_API_KEY, OPENROUTER_API_KEY, DEEPSEEK_API_KEY u OPENAI_API_KEY');
        process.exit(1);
    }
    console.log(`🤖 Usando proveedor: ${provider.name} (${provider.model})`);
    return {
        discoveriesPerRun: 10,
        maxSearchResults: 5,
        httpTimeout: 8000,
        similarityThreshold: 0.7,
        model: provider.model,
        apiKey: provider.key,
        baseURL: provider.baseURL,
        serpApiKey: process.env.SERPAPI_KEY || null,
        serpApiBaseUrl: 'https://serpapi.com/search',
        providerName: provider.name,
    };
}
const CONFIG = getConfig();

// ==================== CATEGORÍAS EXPANDIDAS ====================
// Queries específicos que apuntan a rincones oscuros de internet, no a la primera página de Google
const CATEGORIAS = [
    { id: "web_extraña", nombre: "Webs extrañas o inútiles", queries: [
        "most useless websites 2024 bizarre single purpose",
        "obscure web 1.0 sites still alive weird corner internet",
        "strange interactive websites experimental web oddity"
    ]},
    { id: "artista_marginal", nombre: "Artistas desconocidos o marginales", queries: [
        "outsider art unknown visionary artist obscure portfolio",
        "self-taught artist bizarre world creation underground",
        "art brut naive artist strange obsession discovered posthumously"
    ]},
    { id: "proyecto_experimental", nombre: "Proyectos raros y experimentales", queries: [
        "weird github repo experimental project under 100 stars",
        "obscure creative coding project strange web experiment",
        "academic research project bizarre finding unusual experiment"
    ]},
    { id: "juego_absurdo", nombre: "Juegos absurdos o interactivos", queries: [
        "weird browser game indie experimental unsettling itch.io",
        "absurd single mechanic game strange web experience",
        "html5 game bizarre concept creepy indie obscure"
    ]},
    { id: "subcultura", nombre: "Mundos under, subculturas", queries: [
        "obscure internet community strange ritual digital subculture",
        "weird forum alive since 2000s niche underground online world",
        "forgotten internet culture bizarre subreddit 100 members"
    ]},
    { id: "estetica_rara", nombre: "Estéticas raras (net.art, glitch, vaporwave)", queries: [
        "net art project obscure digital aesthetic weird website",
        "databending glitch art technique obscure artist portfolio",
        "dead web aesthetic liminal space website digital decay art"
    ]},
    { id: "idea_provocadora", nombre: "Ideas provocadoras", queries: [
        "obscure philosophical concept thought experiment bizarre",
        "strange scientific hypothesis fringe theory unusual paradox",
        "forgotten philosophical idea unsettling implication unknown"
    ]},
    { id: "blog_olvidado", nombre: "Blogs olvidados", queries: [
        "old geocities tripod personal page still online obsession",
        "forgotten blog 2010s obscure passion personal website alive",
        "web 1.0 personal homepage strange hobby preserved internet"
    ]},
    { id: "performance_raro", nombre: "Performances o exposiciones raras", queries: [
        "bizarre art performance obscure documented strange footage",
        "unusual installation art disturbing immersive weird gallery",
        "outsider performance art strange ritual documented obscure"
    ]},
    { id: "musica_experimental", nombre: "Música experimental", queries: [
        "obscure noise artist experimental sound bandcamp few followers",
        "strange instrument invented obscure musician unusual technique",
        "experimental music scene underground cassette tape obscure"
    ]},
    { id: "filosofia_digital", nombre: "Filosofía digital", queries: [
        "internet paradox strange digital phenomenon unusual online behavior",
        "obscure concept network theory unusual finding digital culture",
        "cyber-philosophy unusual thought digital existence fringe concept"
    ]},
    { id: "experimento_social", nombre: "Experimentos sociales", queries: [
        "strange social experiment online project unusual crowd behavior",
        "bizarre internet civic experiment weird online participation",
        "obscure crowdsourcing project strange result unusual study"
    ]},
    { id: "herramienta_oculta", nombre: "Herramientas ocultas de internet", queries: [
        "obscure web tool single purpose useful unknown gem site",
        "weird online utility strange calculator bizarre tool website",
        "underrated web app few users oddly specific useful tool"
    ]},
];

// ==================== LISTA NEGRA DE DOMINIOS ====================
// Dominios mainstream que NUNCA deben aparecer en las rarezas
const BANNED_DOMAINS = [
    // Redes sociales mainstream
    'facebook.com', 'twitter.com', 'x.com', 'instagram.com', 'tiktok.com',
    'linkedin.com', 'reddit.com', 'pinterest.com', 'snapchat.com',
    'youtube.com', 'twitch.tv', 'discord.com', 'whatsapp.com',
    // Plataformas mainstream de contenido
    'medium.com', 'buzzfeed.com', 'huffpost.com', 'vice.com',
    'techcrunch.com', 'theverge.com', 'wired.com', 'arstechnica.com',
    'gizmodo.com', 'kotaku.com', 'io9.com', 'jezebel.com',
    'producthunt.com', 'ycombinator.com', 'slashdot.org',
    // Stock/marketplaces genéricos
    'shutterstock.com', 'istockphoto.com', 'dreamstime.com', 'alamy.com',
    'adobe.com', 'canva.com', 'freepik.com', 'unsplash.com', 'pexels.com',
    'etsy.com', 'amazon.com', 'ebay.com', 'aliexpress.com',
    // Enciclopedias/wikis genéricas
    'wikipedia.org', 'fandom.com', 'wikia.com', 'imdb.com',
    // Portafolios/platformas genéricas
    'behance.net', 'dribbble.com', 'deviantart.com', 'artstation.com',
    'tumblr.com', 'wordpress.com', 'blogspot.com',
    // Dominios de noticias mainstream
    'nytimes.com', 'bbc.com', 'cnn.com', 'theguardian.com', 'elpais.com',
    'elmundo.es', 'abc.es', 'rtve.es',
    // Otros contenido genérico
    'pinterest.es', 'tripadvisor.com', 'yelp.com', 'zomato.com',
    'goodreads.com', 'letterboxd.com', 'rateyourmusic.com',
    'genius.com', 'genius.ly', 'spotify.com', 'soundcloud.com',
    'bandcamp.com', 'apple.com', 'play.google.com',
    // Dominios de referencia/apuntes
    'quora.com', 'stackexchange.com', 'stackoverflow.com',
    'en.wikipedia.org', 'es.wikipedia.org',
];

// Selección de categoría: aleatoria ponderada con queries específicos
function pickCategory() {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
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

// ==================== FILTRO DE DOMINIOS BANEADOS ====================
function isBannedDomain(url) {
    try {
        const hostname = new URL(url).hostname.toLowerCase().replace(/^www\./, '');
        return BANNED_DOMAINS.some(d => hostname === d || hostname.endsWith('.' + d));
    } catch {
        return true; // URLs inválidas también se descartan
    }
}

// ==================== BÚSQUEDA WEB MULTI-QUERY (SERPAPI) ====================
async function searchWeb(category, numResults = CONFIG.maxSearchResults) {
    if (!CONFIG.serpApiKey) {
        console.log('  ℹ️  Sin SERPAPI_KEY, usando solo IA para generar descubrimientos');
        return [];
    }

    // Seleccionar 2 queries aleatorios de la categoría para diversificar
    const queries = category.queries || [category.query];
    const shuffled = [...queries].sort(() => Math.random() - 0.5);
    const selectedQueries = shuffled.slice(0, Math.min(2, queries.length));

    let allResults = [];
    const seenUrls = new Set();

    for (const query of selectedQueries) {
        console.log(`  🔍 Buscando: "${query}"`);
        try {
            const url = `${CONFIG.serpApiBaseUrl}?q=${encodeURIComponent(query)}&num=10&api_key=${CONFIG.serpApiKey}&engine=google`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.organic_results) {
                for (const r of data.organic_results) {
                    const link = r.link || '';
                    // Filtro 1: dominios baneados
                    if (isBannedDomain(link)) {
                        console.log(`    ⛔ Dominio baneado: ${link.substring(0, 50)}`);
                        continue;
                    }
                    // Filtro 2: duplicados
                    const norm = normalizeUrl(link);
                    if (seenUrls.has(norm)) continue;
                    seenUrls.add(norm);

                    allResults.push({
                        title: r.title || '',
                        url: link,
                        snippet: r.snippet || '',
                    });
                }
            }
        } catch (error) {
            console.error(`  ❌ Error buscando "${query}":`, error.message);
        }

        // Rate limit entre queries
        if (selectedQueries.indexOf(query) < selectedQueries.length - 1) {
            await new Promise(r => setTimeout(r, 500));
        }
    }

    // Mezclar y limitar resultados
    allResults = allResults.sort(() => Math.random() - 0.5).slice(0, numResults * 2);
    console.log(`  📊 ${allResults.length} resultados limpios (sin banned domains)`);
    return allResults;
}

// ==================== CURACIÓN CON IA ====================
async function curateWithAI(searchResults, category, existingUrls, existingTitles) {
    // Usar el provider seleccionado automáticamente (Groq > OpenRouter > DeepSeek > OpenAI)
    const { default: OpenAI } = await import('openai');
    const aiClient = new OpenAI({
        apiKey: CONFIG.apiKey,
        baseURL: CONFIG.baseURL,
    });
    const modelName = CONFIG.model;
    console.log(`  🤞 Llamando a ${CONFIG.providerName} (${modelName})...`);

    const searchContext = searchResults.length > 0
        ? `\n\nRESULTADOS DE BÚSQUEDA WEB (ya filtrados de dominios mainstream):\n${searchResults.map((r, i) => `${i + 1}. ${r.title}\n   URL: ${r.url}\n   Snippet: ${r.snippet}`).join('\n')}\n\nINSTRUCCIONES PARA LOS RESULTADOS:\n- Si un resultado apunta a algo genuinamente raro/obscuro, úsalo tal cual.\n- Si un resultado sigue pareciendo mainstream a pesar del filtro, descártalo SIN piedad.\n- Complementa con rarezas REALES que conozcas de primera mano (no las inventes).\n- NUNCA inventes URLs. Si no estás seguro de que una URL existe, NO la incluyas.`
        : '\n\nNOTA: No hay resultados de búsqueda. Usa SOLO rarezas que conozcas de primera mano y estés ALTAMENTE seguro de que existen.';

    const DISCOVERY_PROMPT = `Eres el curador de rarezas más obsesivo y exigente de internet. Solo recomiendas cosas que NADIE conocería buscando en Google. Tu criterio es brutal: si algo aparece en la primera página de Google para su tema, es BASURA para ti.

MISIÓN: Generar exactamente ${CONFIG.discoveriesPerRun} descubrimientos GENUINAMENTE RAROS. Categoría de hoy: **${category.nombre}** (${category.id}).

CATEGORÍA DETALLADA:
- "web_extraña" → Sitios que desafían toda lógica: webs de un solo propósito hipnótico, páginas abandonadas desde 2003 que siguen vivas, experimentos web que nadie entiende
- "artista_marginal" → Artistas outsider AUTÉNTICOS: Henry Darger, Adolf Wölfli, personas que crearon mundos enteros en secreto. NO ilustradores de Instagram con 10K followers
- "proyecto_experimental" → Hacks, mods, proyectos de creative coding raros, repos GitHub con <50 estrellas que hacen algo fascinante, experimentos académicos extraños
- "juego_absurdo" → Juegos que NO deberían existir: Cookie Clicker antes de ser famosa, Neon Structure, experiencias web que te hacen cuestionar la realidad
- "subcultura" → Comunidades underground REALES: webrings de Neocities, foros de los 2000s que siguen vivos, grupos que hacen cosas inexplicables
- "estetica_rara" → Estéticas que la mayoría ignora:_seapunk, post-internet, cursed images como forma de arte, databending, URL art. NO vaporwave genérico de Pinterest
- "idea_provocadora" → Conceptos que te quitan el sueño: la hipótesis del bosque oscuro, el problema del hardr de la consciencia, teorías marginales fascinantes
- "blog_olvidado" → El tipo de página personal de los 90s/2000s que alguien mantiene por purera obsesión, actualizada hace 15 años y sigue ahí
- "performance_raro" → Performances DOCUMENTADOS que te dejan sin palabras: Tilda Swinton durmiendo en el MoMA, Stelarc con su tercera oreja
- "musica_experimental" → Música que NADIE en tu círculo conoce: Microgenres como vaporwave original, Japanoise, lowercase music, field recordings como arte
- "filosofia_digital" → Fenómenos digitales extraños: la muerte en MMOs, la economía de los juegos como metáfora, el problema del último usuario
- "experimento_social" → Experimentos sociales reales y documentados, NO teóricos. Proyectos como The Million Dollar Homepage, ChatRoulette en su momento
- "herramienta_oculta" → Herramientas con un propósito TAN específico que es genial: sitios que hacen una cosa y la hacen perfectamente, pero nadie los conoce

LISTA NEGRA ABSOLUTA — NUNCA recomendes nada de estos dominios:
Behance, Pinterest, Instagram, Dribbble, ArtStation, DeviantArt, Medium, Reddit (frontpage), Wikipedia, Fandom, Dreamstime, Shutterstock, Unsplash, BuzzFeed, Vice (main), TechCrunch, The Verge, Tumblr, YouTube, TikTok, Facebook, Twitter/X, LinkedIn, Etsy, Amazon, IMDB, Goodreads

PRIORIZAR SIEMPRE:
- Proyectos personales con dominio propio (no subdominios de platforms)
- GitHub repos con pocas estrellas pero ideas brillantes
- Sitios .edu de investigadores excéntricos
- Webs alojadas en Neocities, Glitch, Itch.io
- Arxiv papers, repositorios universitarios
- Blogs de una sola persona actualizados con obsesión
- Archivos de internet (Wayback Machine, Archive.org)
- Foros pequeños y antiguos que siguen activos

REGLAS DE ORO:
1. Si podrías encontrarlo en 5 segundos en Google, NO lo recomiendas.
2. Si tu amigo hipster de Brooklyn ya lo comparte en Instagram, NO lo recomiendas.
3. Cada URL debe ser REAL y VERIFICABLE. Si no estás AL 100% seguro de que existe, NO la inventes.
4. Las descripciones deben ser VIVAS, ESPECÍFICAS y con DATOS CONCRETOS. Nada de "una fascinante exploración de..."
5. El campo "quote" debe ser un dato JUDOSO o una observación mordaz, no una frase genérica de LinkedIn.
6. VARÍA dentro de la categoría: no me des 5 cosas de la misma subcategoría.

Devuelve SOLO un objeto JSON válido:
{
  "discoveries": [
    {
      "category": "${category.id}",
      "title": "Título específico y punzante (no genérico)",
      "url": "https://url-real-y-verificable.com/ruta-específica",
      "description": "Qué es exactamente, por qué es raro, qué lo hace único. Datos concretos, no palabrería. 2-3 frases.",
      "quote": "Dato sorprendente, estadística inusual, o observación mordaz."
    }
  ]
}${searchContext}

URLS YA EN LA BASE DE DATOS (NO REPETIR):
${existingUrls.slice(0, 200).map(u => `  - ${u}`).join('\n')}

TÍTULOS YA USADOS (NO REPETIR NI PARECIDOS):
${existingTitles.slice(0, 200).map(t => `  - ${t}`).join('\n')}

Ahora genera ${CONFIG.discoveriesPerRun} descubrimientos completamente nuevos y ÚNICOS. Recuerda: si es mainstream, no lo quiero.`;


    try {
        const response = await aiClient.chat.completions.create({
            model: modelName,
            messages: [
                {
                    role: 'system',
                    content: 'Eres el anticurador. Tu trabajo es encontrar lo que NADIE encuentra. Cosas que hacen que la gente diga "¿cómo se SUPONE que iba a yo saber que esto existía?". Solo recomiendas cosas que EXISTEN de verdad — si inventas URLs, fracasaste. Tu tono es culto, obsesivo y ligeramente perturbado. Hablas en español con precisión quirúrgica.'
                },
                { role: 'user', content: DISCOVERY_PROMPT }
            ],
            response_format: { type: 'json_object' },
            temperature: 1.0,
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

        // L0: Dominio baneado (mainstream)
        if (isBannedDomain(d.url)) {
            console.log(`  ⛔ Dominio baneado: ${d.title} → ${d.url}`);
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
    const searchResults = await searchWeb(category);
    console.log(`  → ${searchResults.length} resultados de búsqueda (limpios)`);

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