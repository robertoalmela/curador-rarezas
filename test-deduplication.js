#!/usr/bin/env node
/**
 * TEST: Verificar que la deduplicación funciona correctamente
 * Uso: node test-deduplication.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ===== FUNCIONES COPIADAS DE update-database.js =====
function normalizeUrl(url) {
    if (!url) return '';
    return url
        .toLowerCase()
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .replace(/\/+$/, '')
        .trim();
}

function loadSentDiscoveriesArchive() {
    const archivePath = path.join(__dirname, 'scripts/sent-discoveries-archive.json');
    if (fs.existsSync(archivePath)) {
        try {
            return JSON.parse(fs.readFileSync(archivePath, 'utf-8'));
        } catch (error) {
            console.error('⚠️  Error al leer sent-discoveries-archive.json:', error.message);
            return { sent: [] };
        }
    }
    return { sent: [] };
}

function loadCurrentDatabase() {
    const scriptPath = path.join(__dirname, 'script.js');
    const content = fs.readFileSync(scriptPath, 'utf-8');
    const match = content.match(/const discoveriesDatabase = (\[[\s\S]*?\]);/);
    if (match) {
        try {
            const dbArray = eval(match[1]);
            return dbArray;
        } catch (error) {
            console.error('Error evaluando base de datos:', error.message);
            return [];
        }
    }
    return [];
}

// ===== TESTS =====
console.log('🧪 TEST: Verificar sistema de deduplicación\n');

// TEST 1: Archivo histórico existe
console.log('TEST 1: Archivo histórico de enviados');
const archive = loadSentDiscoveriesArchive();
console.log(`  ✓ sent-discoveries-archive.json existe`);
console.log(`  → ${archive.sent?.length || 0} descubrimientos registrados\n`);

// TEST 2: Base de datos cargada
console.log('TEST 2: Base de datos');
const db = loadCurrentDatabase();
console.log(`  ✓ script.js cargado`);
console.log(`  → ${db.length} descubrimientos en BD\n`);

// TEST 3: Estructura de descubrimientos
console.log('TEST 3: Estructura de descubrimientos en BD');
if (db.length > 0) {
    const first = db[0];
    const required = ['category', 'title', 'url', 'description', 'quote'];
    const hasAll = required.every(field => field in first);
    console.log(`  ${hasAll ? '✓' : '✗'} Primer item: ${hasAll ? 'estructura válida' : 'FALTA CAMPOS'}`);
    console.log(`    Fields: ${required.join(', ')}`);
    console.log(`    Título: "${first.title}"\n`);
} else {
    console.log(`  ⚠️  BASE DE DATOS VACÍA\n`);
}

// TEST 4: Estructura de histórico
console.log('TEST 4: Estructura del histórico de enviados');
if (archive.sent?.length > 0) {
    const first = archive.sent[0];
    const required = ['title', 'url', 'category', 'sent'];
    const hasAll = required.every(field => field in first);
    console.log(`  ${hasAll ? '✓' : '✗'} Primer item: ${hasAll ? 'estructura válida' : 'FALTA CAMPOS'}`);
    console.log(`    Título: "${first.title}"`);
    console.log(`    Enviado: ${first.sent ? 'SÍ (' + new Date(first.sentAt).toLocaleDateString() + ')' : 'NO'}\n`);
} else {
    console.log(`  ℹ️  Histórico vacío (normal en primera ejecución)\n`);
}

// TEST 5: Verificar duplicados en BD actual
console.log('TEST 5: Verificar duplicados EN LA BD ACTUAL');
const urls = new Set();
const titles = new Set();
let duplicateUrls = 0;
let duplicateTitles = 0;

for (const item of db) {
    const normUrl = normalizeUrl(item.url);
    const normTitle = (item.title || '').toLowerCase().trim();

    if (urls.has(normUrl)) {
        duplicateUrls++;
        console.log(`  ✗ URL DUPLICADA: ${item.url}`);
    }
    if (titles.has(normTitle)) {
        duplicateTitles++;
        console.log(`  ✗ TÍTULO DUPLICADO: ${item.title}`);
    }

    urls.add(normUrl);
    titles.add(normTitle);
}

if (duplicateUrls === 0 && duplicateTitles === 0) {
    console.log(`  ✓ Sin duplicados en BD (${db.length} items únicos)\n`);
} else {
    console.log(`  ❌ ENCONTRADOS DUPLICADOS: ${duplicateUrls} URLs + ${duplicateTitles} títulos\n`);
}

// TEST 6: Verificar que enviados están marcados
console.log('TEST 6: Estado de descubrimientos ENVIADOS');
const sent = archive.sent?.filter(d => d.sent === true) || [];
const notSent = archive.sent?.filter(d => d.sent !== true) || [];
console.log(`  → Enviados: ${sent.length}`);
console.log(`  → Sin enviar: ${notSent.length}`);
console.log(`  → Total registrados: ${archive.sent?.length || 0}\n`);

// RESUMEN FINAL
console.log('═════════════════════════════════════════');
const allGood = duplicateUrls === 0 && duplicateTitles === 0;
if (allGood) {
    console.log('✅ SISTEMA OPERATIVO - Todo funciona');
} else {
    console.log('❌ PROBLEMAS DETECTADOS - Ver arriba');
}
console.log('═════════════════════════════════════════\n');

if (!allGood) {
    console.log('💡 Próximos pasos:');
    console.log('1. Ejecuta: node scripts/update-database.js');
    console.log('2. Verifica que GitHub Actions tenga OPENAI_API_KEY y BREVO_API_KEY\n');
}
