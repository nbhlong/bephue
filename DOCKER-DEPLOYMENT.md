# 🐳 Docker Deployment Guide - BepHue Restaurant

Complete guide for deploying BepHue Restaurant website using Docker.

---

## ⚡ Quick Reference

**🎯 TL;DR - First Time Setup (Local Development):**

```bash
# 1. Setup environment
cp .env.example .env
# Edit .env with generated secrets (see guide below)

# 2. Build and start
docker-compose build
docker-compose up -d

# 3. Create admin account
# Visit http://localhost:1338/admin
```

**📅 Daily Operations:**

```bash
docker-compose up -d           # Start all services
docker-compose down            # Stop all services
docker-compose logs -f         # View logs (all services)
docker-compose logs -f backend # View specific service logs
docker-compose restart backend # Restart a service
docker-compose ps              # Check running containers
```

**🔗 Access Points:**

- **Frontend:** http://localhost:3000
- **Backend Admin:** http://localhost:1338/admin
- **API:** http://localhost:1338/api
- **With Nginx (port 80):** http://localhost
- **Health Check:** http://localhost/health

**🛠️ Common Issues:**

```bash
# Port already in use
docker-compose down          # Stop existing containers
# Or change ports in docker-compose.yml

# Database connection failed
docker-compose restart database
docker-compose logs database

# Rebuild after code changes
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

---

## 📋 Prerequisites

- Docker Engine 20.10+ installed
- Docker Compose 2.0+ installed
- At least 2GB RAM available
- 10GB free disk space

### Install Docker

**Ubuntu/Debian:**

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

**macOS/Windows:**
Download Docker Desktop from https://www.docker.com/products/docker-desktop

## 🚀 Quick Start

### Option A: Local Development (Recommended for First Time)

**Step 1: Setup Environment File**

```bash
# Copy the example file
cp .env.example .env
```

**Step 2: Generate Secure Secrets**

```bash
# Windows PowerShell - Generate all secrets at once:
node -e "const crypto = require('crypto'); console.log('JWT_SECRET=' + crypto.randomBytes(32).toString('base64')); console.log('ADMIN_JWT_SECRET=' + crypto.randomBytes(32).toString('base64')); console.log('API_TOKEN_SALT=' + crypto.randomBytes(32).toString('base64')); console.log('TRANSFER_TOKEN_SALT=' + crypto.randomBytes(32).toString('base64')); const keys = []; for(let i=0; i<4; i++) keys.push(crypto.randomBytes(32).toString('base64')); console.log('APP_KEYS=' + keys.join(','));"

# Linux/macOS - Generate individual secrets:
openssl rand -base64 32
```

**Step 3: Edit .env File**

Open `.env` and update these values:

```bash
# Windows:
notepad .env

# Linux/macOS:
nano .env
```

**Required changes in .env:**

- Replace `change-this-secure-password` with a strong database password
- Paste the generated secrets from Step 2
- Keep `NEXT_PUBLIC_API_URL=http://localhost:1338` (for local development)
- Keep `NEXT_PUBLIC_SITE_URL=http://localhost:3000` (for local development)

**Step 4: Build Docker Images**

```bash
# Build all services (first time or after code changes)
docker-compose build

# Or build without cache (slower but ensures fresh build)
docker-compose build --no-cache
```

**Step 5: Start All Services**

```bash
# Start in foreground (see logs in terminal)
docker-compose up

# Or start in background (detached mode)
docker-compose up -d

# View logs if running in background
docker-compose logs -f
```

**Step 6: Wait for Services to Start**

- Database: ~10-15 seconds
- Backend (Strapi): ~30-60 seconds (first time build can take longer)
- Frontend (Next.js): ~20-30 seconds

**Step 7: Access Your Application**

- **Frontend:** http://localhost:3000
- **Backend Admin:** http://localhost:1338/admin
- **API:** http://localhost:1338/api
- **With Nginx (optional):** http://localhost

**Step 8: Create Strapi Admin Account**

