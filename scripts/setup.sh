#!/bin/bash
#
# Jukas Production Setup Script
# 
# Creates a dedicated user, installs dependencies, and sets up systemd + nginx
# Run with: sudo ./setup.sh
#
set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_banner() {
    echo -e "${BLUE}"
    echo "╔════════════════════════════════════════╗"
    echo "║           JUKAS SETUP SCRIPT           ║"
    echo "║      The Card Game - Production        ║"
    echo "╚════════════════════════════════════════╝"
    echo -e "${NC}"
}

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[✓]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[!]${NC} $1"; }
log_error() { echo -e "${RED}[✗]${NC} $1"; }

ask_yes_no() {
    local prompt="$1"
    local default="${2:-y}"
    local answer
    
    if [[ "$default" == "y" ]]; then
        read -p "$prompt [Y/n]: " answer
        answer=${answer:-y}
    else
        read -p "$prompt [y/N]: " answer
        answer=${answer:-n}
    fi
    
    [[ "$answer" =~ ^[Yy]$ ]]
}

check_root() {
    if [[ $EUID -ne 0 ]]; then
        log_error "This script must be run as root (use sudo)"
        exit 1
    fi
}

detect_existing() {
    echo ""
    log_info "Detecting existing installations..."
    echo ""
    
    # Node.js
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        log_success "Node.js found: $NODE_VERSION"
        HAS_NODE=true
    else
        log_warn "Node.js not found"
        HAS_NODE=false
    fi
    
    # pnpm
    if command -v pnpm &> /dev/null; then
        PNPM_VERSION=$(pnpm --version)
        log_success "pnpm found: $PNPM_VERSION"
        HAS_PNPM=true
    else
        log_warn "pnpm not found"
        HAS_PNPM=false
    fi
    
    # nginx
    if command -v nginx &> /dev/null; then
        NGINX_VERSION=$(nginx -v 2>&1 | cut -d'/' -f2)
        log_success "nginx found: $NGINX_VERSION"
        HAS_NGINX=true
    else
        log_warn "nginx not found"
        HAS_NGINX=false
    fi
    
    # certbot
    if command -v certbot &> /dev/null; then
        log_success "certbot found"
        HAS_CERTBOT=true
    else
        log_warn "certbot not found"
        HAS_CERTBOT=false
    fi
    
    echo ""
}

