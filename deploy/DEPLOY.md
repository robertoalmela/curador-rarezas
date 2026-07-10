# 🚀 Desplegar "Curador de Rarezas" en tu VPS

Guía paso a paso para publicar la web en tu VPS de Contabo (`173.249.46.245`).

> **Importante:** Yo (Claude) no puedo conectarme por SSH a tu servidor desde
> mi entorno (está aislado y sin acceso saliente por SSH). Tú ejecutas los
> comandos desde tu ordenador; yo he preparado todos los scripts y aquí tienes
> exactamente qué hacer.

---

## 🔐 PASO 0 — Seguridad (hazlo SÍ o SÍ primero)

Compartiste la contraseña de root en un chat, así que considérala comprometida.
**Cámbiala antes de nada.**

Conéctate al VPS (Windows: usa PowerShell o PuTTY; Mac/Linux: Terminal):

```bash
ssh root@173.249.46.245
# contraseña actual: la que pusiste en el pedido
```

Una vez dentro, cambia la contraseña de root por una larga y aleatoria:

```bash
passwd
```

### (Recomendado) Crear un usuario normal con sudo y entrar con clave SSH

Trabajar siempre como root es arriesgado. Crea un usuario propio:

```bash
adduser roberto            # te pedirá una contraseña
usermod -aG sudo roberto   # le das permisos de administrador
```

Desde **tu ordenador** (no en el VPS), si no tienes clave SSH, créala y cópiala:

```bash
ssh-keygen -t ed25519 -C "roberto"        # pulsa Enter en todo
ssh-copy-id roberto@173.249.46.245         # te pedirá la contraseña del usuario
```

A partir de aquí podrás entrar sin contraseña con `ssh roberto@173.249.46.245`.

> Endurecer SSH (desactivar login de root y por contraseña) es muy recomendable,
> pero hazlo **solo cuando confirmes** que entras con tu clave, para no quedarte
> fuera. Lo dejo al final, en "Endurecer el servidor".

---

## 📦 PASO 1 — Desplegar la web (2 comandos)

Ya en el VPS (como root, o con `sudo -i`):

```bash
# 1. Traer el repositorio (rama con estos scripts)
git clone -b claude/vps-setup-deployment-hgj68l \
  https://github.com/robertoalmela/curador-rarezas.git /tmp/curador-setup

# 2. Ejecutar el instalador
bash /tmp/curador-setup/deploy/setup-vps.sh
```

El script hace **todo automáticamente**:
- Actualiza el sistema.
- Instala Nginx, Git, Node.js 20, firewall (UFW) y fail2ban.
- Clona la web en `/var/www/curador-rarezas`.
- Configura y arranca Nginx.
- Abre los puertos 80, 443 y SSH en el firewall.

> Nota: el instalador despliega la rama **`main`** de la web. Los scripts de
> despliegue viven en la rama de trabajo, por eso el `git clone` de arriba usa
> esa rama solo para lanzar el instalador. (Cuando fusiones esta rama en `main`,
> podrás clonar directamente `main`.)

Cuando termine, abre en el navegador:

### 👉 http://173.249.46.245

Deberías ver tu web. 🎉

---

## 🔄 PASO 2 — Mantener la web actualizada

Tu automatización diaria vive en **GitHub Actions** (cada día a las 09:00 UTC
actualiza `script.js` y envía el newsletter). Para que el VPS muestre lo nuevo,
solo tiene que hacer `git pull`.

**Opción A — Automático (recomendado):** instala un temporizador que refresca
la web cada día a las 10:00 UTC:

```bash
bash /var/www/curador-rarezas/deploy/install-refresh-timer.sh
```

**Opción B — Manual**, cuando tú quieras:

```bash
bash /var/www/curador-rarezas/deploy/update-site.sh
```

---

## 🌐 PASO 3 (opcional) — Dominio propio + HTTPS

Si tienes o compras un dominio (ej. en Namecheap, Porkbun, IONOS...):

1. En el panel de tu dominio, crea un registro **A**:
   - Host: `@`  →  `173.249.46.245`
   - Host: `www` → `173.249.46.245`
2. Espera unos minutos a que propague (`ping tudominio.com` debe dar tu IP).
3. En el VPS, activa HTTPS gratis con un comando:

```bash
bash /var/www/curador-rarezas/deploy/enable-https.sh tudominio.com www.tudominio.com
```

Esto instala Let's Encrypt, configura el candado verde y la renovación
automática. Tu web pasará a **https://tudominio.com**.

---

## 🤖 PASO 4 (opcional) — Mover la automatización diaria al VPS

Solo si prefieres que el VPS (y no GitHub Actions) haga la actualización + email:

```bash
# 1. Crear el fichero de variables y rellenar tus API keys
cp /var/www/curador-rarezas/.env.example /var/www/curador-rarezas/.env
nano /var/www/curador-rarezas/.env      # pega tus keys (GROQ, SERPAPI, BREVO...)
chmod 600 /var/www/curador-rarezas/.env

# 2. Instalar el temporizador diario
bash /var/www/curador-rarezas/deploy/install-daily-timer.sh
```

> ⚠️ Si activas esto, **desactiva el workflow de GitHub Actions** para no enviar
> el newsletter dos veces (en GitHub: pestaña *Actions* → *Daily Update* →
> *"..."* → *Disable workflow*).

Probar la ejecución al instante y ver el log:

```bash
systemctl start curador-daily.service
journalctl -u curador-daily.service -f
```

---

## 🛡️ Endurecer el servidor (recomendado, cuando ya entres con tu clave)

Solo tras confirmar que entras con `ssh roberto@173.249.46.245` **sin contraseña**:

```bash
sudo nano /etc/ssh/sshd_config
```

Cambia estas líneas:

```
PermitRootLogin no
PasswordAuthentication no
```

Guarda y recarga:

```bash
sudo systemctl restart ssh
```

Con esto solo se puede entrar con tu clave SSH y no como root. El firewall (UFW)
y fail2ban ya quedaron activos desde el instalador.

---

## 🧰 Comandos útiles del día a día

```bash
systemctl status nginx                 # ¿está la web arriba?
sudo nginx -t && sudo systemctl reload nginx   # recargar tras cambios
journalctl -u nginx -n 50              # últimos logs de Nginx
sudo ufw status                        # estado del firewall
systemctl list-timers                  # ver tareas programadas
df -h                                  # espacio en disco
```

---

## ➕ Desplegar MÁS proyectos en el mismo VPS

Este VPS ya queda listo como base. Para cada proyecto nuevo:

- **Web estática / SPA:** clónala en `/var/www/otro-proyecto` y crea un bloque
  Nginx nuevo en `/etc/nginx/sites-available/` (copia `nginx-curador.conf` como
  plantilla), cambiando `server_name` (un subdominio, p.ej. `blog.tudominio.com`)
  y la carpeta `root`.
- **App con backend (Node/Python):** ejecútala en un puerto local (ej. 3000) con
  un servicio systemd, y en Nginx usa `proxy_pass http://127.0.0.1:3000;`.
- **HTTPS** para cada subdominio: `bash deploy/enable-https.sh sub.tudominio.com`.

Cuando quieras desplegar el siguiente, dime cuál es (o pásame el repo) y te
preparo su bloque igual que este. Si acabas teniendo muchos proyectos, podemos
migrar a Docker + un reverse proxy (Caddy/Traefik) para gestionarlos mejor.