1. Visit http://localhost:1338/admin
2. Create your first admin account (save credentials!)
3. Start adding content!

**Step 9: Stop Services When Done**

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (⚠️ deletes database data!)
docker-compose down -v
```

---

### Option B: Production Deployment

**Step 1: Prepare Production Environment File**

```bash
# Copy example file
cp .env.example .env.production

# Edit production file
nano .env.production  # or notepad .env.production
```

**Step 2: Configure Production Environment**

Update `.env.production` with:

```bash
NODE_ENV=production

# Database - Use strong passwords!
DATABASE_PASSWORD=your-very-strong-production-password

# Generate NEW secrets for production (different from development!)
JWT_SECRET=<generate-new-32-byte-base64>
ADMIN_JWT_SECRET=<generate-new-32-byte-base64>
APP_KEYS=<generate-4-keys-comma-separated>
API_TOKEN_SALT=<generate-new-32-byte-base64>
TRANSFER_TOKEN_SALT=<generate-new-32-byte-base64>

# Frontend URLs - Use your actual domain
NEXT_PUBLIC_API_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Or if using separate API subdomain:
# NEXT_PUBLIC_API_URL=https://api.yourdomain.com
# NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

**Step 3: Build Production Images**

```bash
# Copy production env file
cp .env.production .env

# Build with no cache for production
docker-compose build --no-cache

# Or build specific service
docker-compose build backend
docker-compose build frontend
```

**Step 4: Start Production Services**

```bash
# Start all services in background
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

**Step 5: Verify Services Are Running**

```bash
# Check all containers are running
docker-compose ps

# Check backend health
curl http://localhost:1338/_health

# Check frontend
curl http://localhost:3000

# View specific service logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs database
```

**Step 6: Configure Domain & SSL (Production Only)**

See the "🌐 Production Deployment" section below for:

- Domain configuration
- SSL/HTTPS setup
- Nginx reverse proxy
- Firewall configuration

---

## ✅ Testing & Verification Checklist

After starting Docker containers, verify everything is working:

**1. Check All Containers Are Running**

```bash
docker-compose ps
```

Expected output: All 4 services (database, backend, frontend, nginx) should show "Up" status.

**2. Test Backend (Strapi)**

```bash
# Check backend is responding
curl http://localhost:1338/admin

# Or open in browser
# http://localhost:1338/admin (should show Strapi admin login)
```

**3. Test Frontend (Next.js)**

```bash
# Check frontend is responding
curl http://localhost:3000

# Or open in browser
# http://localhost:3000 (should show BepHue homepage)
```

**4. Test API Endpoints**

```bash
# Test restaurant info endpoint
curl http://localhost:1338/api/restaurant-info

# Test menu items endpoint
curl http://localhost:1338/api/menu-items?populate=*

# Test gallery images endpoint
curl http://localhost:1338/api/gallery-images?populate=*
```

**5. Test Nginx Reverse Proxy (Optional)**

```bash
# If using nginx, test port 80
curl http://localhost

# Should show frontend homepage
```

**6. Check Logs for Errors**

```bash
# View all logs
docker-compose logs

# Check for errors in specific services
docker-compose logs backend | grep -i error
docker-compose logs frontend | grep -i error
docker-compose logs database | grep -i error
```

**7. Create Test Strapi Admin Account**

1. Visit http://localhost:1338/admin
2. Fill in admin registration form
3. Login successfully
4. Verify dashboard loads

**8. Add Sample Content to Strapi**

1. Go to Content Manager
2. Add a test menu item
3. Upload an image
4. Publish the content

**9. Verify Frontend Shows Strapi Content**

1. Visit http://localhost:3000/menu
2. Verify the test menu item appears
3. Check image loads correctly

**10. Test Forms**

1. Visit http://localhost:3000/contact
2. Fill out contact form
3. Submit and verify success message
4. Check Strapi admin for submission

---

## 📦 Docker Commands Reference

### Container Management

```bash
# View running containers
docker-compose ps

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop all services
docker-compose down

