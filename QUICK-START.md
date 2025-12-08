# 🚀 Guía Rápida: Poner en Marcha Todo

## ✅ Checklist Completo

### 1️⃣ **Probar Local (5 minutos)**
```bash
# Simplemente abre index.html en tu navegador
# La web funciona sin configuración adicional
```

### 2️⃣ **Configurar Mailchimp (10 minutos)**

1. Crea cuenta en [Mailchimp](https://mailchimp.com) (gratis)
2. Crea una "Audience" (lista)
3. Obtén:
   - **API Key**: Account → Settings → Extras → API keys
   - **Audience ID**: Audience → Settings → Audience name
   - **Server Prefix**: Lo ves en tu API key (`xxx-us21` → `us21`)

### 3️⃣ **Configurar OpenAI (5 minutos)**

1. Crea cuenta en [OpenAI](https://platform.openai.com)
2. Añade $5 de crédito (dura meses)
3. Obtén API Key: API Keys → Create new

### 4️⃣ **Publicar en GitHub con Automatización (15 minutos)**

```bash
# 1. Inicializa Git
git init
git add .
git commit -m "Initial commit"

# 2. Crea repo en GitHub y sube
git remote add origin https://github.com/tu-usuario/curador-rarezas.git
git branch -M main
git push -u origin main

# 3. Habilita GitHub Pages
# Ve a Settings → Pages → Source: main branch

# 4. Configura Secrets
# Settings → Secrets and variables → Actions → New secret
```

**Secrets a añadir:**
- `OPENAI_API_KEY` = tu-api-key-de-openai
- `MAILCHIMP_API_KEY` = tu-api-key-de-mailchimp
- `MAILCHIMP_AUDIENCE_ID` = tu-audience-id
- `MAILCHIMP_SERVER_PREFIX` = us21 (o el tuyo)

### 5️⃣ **Verificar Automatización**

1. Ve a Actions en GitHub
2. Ejecuta manualmente "Daily Update & Newsletter"
3. Verifica que:
   - ✅ Se añaden descubrimientos a `script.js`
   - ✅ Se crea/actualiza `email-history.json`
   - ✅ Se envía email (si tienes suscriptores)

---

## 🎯 Resultado Final

Una vez configurado, **cada día automáticamente**:

1. **9:00 AM UTC** → GitHub Action se ejecuta
2. **IA busca** 10 nuevas rarezas
3. **Se añaden** a `script.js` (commit automático)
4. **Se seleccionan** 6 únicas del día
5. **Se envía email** a todos los suscriptores
6. **Se actualiza** historial (nunca se repite)

---

## 🔧 Comandos Útiles

### Probar localmente (sin publicar)

```bash
# Instalar dependencias
npm install

# Actualizar BD con IA
npm run update-db

# Enviar email de prueba
npm run send-email

# Ambos a la vez
npm run daily
```

### Variables de entorno local

**Windows (PowerShell):**
```powershell
$env:OPENAI_API_KEY="sk-xxx"
$env:MAILCHIMP_API_KEY="xxx-us21"
$env:MAILCHIMP_AUDIENCE_ID="xxx"
$env:MAILCHIMP_SERVER_PREFIX="us21"
```

**Mac/Linux:**
```bash
export OPENAI_API_KEY="sk-xxx"
export MAILCHIMP_API_KEY="xxx-us21"
export MAILCHIMP_AUDIENCE_ID="xxx"
export MAILCHIMP_SERVER_PREFIX="us21"
```

O crea un archivo `.env` (no lo subas a Git):
```bash
cp .env.example .env
# Edita .env con tus credenciales
```

---

## 🐛 Problemas Comunes

### "Error: OPENAI_API_KEY not found"
→ Configura la variable de entorno o el Secret en GitHub

### "Mailchimp API error"
→ Verifica que tu API key sea correcta y el server prefix coincida

### "No se envían emails"
→ Verifica que tengas suscriptores confirmados en tu Audience

### "GitHub Actions no se ejecuta"
→ Ve a Actions → Enable workflows (si está deshabilitado)

### "Se repiten descubrimientos"
→ Borra `localStorage` en el navegador o `email-history.json` en el servidor

---

## 📊 Costos Mensuales

- **Mailchimp**: $0 (hasta 500 suscriptores)
- **OpenAI**: ~$1/mes (actualización diaria)
- **GitHub Pages**: $0
- **Hosting Vercel/Netlify**: $0

**Total: ~$1/mes** 🎉

---

## 💡 Tips

- **Cambia el horario**: Edita `.github/workflows/daily-update.yml` línea 6
- **Más descubrimientos diarios**: Cambia `count = 6` en `script.js`
- **Más descubrimientos de IA**: Cambia "10 nuevos" en `update-database.js`
- **Personaliza el email**: Edita `send-daily-email.js` función `generateEmailHTML`

---

## 🆘 Soporte

Si algo no funciona:

1. **Lee los logs** en GitHub Actions
2. **Verifica variables** de entorno
3. **Comprueba credenciales** de Mailchimp/OpenAI
4. **Revisa README.md** completo

---

**¡Listo! Ahora tienes un curador automático completamente funcional.** 🎨✨