get_config() {
    echo "─────────────────────────────────────────"
    log_info "Configuration"
    echo "─────────────────────────────────────────"
    echo ""
    
    # Port
    read -p "Port to run Jukas on [3000]: " PORT
    PORT=${PORT:-3000}
    
    # Domain
    read -p "Domain name [jukas.nl]: " DOMAIN
    DOMAIN=${DOMAIN:-jukas.nl}
    
    # GitHub repo
    read -p "GitHub repo [Peckage/jukas]: " REPO
    REPO=${REPO:-Peckage/jukas}
    
    echo ""
    echo "─────────────────────────────────────────"
    log_info "What do you need installed?"
    echo "─────────────────────────────────────────"
    echo ""
    
    # Ask what to install/configure
    if [[ "$HAS_NODE" == "false" ]]; then
        INSTALL_NODE=true
    else
        if ask_yes_no "Reinstall Node.js?" "n"; then
            INSTALL_NODE=true
        else
            INSTALL_NODE=false
        fi
    fi
    
    if [[ "$HAS_PNPM" == "false" ]]; then
        INSTALL_PNPM=true
    else
        INSTALL_PNPM=false
    fi
    
    if [[ "$HAS_NGINX" == "true" ]]; then
        if ask_yes_no "Configure nginx for Jukas?" "y"; then
            CONFIGURE_NGINX=true
        else
            CONFIGURE_NGINX=false
        fi
        INSTALL_NGINX=false
    else
        if ask_yes_no "Install and configure nginx?" "y"; then
            INSTALL_NGINX=true
            CONFIGURE_NGINX=true
        else
            INSTALL_NGINX=false
            CONFIGURE_NGINX=false
        fi
    fi
    
    if [[ "$HAS_CERTBOT" == "true" ]]; then
        if ask_yes_no "Run certbot for SSL?" "y"; then
            RUN_CERTBOT=true
            read -p "Email for SSL certificate: " SSL_EMAIL
        else
            RUN_CERTBOT=false
        fi
        INSTALL_CERTBOT=false
    else
        if ask_yes_no "Install certbot and setup SSL?" "y"; then
            INSTALL_CERTBOT=true
            RUN_CERTBOT=true
            read -p "Email for SSL certificate: " SSL_EMAIL
        else
            INSTALL_CERTBOT=false
            RUN_CERTBOT=false
        fi
    fi
    
    if ask_yes_no "Create dedicated 'jukas' user?" "y"; then
        CREATE_USER=true
    else
        CREATE_USER=false
        read -p "Run as which user? [$(logname)]: " RUN_USER
        RUN_USER=${RUN_USER:-$(logname)}
    fi
    
    if ask_yes_no "Create systemd service?" "y"; then
        CREATE_SERVICE=true
    else
        CREATE_SERVICE=false
    fi
    
    # Summary
    echo ""
    echo "─────────────────────────────────────────"
    log_info "Summary"
    echo "─────────────────────────────────────────"
    echo -e "Port:           ${GREEN}$PORT${NC}"
    echo -e "Domain:         ${GREEN}$DOMAIN${NC}"
    echo -e "Repo:           ${GREEN}$REPO${NC}"
    [[ "$CREATE_USER" == "true" ]] && echo -e "User:           ${GREEN}jukas (new)${NC}" || echo -e "User:           ${GREEN}$RUN_USER${NC}"
    [[ "$INSTALL_NODE" == "true" ]] && echo -e "Install Node:   ${GREEN}Yes${NC}" || echo -e "Install Node:   ${YELLOW}Skip${NC}"
    [[ "$CONFIGURE_NGINX" == "true" ]] && echo -e "Nginx config:   ${GREEN}Yes${NC}" || echo -e "Nginx config:   ${YELLOW}Skip${NC}"
    [[ "$RUN_CERTBOT" == "true" ]] && echo -e "SSL (certbot):  ${GREEN}Yes${NC}" || echo -e "SSL (certbot):  ${YELLOW}Skip${NC}"
    [[ "$CREATE_SERVICE" == "true" ]] && echo -e "Systemd:        ${GREEN}Yes${NC}" || echo -e "Systemd:        ${YELLOW}Skip${NC}"
    echo "─────────────────────────────────────────"
    echo ""
    
    if ! ask_yes_no "Continue with these settings?" "y"; then
        log_warn "Setup cancelled"
        exit 0
    fi
}

create_user() {
    if [[ "$CREATE_USER" != "true" ]]; then
        return
    fi
    
    log_info "Creating dedicated 'jukas' user..."
    
    if id "jukas" &>/dev/null; then
        log_warn "User 'jukas' already exists, skipping..."
    else
        useradd -r -m -d /opt/jukas -s /bin/bash jukas
        log_success "Created user 'jukas' with home /opt/jukas"
    fi
    
    RUN_USER="jukas"
    APP_DIR="/opt/jukas/app"
}

install_deps() {
    log_info "Installing dependencies..."
    
    apt update
    
    if [[ "$INSTALL_NODE" == "true" ]]; then
        log_info "Installing Node.js 20..."
        curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
        apt install -y nodejs
    fi
    
    if [[ "$INSTALL_PNPM" == "true" ]]; then
        log_info "Installing pnpm..."
        npm install -g pnpm
    fi
    
    if [[ "$INSTALL_NGINX" == "true" ]]; then
        log_info "Installing nginx..."
        apt install -y nginx
    fi
    
    if [[ "$INSTALL_CERTBOT" == "true" ]]; then
        log_info "Installing certbot..."
        apt install -y certbot python3-certbot-nginx
    fi
    
    log_success "Dependencies ready"
}