# Stop and remove volumes (⚠️ deletes data)
docker-compose down -v

# Restart a service
docker-compose restart backend
docker-compose restart frontend

# Execute command in container
docker-compose exec backend sh
docker-compose exec frontend sh
```

### Building & Updating

```bash
# Rebuild a specific service
docker-compose build backend
docker-compose build frontend

# Rebuild without cache
docker-compose build --no-cache

# Pull latest base images
docker-compose pull

# Update and restart
docker-compose up -d --build
```

### Database Management

```bash
# Access PostgreSQL
docker-compose exec database psql -U strapi -d strapi

# Backup database
docker-compose exec database pg_dump -U strapi strapi > backup.sql

# Restore database
cat backup.sql | docker-compose exec -T database psql -U strapi -d strapi

# View database logs
docker-compose logs database
```

## 🔧 Configuration Options

### Scaling Services

```bash
# Run multiple frontend instances
docker-compose up -d --scale frontend=3
```

### Resource Limits

Add to `docker-compose.yml` under each service:

```yaml
services:
  backend:
    # ... other config
    deploy:
      resources:
        limits:
          cpus: "1"
          memory: 1G
        reservations:
          memory: 512M
```

### Custom Networks

```bash
# Create external network
docker network create bephue-net

# Update docker-compose.yml
networks:
  default:
    external:
      name: bephue-net
```

## 🌐 Production Deployment

### 1. Update Environment Variables

```bash
# .env for production
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.bephue.vn
NEXT_PUBLIC_SITE_URL=https://bephue.vn
```

### 2. Enable HTTPS (SSL/TLS)

**Option A: Let's Encrypt with Certbot**

```bash
# Install certbot
sudo apt-get install certbot

# Get SSL certificate
sudo certbot certonly --standalone -d bephue.vn -d www.bephue.vn

# Copy certificates
sudo cp /etc/letsencrypt/live/bephue.vn/fullchain.pem nginx/ssl/cert.pem
sudo cp /etc/letsencrypt/live/bephue.vn/privkey.pem nginx/ssl/key.pem
```

**Option B: Use Cloudflare SSL (easier)**

1. Point your domain to Cloudflare
2. Enable SSL in Cloudflare dashboard
3. No need to modify nginx config

### 3. Configure Nginx for HTTPS

Uncomment the HTTPS section in `nginx/nginx.conf`

### 4. Deploy

```bash
# Build for production
docker-compose build --no-cache

# Start services
docker-compose up -d

# Check status
docker-compose ps
docker-compose logs -f
```

## 🔒 Security Best Practices

### 1. Secrets Management

❌ **Don't:**

- Commit `.env` file to Git
- Use default passwords
- Share secrets in plain text

✅ **Do:**

- Use `.env.example` as template
- Generate strong random secrets
- Use environment variables
- Consider Docker secrets for production

```bash
# Generate strong secrets
openssl rand -base64 32
```

### 2. Firewall Configuration

**Linux (UFW):**

```bash
# Allow only necessary ports
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp  # SSH
sudo ufw enable
```

**Windows Firewall:**

```powershell
# Open Windows Defender Firewall
# Manually add inbound rules for ports 80, 443, 1338, 3000
```

**Note:** For production servers, only expose ports 80 and 443 to the internet.

### 3. Regular Updates

```bash
# Update base images regularly
docker-compose pull
docker-compose up -d --build
```

## 📊 Monitoring & Logging

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service with timestamps
docker-compose logs -f --timestamps backend

# Last 100 lines
docker-compose logs --tail=100 frontend
```

### Health Checks

```bash
# Check container health
docker-compose ps

# Manual health check
curl http://localhost:3000/  # Frontend
curl http://localhost:1338/_health  # Backend
```

### Resource Usage

```bash
# Monitor resource usage
docker stats

# Specific container
docker stats bephue-frontend
```

## 🐛 Troubleshooting

### Port Already in Use

