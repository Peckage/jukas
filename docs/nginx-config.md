# Nginx Configuration for Jukas

Production-ready nginx configuration for **jukas.nl**. Drop this in your VPS and run certbot.

---

## 🚀 One-Line Setup Script

Copy and paste this into your VPS terminal. It will:

- Create a dedicated `jukas` user
- Clone the repo and install dependencies
- Prompt for your desired port
- Set up a systemd service
- Configure nginx with SSL

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/Peckage/jukas/main/scripts/setup.sh)
```

Or if you prefer to review the script first:

```bash
curl -fsSL https://raw.githubusercontent.com/Peckage/jukas/main/scripts/setup.sh -o setup.sh
chmod +x setup.sh
sudo ./setup.sh
```

---

## Quick Setup

### 1. Create the nginx config

```bash
sudo nano /etc/nginx/sites-available/jukas
```

Paste this config:

```nginx
# /etc/nginx/sites-available/jukas

server {
    listen 80;
    listen [::]:80;
    server_name jukas.nl www.jukas.nl;

    # Root directory - Next.js static export
    root /var/www/jukas/out;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript application/rss+xml application/atom+xml image/svg+xml;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Cache static assets (immutable hashed files)
    location /_next/static {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Cache other static files
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1M;
        add_header Cache-Control "public";
        access_log off;
    }

    # Handle Next.js pages (static export)
    location / {
        try_files $uri $uri.html $uri/ /index.html;
    }

    # Error pages
    error_page 404 /404.html;
    error_page 500 502 503 504 /500.html;

    # Logging
    access_log /var/log/nginx/jukas.access.log;
    error_log /var/log/nginx/jukas.error.log;
}
```

### 2. Enable the site

```bash
sudo ln -s /etc/nginx/sites-available/jukas /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 3. Run Certbot (SSL + HTTPS redirect)

```bash
# Install certbot if needed
sudo apt update && sudo apt install -y certbot python3-certbot-nginx

# Get certificate and configure HTTPS (--redirect forces HTTPS-only)
sudo certbot --nginx -d jukas.nl -d www.jukas.nl --redirect --non-interactive --agree-tos -m your-email@example.com
```

**What `--redirect` does:** Certbot will automatically add a server block that redirects all HTTP traffic to HTTPS, so visitors can **only** access the site over HTTPS.

### 4. Verify auto-renewal

```bash
sudo certbot renew --dry-run
```

Certbot sets up a systemd timer that auto-renews certificates before they expire.

---

## After Certbot Runs

Your config will be modified to look something like this (Certbot adds the SSL parts):

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name jukas.nl www.jukas.nl;

    # Certbot adds this redirect
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name jukas.nl www.jukas.nl;

    # Certbot adds these SSL lines
    ssl_certificate /etc/letsencrypt/live/jukas.nl/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/jukas.nl/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Your original config continues here...
    root /var/www/jukas/out;
    index index.html;

    # ... rest of config
}
```

## Alternative: Node.js Server Mode

If running Next.js in server mode (not static export), use this config instead and let certbot modify it:

```nginx
# /etc/nginx/sites-available/jukas

upstream nextjs_upstream {
    server 127.0.0.1:3000;
    keepalive 64;
}

server {
    listen 80;
    listen [::]:80;
    server_name jukas.nl www.jukas.nl;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript application/rss+xml application/atom+xml image/svg+xml;

    # Proxy settings
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;

    # Static files - serve with long cache
    location /_next/static {
        proxy_pass http://nextjs_upstream;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # All other requests to Next.js
    location / {
        proxy_pass http://nextjs_upstream;
    }

    # Logging
    access_log /var/log/nginx/jukas.access.log;
    error_log /var/log/nginx/jukas.error.log;
}
```

Then run certbot with `--redirect` to add SSL and force HTTPS.

---

## Deployment Checklist

```bash
# On your local machine
pnpm build                                              # Build the static export
rsync -avz --delete out/ user@your-vps:/var/www/jukas/out/  # Upload to VPS

# On your VPS
sudo nano /etc/nginx/sites-available/jukas             # Paste the config above
sudo ln -s /etc/nginx/sites-available/jukas /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d jukas.nl -d www.jukas.nl --redirect --non-interactive --agree-tos -m your-email@example.com
```

## next.config.ts for Static Export

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
};

export default nextConfig;
```