setup_app() {
    log_info "Setting up Jukas application..."
    
    if [[ "$CREATE_USER" == "true" ]]; then
        APP_DIR="/opt/jukas/app"
    else
        APP_DIR="/home/${RUN_USER}/jukas"
    fi
    
    if [ -d "$APP_DIR" ]; then
        log_warn "App directory exists, pulling latest..."
        cd "$APP_DIR"
        sudo -u "$RUN_USER" git pull 2>/dev/null || git pull
    else
        log_info "Cloning repository..."
        if [[ "$CREATE_USER" == "true" ]]; then
            sudo -u "$RUN_USER" git clone "https://github.com/${REPO}.git" "$APP_DIR"
        else
            mkdir -p "$(dirname $APP_DIR)"
            git clone "https://github.com/${REPO}.git" "$APP_DIR"
            chown -R "$RUN_USER:$RUN_USER" "$APP_DIR"
        fi
        cd "$APP_DIR"
    fi
    
    log_info "Installing npm dependencies..."
    sudo -u "$RUN_USER" pnpm install 2>/dev/null || pnpm install
    
    log_info "Building application..."
    sudo -u "$RUN_USER" pnpm build 2>/dev/null || pnpm build
    
    log_success "Application built successfully"
}

create_service() {
    if [[ "$CREATE_SERVICE" != "true" ]]; then
        return
    fi
    
    log_info "Creating systemd service..."
    
    cat > /etc/systemd/system/jukas.service << EOF
[Unit]
Description=Jukas Card Game - Next.js Application
After=network.target

[Service]
Type=simple
User=${RUN_USER}
WorkingDirectory=${APP_DIR}
Environment=NODE_ENV=production
Environment=PORT=${PORT}
ExecStart=$(which pnpm) start
Restart=on-failure
RestartSec=10
NoNewPrivileges=true

[Install]
WantedBy=multi-user.target
EOF
    
    systemctl daemon-reload
    systemctl enable jukas
    systemctl start jukas
    
    log_success "Systemd service created and started"
}

setup_nginx() {
    if [[ "$CONFIGURE_NGINX" != "true" ]]; then
        return
    fi
    
    log_info "Configuring nginx..."
    
    cat > /etc/nginx/sites-available/jukas << EOF
upstream jukas_upstream {
    server 127.0.0.1:${PORT};
    keepalive 64;
}

server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN} www.${DOMAIN};

    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript application/rss+xml application/atom+xml image/svg+xml;

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;

    proxy_http_version 1.1;
    proxy_set_header Upgrade \$http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \$scheme;
    proxy_cache_bypass \$http_upgrade;

    location /_next/static {
        proxy_pass http://jukas_upstream\;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        proxy_pass http://jukas_upstream\;
    }

    access_log /var/log/nginx/jukas.access.log;
    error_log /var/log/nginx/jukas.error.log;
}
EOF
    
    ln -sf /etc/nginx/sites-available/jukas /etc/nginx/sites-enabled/
    nginx -t && systemctl reload nginx
    
    log_success "Nginx configured"
}

setup_ssl() {
    if [[ "$RUN_CERTBOT" != "true" ]]; then
        return
    fi
    
    log_info "Setting up SSL with Certbot..."
    
    certbot --nginx -d "${DOMAIN}" -d "www.${DOMAIN}" \
        --redirect \
        --non-interactive \
        --agree-tos \
        -m "${SSL_EMAIL}"
    
    log_success "SSL certificate installed"
}

print_summary() {
    echo ""
    echo -e "${GREEN}════════════════════════════════════════${NC}"
    echo -e "${GREEN}         SETUP COMPLETE! 🎉             ${NC}"
    echo -e "${GREEN}════════════════════════════════════════${NC}"
    echo ""
    echo -e "  🌐 URL:     ${BLUE}https://${DOMAIN}${NC}"
    echo -e "  🔌 Port:    ${PORT}"
    echo -e "  📁 App:     ${APP_DIR}"
    echo -e "  👤 User:    ${RUN_USER}"
    echo ""
    
    if [[ "$CREATE_SERVICE" == "true" ]]; then
        echo "Commands:"
        echo -e "  ${YELLOW}sudo systemctl status jukas${NC}   - Check status"
        echo -e "  ${YELLOW}sudo systemctl restart jukas${NC}  - Restart"
        echo -e "  ${YELLOW}sudo journalctl -u jukas -f${NC}   - View logs"
    else
        echo "To start manually:"
        echo -e "  ${YELLOW}cd ${APP_DIR} && PORT=${PORT} pnpm start${NC}"
    fi
    echo ""
}

# Main
main() {
    print_banner
    check_root
    detect_existing
    get_config
    create_user
    install_deps
    setup_app
    create_service
    setup_nginx
    setup_ssl
    print_summary
}

main "$@"