**Error:** `Bind for 0.0.0.0:3000 failed: port is already allocated`

**Solution 1: Stop existing containers**

```bash
# Stop all BepHue containers
docker-compose down

# Or stop all Docker containers
docker stop $(docker ps -aq)
```

**Solution 2: Find and kill the process (Windows)**

```powershell
# Find process using port
netstat -ano | findstr :3000
netstat -ano | findstr :1338

# Kill process (replace <PID> with actual process ID from above)
taskkill /PID <PID> /F
```

**Solution 3: Find and kill the process (Linux/macOS)**

```bash
# Find and kill process
lsof -ti:3000 | xargs kill -9
lsof -ti:1338 | xargs kill -9
```

**Solution 4: Change ports in docker-compose.yml**

```yaml
# Example: Change frontend port from 3000 to 3001
ports:
  - "3001:3000"
```

### Database Connection Failed

```bash
# Check database is running
docker-compose ps database

# View database logs
docker-compose logs database

# Restart database
docker-compose restart database
```

### Container Won't Start

```bash
# Check logs for errors
docker-compose logs <service-name>

# Remove and rebuild
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Out of Disk Space

```bash
# Clean up unused images
docker system prune -a

# Remove unused volumes
docker volume prune

# Check disk usage
docker system df
```

### Cannot Access Strapi Admin

**Error:** Admin page shows blank or 404

```bash
# Rebuild Strapi admin
docker-compose exec backend npm run build

# Or rebuild container entirely
docker-compose down
docker-compose build backend --no-cache
docker-compose up -d

# Check Strapi logs for errors
docker-compose logs -f backend
```

**Also try:**

- Clear browser cache (Ctrl+Shift+Delete)
- Try incognito/private mode
- Check if backend is fully started (wait 60 seconds)

### Docker Desktop Issues (Windows)

**Error:** `Cannot connect to Docker daemon`

**Solution:**

1. Start Docker Desktop application
2. Wait for Docker engine to fully start (green icon in system tray)
3. Run: `docker ps` to verify connection

**Error:** `WSL 2 installation is incomplete`

**Solution:**

1. Install WSL 2: https://aka.ms/wsl2kernel
2. Restart Docker Desktop
3. Go to Docker Desktop Settings → General → Use WSL 2 engine

**Error:** Slow build times on Windows

**Solution:**

1. Move project to WSL 2 filesystem: `\\wsl$\Ubuntu\home\user\`
2. Or enable Docker Desktop → Settings → Resources → WSL Integration
3. Use BuildKit: `DOCKER_BUILDKIT=1 docker-compose build`

### Build Errors

**Error:** `npm ERR! network` or timeout during build

**Solution:**

```bash
# Rebuild with increased timeout
docker-compose build --build-arg NODE_OPTIONS=--max-old-space-size=4096

# Or use different npm registry
docker-compose build --build-arg NPM_REGISTRY=https://registry.npmjs.org
```

**Error:** `COPY failed: file not found`

**Solution:**

- Verify files exist in frontend/backend directories
- Check `.dockerignore` isn't excluding required files
- Rebuild with no cache: `docker-compose build --no-cache`

**Error:** `Cannot find module` in Next.js container

**Solution:**

```bash
# Rebuild frontend completely
docker-compose down
docker-compose build frontend --no-cache
docker-compose up -d frontend
```

### Frontend Cannot Connect to Backend

**Error:** API calls from browser fail with CORS or network errors

**Check these:**

1. **Verify .env has correct URLs:**

   ```bash
   # For local Docker development, should be:
   NEXT_PUBLIC_API_URL=http://localhost:1338
   ```

2. **Rebuild frontend after .env changes:**

   ```bash
   docker-compose down
   docker-compose build frontend --no-cache
   docker-compose up -d
   ```

3. **Check backend is accessible:**

   ```bash
   curl http://localhost:1338/api/restaurant-info
   ```

4. **Check browser console for actual error:**
   - Open DevTools (F12)
   - Check Console and Network tabs
   - Look for specific error messages

## 💾 Backup & Restore

### Backup Everything

```bash
#!/bin/bash
# backup.sh

