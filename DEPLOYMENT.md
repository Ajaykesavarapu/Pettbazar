# PettBazar — Hostinger VPS Deployment Guide

## Prerequisites

- Hostinger VPS with SSH access
- Ubuntu 22.04+ (or similar)
- Domain `pettbazar.com` pointing to your VPS IP

---

## 1. Server Setup

SSH into your VPS:

```bash
ssh root@YOUR_VPS_IP
```

Update system & install essentials:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl nginx certbot python3-certbot-nginx
```

### Install Node.js (v20+) via NVM

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
nvm alias default 20
```

### Install pnpm & PM2

```bash
npm install -g pnpm pm2
```

### Install PostgreSQL

```bash
sudo apt install -y postgresql postgresql-contrib
sudo systemctl enable postgresql
sudo systemctl start postgresql

# Create database & user
sudo -u postgres psql
```

In the PostgreSQL shell:

```sql
CREATE USER pettbazar_user WITH PASSWORD 'your_secure_password';
CREATE DATABASE pettbazar OWNER pettbazar_user;
GRANT ALL PRIVILEGES ON DATABASE pettbazar TO pettbazar_user;
\q
```

---

## 2. Deploy the App

```bash
cd /var/www
git clone https://github.com/YOUR_USERNAME/pettbazar.git
cd pettbazar
```

### Configure Environment

```bash
cp .env.example .env
nano .env
```

Fill in your production values:

```
NODE_ENV=production
PORT=8080
DATABASE_URL=postgresql://pettbazar_user:your_secure_password@localhost:5432/pettbazar
CORS_ORIGIN=https://pettbazar.com
VITE_EMAILJS_PUBLIC_KEY=ISKx4EaoX_BjJFyYB
VITE_EMAILJS_SERVICE_ID=service_63o4w4s
```

### Install & Build

```bash
pnpm install --frozen-lockfile
pnpm run build:prod
```

### Push Database Schema

```bash
pnpm run db:push
```

---

## 3. Start with PM2

```bash
# Create logs directory
mkdir -p logs

# Start the app
pm2 start ecosystem.config.cjs

# Save PM2 config & set startup on boot
pm2 save
pm2 startup
# (Run the command it outputs)

# Verify it's running
pm2 status
pm2 logs pettbazar-api
```

Test the server:

```bash
curl http://localhost:8080/api/healthz
# Should return: {"status":"ok"}
```

---

## 4. Configure Nginx

```bash
sudo cp nginx.conf.example /etc/nginx/sites-available/pettbazar
sudo ln -s /etc/nginx/sites-available/pettbazar /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default  # Remove default site
sudo nginx -t
sudo systemctl reload nginx
```

### SSL Certificate (Let's Encrypt)

```bash
sudo certbot --nginx -d pettbazar.com -d www.pettbazar.com
```

Certbot auto-renews. Verify with:

```bash
sudo certbot renew --dry-run
```

---

## 5. Firewall

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

---

## 6. DNS Setup (Hostinger Panel)

In your Hostinger domain DNS settings, add:

| Type  | Name | Value          | TTL  |
|-------|------|----------------|------|
| A     | @    | YOUR_VPS_IP    | 3600 |
| A     | www  | YOUR_VPS_IP    | 3600 |

---

## Common Commands

| Task                    | Command                              |
|-------------------------|--------------------------------------|
| View app status         | `pm2 status`                         |
| View logs               | `pm2 logs pettbazar-api`             |
| Restart app             | `pm2 restart pettbazar-api`          |
| Stop app                | `pm2 stop pettbazar-api`             |
| Rebuild & restart       | `pnpm run build:prod && pm2 restart pettbazar-api` |
| Update from git         | `git pull && pnpm install && pnpm run build:prod && pm2 restart pettbazar-api` |
| Check Nginx config      | `sudo nginx -t`                      |
| Reload Nginx            | `sudo systemctl reload nginx`        |
| Renew SSL               | `sudo certbot renew`                 |

---

## Troubleshooting

- **502 Bad Gateway**: Check if PM2 is running (`pm2 status`) and the PORT matches Nginx config
- **App crashes on start**: Check logs with `pm2 logs pettbazar-api --lines 50`
- **Database connection error**: Verify `DATABASE_URL` in `.env` and that PostgreSQL is running (`sudo systemctl status postgresql`)
- **Build fails**: Ensure Node.js 20+ is active (`node -v`) and dependencies are installed (`pnpm install`)
