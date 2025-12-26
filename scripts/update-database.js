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
const DISCOVERY_PROMPT = `Eres un curador cultural experto en rarezas de internet, arte marginal, proyectos experimentales y cultura underground.

Tu tarea es encontrar y sugerir 10 nuevos descubrimientos fascinantes que cumplan estos criterios:

CATEGORÍAS:
- Webs extrañas o inútiles
- Artistas desconocidos o marginales
- Proyectos raros y experimentales
- Juegos absurdos o interactivos
- Mundos "under", subculturas
- Estéticas raras (net.art, glitch, vaporwave)
- Ideas provocadoras
- Blogs olvidados
- Performances o exposiciones raras
- Experimentos sociales
- Música experimental
- Filosofía digital

CRITERIOS:
1. Deben ser poco conocidos (evita lo mainstream)
2. Deben tener una URL real y funcional
3. Deben ser fascinantes, raros, o provocadores
4. Preferencia por contenido en inglés o español
5. Evita sitios comerciales o de marketing
6. Busca cosas que generen maravilla, sorpresa o reflexión

IMPORTANTE:
- NO repitas los descubrimientos que ya están en la base de datos
- Verifica que las URLs sean reales (no inventes)
- Prioriza calidad sobre cantidad

Devuelve un JSON válido con este formato:

{
  "discoveries": [
    {
      "category": "categoría",
      "title": "Título corto",
      "url": "https://url-real.com",
      "description": "Descripción en 2-3 frases. Tono humano, sensible, poético o irónico.",
      "quote": "Frase filosófica, absurda o inspiradora corta."
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

// Genera lista de URLs existentes para evitar duplicados
function getExistingURLs(database) {
    return database.map(d => d.url);
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

// Llama a OpenAI para generar nuevos descubrimientos
async function generateDiscoveries(existingUrls) {
    console.log('🤖 Consultando a la IA...');
    
    const existingList = existingUrls.slice(0, 50).join('\n- ');
    const fullPrompt = `${DISCOVERY_PROMPT}

URLS YA EXISTENTES (NO REPETIR):
- ${existingList}

Ahora genera 10 nuevos descubrimientos únicos:`;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                { role: 'system', content: 'Eres un curador experto en cultura underground y rarezas de internet.' },
                { role: 'user', content: fullPrompt }
            ],
            // Pide explícitamente un objeto JSON para minimizar respuestas con texto extra
            response_format: { type: 'json_object' },
            temperature: 0.9,
            max_tokens: 3000
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

    // 2. Obtiene URLs existentes
    const existingUrls = getExistingURLs(currentDb);

    // 3. Genera nuevos descubrimientos con IA
    const newDiscoveries = await generateDiscoveries(existingUrls);
    console.log(`🆕 Generados ${newDiscoveries.length} nuevos descubrimientos\n`);

    if (newDiscoveries.length > 0) {
        // Muestra los nuevos
        newDiscoveries.forEach((d, i) => {
            console.log(`${i + 1}. [${d.category}] ${d.title}`);
            console.log(`   ${d.url}`);
        });

        // 4. Añade a script.js
        appendToDatabase(newDiscoveries);

        console.log('\n✨ Base de datos actualizada exitosamente!');
    }
}

// Ejecuta
main().catch(console.error);