BACKUP_DIR="backups/$(date +%Y%m%d_%H%M%S)"
mkdir -p $BACKUP_DIR

# Backup database
docker-compose exec -T database pg_dump -U strapi strapi > $BACKUP_DIR/database.sql

# Backup Strapi uploads
docker cp bephue-backend:/opt/app/public/uploads $BACKUP_DIR/

# Backup environment
cp .env $BACKUP_DIR/

echo "Backup completed: $BACKUP_DIR"
```

### Restore

```bash
#!/bin/bash
# restore.sh

BACKUP_DIR=$1

# Restore database
cat $BACKUP_DIR/database.sql | docker-compose exec -T database psql -U strapi -d strapi

# Restore uploads
docker cp $BACKUP_DIR/uploads bephue-backend:/opt/app/public/

echo "Restore completed from: $BACKUP_DIR"
```

## 🚀 Production Deployment Platforms

### Option 1: Railway (Easiest - Recommended) 🚂

Railway offers easy Docker deployment with managed PostgreSQL.

**Step 1: Create Railway Account**

- Visit https://railway.app
- Sign up with GitHub

**Step 2: Create New Project**

- Click "New Project"
- Select "Deploy from GitHub repo"
- Connect your BepHue repository

**Step 3: Add PostgreSQL Database**

- Click "+ New"
- Select "Database" → "PostgreSQL"
- Railway will provision database automatically

**Step 4: Deploy Backend (Strapi)**

- Click "+ New" → "GitHub Repo" → Select backend folder
- Set Build Path: `backend`
- Set Dockerfile Path: `backend/Dockerfile`
- Add environment variables (from Railway PostgreSQL):
  ```
  DATABASE_CLIENT=postgres
  DATABASE_HOST=${{Postgres.PGHOST}}
  DATABASE_PORT=${{Postgres.PGPORT}}
  DATABASE_NAME=${{Postgres.PGDATABASE}}
  DATABASE_USERNAME=${{Postgres.PGUSER}}
  DATABASE_PASSWORD=${{Postgres.PGPASSWORD}}
  JWT_SECRET=<generate-new>
  ADMIN_JWT_SECRET=<generate-new>
  APP_KEYS=<generate-new-4-keys>
  API_TOKEN_SALT=<generate-new>
  TRANSFER_TOKEN_SALT=<generate-new>
  ```

**Step 5: Deploy Frontend (Next.js)**

- Click "+ New" → "GitHub Repo" → Select frontend folder
- Set Build Path: `frontend`
- Set Dockerfile Path: `frontend/Dockerfile`
- Add environment variables:
  ```
  NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
  NEXT_PUBLIC_SITE_URL=https://your-frontend-url.railway.app
  ```

**Step 6: Configure Custom Domain (Optional)**

- Go to your service → Settings → Domains
- Add your custom domain
- Update DNS records as instructed

**Cost:** ~$5-20/month depending on usage

---

### Option 2: Vercel (Frontend) + Railway (Backend) 🔷

Best performance for Next.js frontend.

**Deploy Backend to Railway (follow Option 1 steps 1-4)**

**Deploy Frontend to Vercel:**

**Step 1: Install Vercel CLI**

```bash
npm i -g vercel
```

**Step 2: Deploy**

```bash
cd frontend
vercel
```

**Step 3: Set Environment Variables**

```bash
vercel env add NEXT_PUBLIC_API_URL production
# Enter: https://your-backend.railway.app

