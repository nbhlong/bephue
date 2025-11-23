# 🐳 Docker Deployment Guide - BepHue Restaurant

Complete guide for deploying BepHue Restaurant website using Docker.

---

## ⚡ Quick Reference

**First Time Setup:**

```bash
cp .env.example .env          # Copy environment file
# Edit .env with your secrets
docker-compose up -d --build  # Build and start
```

**Daily Operations:**

```bash
docker-compose up -d          # Start all services
docker-compose down           # Stop all services
docker-compose logs -f        # View logs
docker-compose restart backend # Restart a service
```

**Access Points:**

- Frontend: http://localhost:3000
- Backend Admin: http://localhost:1337/admin
- With Nginx: http://localhost

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

### 1. Project Structure

Ensure your project has this structure:

```
bephue-restaurant/
├── docker-compose.yml
├── .env
├── frontend/
│   ├── Dockerfile
│   ├── .dockerignore
│   └── ... (Next.js files)
├── backend/
│   ├── Dockerfile
│   ├── .dockerignore
│   └── ... (Strapi files)
└── nginx/
    └── nginx.conf
```

### 2. Setup Environment Variables

```bash
# Copy the example file
cp .env.example .env
```

**Generate Secure Secrets:**

```bash
# Linux/macOS:
openssl rand -base64 32

# Windows PowerShell:
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Edit .env file:**

```bash
# Linux/macOS:
nano .env

# Windows:
notepad .env
```

**Important:** Replace all `change-this-*` values in `.env`:

- `DATABASE_PASSWORD` - Strong database password
- `JWT_SECRET` - Random secret for JWT
- `ADMIN_JWT_SECRET` - Random secret for admin
- `APP_KEYS` - Random app keys (comma-separated)
- `API_TOKEN_SALT` - Random salt
- `TRANSFER_TOKEN_SALT` - Random salt
- `ENCRYPTION_KEY` - Random encryption key

### 3. Build and Run

**Development Mode:**

```bash
# Build images
docker-compose build

# Start all services
docker-compose up

# Or run in background
docker-compose up -d
```

**Production Mode:**

```bash
# Set production environment
export NODE_ENV=production

# Build with production optimizations
docker-compose build --no-cache

# Start services
docker-compose up -d
```

### 4. Access Your Application

- **Frontend:** http://localhost:3000
- **Backend Admin:** http://localhost:1337/admin
- **With Nginx:** http://localhost (port 80)

### 5. Create Strapi Admin Account

1. Visit http://localhost:1337/admin
2. Create your first admin account
3. Start adding content!

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
# Manually add inbound rules for ports 80, 443, 1337, 3000
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
curl http://localhost:1337/_health  # Backend
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

**Linux/macOS:**

```bash
# Find and kill process
lsof -ti:3000 | xargs kill -9
lsof -ti:1337 | xargs kill -9
```

**Windows PowerShell:**

```powershell
# Find process using port
netstat -ano | findstr :3000
netstat -ano | findstr :1337

# Kill process (replace <PID> with actual process ID)
taskkill /PID <PID> /F
```

**Alternative:** Change ports in `docker-compose.yml`

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

```bash
# Rebuild Strapi admin
docker-compose exec backend npm run build

# Clear browser cache
# Try incognito/private mode

# Check Strapi logs
docker-compose logs -f backend
```

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

## 🚀 Deployment Platforms

### AWS EC2

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Clone project
git clone your-repo
cd bephue-restaurant

# Setup and run
cp .env.example .env
nano .env  # Update values
docker-compose up -d
```

### DigitalOcean Droplet

```bash
# Use Docker Droplet (has Docker pre-installed)
# SSH into droplet
ssh root@your-ip

# Same steps as AWS EC2
```

### Google Cloud Run

```bash
# Build and push images
docker build -t gcr.io/PROJECT_ID/bephue-frontend ./frontend
docker build -t gcr.io/PROJECT_ID/bephue-backend ./backend

docker push gcr.io/PROJECT_ID/bephue-frontend
docker push gcr.io/PROJECT_ID/bephue-backend

# Deploy
gcloud run deploy bephue-frontend --image gcr.io/PROJECT_ID/bephue-frontend
gcloud run deploy bephue-backend --image gcr.io/PROJECT_ID/bephue-backend
```

## 📞 Support

If you encounter issues:

1. Check logs: `docker-compose logs -f`
2. Verify environment variables in `.env`
3. Ensure ports are not in use
4. Check Docker daemon is running: `docker ps`

---

**Happy Deploying! 🐳**
