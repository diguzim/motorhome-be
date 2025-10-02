# Motorhome Backend API

A Strapi-based backend API for the Motorhome application, built with TypeScript and containerized with Docker.

## 🚀 Quick Start

### Prerequisites

- **Node.js 22.x** (recommended)
- **npm** (comes with Node.js)
- **Docker** and **Docker Compose** (for containerized development)

### Development Setup

1. **Clone and install dependencies:**

   ```bash
   git clone <repository-url>
   cd motorhome-be
   npm install
   ```

2. **Start development server:**

   ```bash
   npm run develop
   ```

   The API will be available at `http://localhost:1337`

3. **Using Docker for development:**
   ```bash
   docker compose up -d
   ```

## 📋 Available Scripts

| Command           | Description                               |
| ----------------- | ----------------------------------------- |
| `npm run develop` | Start development server with auto-reload |
| `npm run start`   | Start production server                   |
| `npm run build`   | Build the admin panel and API             |
| `npm run console` | Open Strapi console                       |

## 🏗️ Project Structure

```
motorhome-be/
├── .github/
│   ├── workflows/          # CI/CD pipelines
│   └── actions/            # Reusable GitHub Actions
├── config/                 # Strapi configuration
├── database/              # Database migrations
├── src/
│   ├── api/               # API endpoints and content types
│   ├── admin/             # Admin panel customizations
│   └── extensions/        # Strapi extensions
├── types/                 # TypeScript type definitions
├── docker-compose.yml     # Development environment
├── Dockerfile             # Development Docker image
└── Dockerfile.prod        # Production Docker image
```

## 🔄 CI/CD Pipeline

Our simplified CI/CD pipeline automatically handles different environments with optimized workflows:

### Workflow Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Feature/*     │    │     Develop     │    │      Main       │
│                 │    │                 │    │                 │
│ ✅ Quick Test   │    │ 🏗️ Dev Build    │    │ 🚀 Prod Build  │
│ (Basic checks)  │    │ (Full pipeline) │    │ (Full pipeline) │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └─────── PR ────────────┼───────── PR ─────────│
                                 │                       │
                          Development Env         Production Env
```

### Development Pipeline

**Triggers:** Push to `develop` branch, Pull Requests, Manual dispatch with 'development'

- ✅ **Quality Checks:** Security audit, TypeScript compilation
- 🏗️ **Development Build:** Uses regular Dockerfile for faster builds
- 🐳 **Docker Image:** Creates local development image

### Production Pipeline

**Triggers:** Push to `main` branch, Manual dispatch with 'production'

- ✅ **Comprehensive Quality Checks:** Stricter security audit, TypeScript validation
- 🏗️ **Production Build:** Uses `Dockerfile.prod` with multi-stage build
- 🐳 **Docker Registry:** Pushes optimized images to container registry
- 🚀 **Auto-deployment:** Deploys to production server (when pushing to main)

### Workflow Files

| File          | Purpose                 | Triggers                          |
| ------------- | ----------------------- | --------------------------------- |
| `main.yml`    | Main CI/CD pipeline     | Push to main/develop, PRs, Manual |
| `test.yml`    | Quick feature tests     | Push to feature/\* branches       |
| `build.yml`   | Reusable build workflow | Called by other workflows         |
| `quality.yml` | Reusable quality checks | Called by other workflows         |

### Manual Deployment

You can manually trigger deployments from the GitHub Actions tab:

1. Go to **Actions** → **CI/CD Pipeline**
2. Click **Run workflow**
3. Select environment (`development` or `production`)
4. Click **Run workflow**

## 🐳 Docker Setup

### Development

```bash
# Start all services
docker compose up -d

# View logs
docker compose logs -f

# Stop services
docker compose down
```

### Production Build

```bash
# Build production image
docker build -f Dockerfile.prod -t motorhome-be:prod .

# Run production container
docker run -p 1337:1337 -e NODE_ENV=production motorhome-be:prod
```

## ⚙️ Environment Configuration

### Required GitHub Secrets

For the CI/CD pipeline to work properly, configure these secrets in your GitHub repository:

#### Container Registry

- `CONTAINER_REGISTRY_URL` - Docker registry URL (e.g., `ghcr.io`)
- `CONTAINER_REGISTRY_USERNAME` - Registry username
- `CONTAINER_REGISTRY_PASSWORD` - Registry password/token

#### Production Deployment (Optional)

- `PRODUCTION_SERVER_USER` - SSH username for production server
- `PRODUCTION_SERVER_HOST` - Production server hostname/IP

#### Notifications (Optional)

- `SLACK_WEBHOOK_URL` - For deployment notifications

### Application Environment Variables

Create appropriate `.env` files for your environments:

```bash
# .env.development
NODE_ENV=development
DATABASE_URL=postgresql://user:pass@localhost:5432/motorhome_dev
STRAPI_ADMIN_JWT_SECRET=your-jwt-secret

# .env.production
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@prod-db:5432/motorhome_prod
STRAPI_ADMIN_JWT_SECRET=your-production-jwt-secret
```

## 🔧 Development Workflow

### Git Flow

- **develop** - Development branch, automatically deploys to development environment
- **main** - Production branch, automatically deploys to production
- **feature/** - Feature branches, create PRs to develop

### Making Changes

1. Create feature branch from `develop`
2. Make your changes
3. Create Pull Request to `develop`
4. Once approved and merged, changes go to development environment
5. When ready for production, create PR from `develop` to `main`

## 🧪 Testing

```bash
# Run type checking
npx tsc --noEmit

# Security audit
npm audit --audit-level=high

# Check for outdated packages
npm outdated
```

## 📦 Building for Production

The production build uses a multi-stage Docker build for optimal image size and security:

1. **Build Stage:** Installs dependencies and builds the application
2. **Runtime Stage:** Creates minimal runtime image with only production files

Key optimizations:

- Uses Node.js Alpine images for smaller size
- Multi-platform support (AMD64, ARM64)
- Layer caching for faster subsequent builds
- Non-root user for security

## 🚀 Deployment

### Development

- Automatically deploys on push to `develop`
- Uses development Docker image
- Includes development tools and hot reload

### Production

- Automatically deploys on push to `main`
- Uses optimized production Docker image
- Includes health checks and monitoring

## 📊 Monitoring and Logs

```bash
# View application logs
docker compose logs -f api

# Monitor resource usage
docker stats

# Health check
curl http://localhost:1337/_health
```

## 🆘 Troubleshooting

### Common Issues

**Port already in use:**

```bash
# Find process using port 1337
lsof -i :1337
# Kill the process
kill -9 <PID>
```

**Docker build fails:**

```bash
# Clear Docker cache
docker system prune -a
# Rebuild without cache
docker build --no-cache -f Dockerfile.prod .
```

**TypeScript errors:**

```bash
# Check compilation
npx tsc --noEmit
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json && npm install
```

## 📚 Additional Resources

- [Strapi Documentation](https://docs.strapi.io)
- [Docker Documentation](https://docs.docker.com)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.
