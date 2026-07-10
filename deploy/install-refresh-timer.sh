#!/usr/bin/env bash
# ============================================================
#  install-refresh-timer.sh — Instala un temporizador systemd que
#  ejecuta update-site.sh cada día a las 10:00 UTC, para traer al
#  VPS los cambios que GitHub Actions genera a las 09:00 UTC.
#
#  Uso (como root):  bash install-refresh-timer.sh
# ============================================================
set -euo pipefail
if [[ $EUID -ne 0 ]]; then echo "Ejecuta como root." >&2; exit 1; fi

APP_DIR="${APP_DIR:-/var/www/curador-rarezas}"

cat > /etc/systemd/system/curador-refresh.service <<EOF
[Unit]
Description=Refresca la web Curador de Rarezas desde GitHub
After=network-online.target
Wants=network-online.target

[Service]
Type=oneshot
Environment=APP_DIR=${APP_DIR}
ExecStart=/usr/bin/env bash ${APP_DIR}/deploy/update-site.sh
EOF

cat > /etc/systemd/system/curador-refresh.timer <<'EOF'
[Unit]
Description=Ejecuta curador-refresh cada día a las 10:00 UTC

[Timer]
OnCalendar=*-*-* 10:00:00 UTC
Persistent=true

[Install]
WantedBy=timers.target
EOF

systemctl daemon-reload
systemctl enable --now curador-refresh.timer
echo "✅ Timer instalado. Próxima ejecución:"
systemctl list-timers curador-refresh.timer --no-pager