vercel env add NEXT_PUBLIC_SITE_URL production
# Enter: https://yourdomain.com
```

**Step 4: Deploy to Production**

```bash
vercel --prod
```

**Cost:** Frontend free on Vercel, Backend ~$5-10/month on Railway

---

### Option 3: DigitalOcean Droplet (Full Control) 🌊

For full control over your infrastructure.

**Step 1: Create Droplet**

- Visit https://cloud.digitalocean.com
- Click "Create" → "Droplets"
- Choose: Docker on Ubuntu 22.04 (pre-installed Docker)
- Size: Basic $12/month (2GB RAM minimum)
- Add SSH key

**Step 2: SSH into Server**

```bash
ssh root@your-droplet-ip
```

**Step 3: Clone Repository**

```bash
# Install git if needed
apt-get update && apt-get install -y git

# Clone your repo
git clone https://github.com/yourusername/bephue-restaurant.git
cd bephue-restaurant
```

**Step 4: Setup Environment**

```bash
# Copy and edit environment file
cp .env.example .env
nano .env

# Update all secrets and URLs
# NEXT_PUBLIC_API_URL=https://yourdomain.com
# NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

**Step 5: Deploy with Docker**

```bash
# Build and start
docker-compose build --no-cache
docker-compose up -d

# Check status
docker-compose ps
docker-compose logs -f
```

**Step 6: Configure Domain & SSL**

```bash
# Install Certbot for SSL
apt-get install -y certbot

# Get SSL certificate
certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Update nginx config with SSL (uncomment HTTPS section in nginx.conf)
nano nginx/nginx.conf

# Restart nginx
docker-compose restart nginx
```

**Step 7: Setup Firewall**

```bash
# Allow necessary ports
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw enable
```

**Cost:** $12-24/month depending on droplet size

---

### Option 4: AWS EC2 (Enterprise Grade) ☁️

**Step 1: Launch EC2 Instance**

- Login to AWS Console
- Navigate to EC2 → Launch Instance
- Select: Ubuntu Server 22.04 LTS
- Instance Type: t3.small or larger (minimum 2GB RAM)
- Configure security group:
  - Allow SSH (22) from your IP
  - Allow HTTP (80) from anywhere
  - Allow HTTPS (443) from anywhere

**Step 2: Connect to Instance**

```bash
# Use your .pem key file
ssh -i your-key.pem ubuntu@your-ec2-public-ip
```

**Step 3: Install Docker**

```bash
# Update system
sudo apt-get update

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker ubuntu

# Install Docker Compose
sudo apt-get install -y docker-compose-plugin

# Logout and login to apply group changes
exit
# SSH back in
```

**Step 4: Deploy Application**

```bash
# Clone repository
git clone https://github.com/yourusername/bephue-restaurant.git
cd bephue-restaurant

# Setup environment
cp .env.example .env
nano .env  # Update all values

# Deploy
docker-compose build --no-cache
docker-compose up -d
```

**Step 5: Setup Domain & SSL (Optional)**

- Point your domain to EC2 Elastic IP
- Use Certbot for SSL (same as DigitalOcean)

**Cost:** ~$15-50/month depending on instance type

---

### Deployment Comparison

| Platform             | Ease of Use          | Cost/Month | Best For                    |
| -------------------- | -------------------- | ---------- | --------------------------- |
| **Railway**          | ⭐⭐⭐⭐⭐ Very Easy | $5-20      | Quick deployment, beginners |
| **Vercel + Railway** | ⭐⭐⭐⭐ Easy        | $5-15      | Best Next.js performance    |
| **DigitalOcean**     | ⭐⭐⭐ Moderate      | $12-24     | Full control, good value    |
| **AWS EC2**          | ⭐⭐ Advanced        | $15-50     | Enterprise, scalability     |

**Recommendation:**

- **For beginners:** Start with Railway (easiest)
- **For best performance:** Vercel (frontend) + Railway (backend)
- **For learning:** DigitalOcean (good balance)
- **For production/scale:** AWS EC2 or DigitalOcean with managed database

## 📞 Support

If you encounter issues:

1. Check logs: `docker-compose logs -f`
2. Verify environment variables in `.env`
3. Ensure ports are not in use
4. Check Docker daemon is running: `docker ps`

---

**Happy Deploying! 🐳**
