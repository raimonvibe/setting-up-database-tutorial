# 🚀 Publishing Guide: Frontend + Backend Deployment

> **Complete guide to deploy your database tutorial project with clear separation of frontend and backend**

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [🗄️ Step 1: Database Setup](#-step-1-database-setup)
- [🌐 Step 2: Frontend Deployment (Vercel)](#-step-2-frontend-deployment-vercel)
- [⚙️ Step 3: Backend Deployment (Render)](#-step-3-backend-deployment-render)
- [🔧 Step 4: Connect Frontend to Backend](#-step-4-connect-frontend-to-backend)
- [🛠️ Troubleshooting](#️-troubleshooting)
- [🎉 Post-Deployment](#-post-deployment)

## 🎯 Overview

This guide will help you deploy your database tutorial project with a clear separation:

- 🗄️ **Database**: Free cloud database service
- 🌐 **Frontend**: Vercel (Next.js app)
- ⚙️ **Backend**: Render (API routes and database operations)

### 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Vercel)      │◄──►│   (Render)      │◄──►│   (Cloud DB)    │
│   Next.js App   │    │   API Routes    │    │   PostgreSQL    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🗄️ Step 1: Database Setup

First, we'll set up a free cloud database. We'll use **Supabase** as it's reliable and has a generous free tier.

### 🥇 Option 1: Supabase (Recommended)

**Why Supabase?**
- ✅ Free tier with 500MB database
- ✅ PostgreSQL (industry standard)
- ✅ Built-in dashboard
- ✅ Automatic backups
- ✅ Real-time capabilities

#### 1.1 Create Supabase Project

1. **🔗 Visit Supabase**
   - Go to [supabase.com](https://supabase.com)
   - Click "Start your project"
   - Sign up with GitHub (recommended)

2. **🆕 Create New Project**
   - Click "New Project"
   - Choose your organization
   - Enter project details:
     ```
     Name: database-tutorial
     Database Password: [generate strong password]
     Region: Choose closest to your users
     ```

3. **⏳ Wait for Setup**
   - Project creation takes 1-2 minutes
   - You'll see a progress indicator

#### 1.2 Get Database Connection String

1. **🔧 Go to Settings**
   - In your Supabase dashboard
   - Click "Settings" → "Database"

2. **📋 Copy Connection String**
   - Scroll down to "Connection string"
   - Copy the "URI" connection string
   - It looks like: `postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres`

3. **🔒 Save Your Credentials**
   ```
   Database URL: postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres
   Password: [your-database-password]
   ```

#### 1.3 Update Prisma Schema

Update your `prisma/schema.prisma` file:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  tasks     Task[]
  
  @@map("users")
}

model Category {
  id          String   @id @default(cuid())
  name        String   @unique
  description String?
  color       String   @default("#3B82F6")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  tasks       Task[]
  
  @@map("categories")
}

model Task {
  id          String    @id @default(cuid())
  title       String
  description String?
  completed   Boolean   @default(false)
  priority    Priority  @default(MEDIUM)
  dueDate     DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  userId      String
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  categoryId  String?
  category    Category? @relation(fields: [categoryId], references: [id], onDelete: SetNull)
  
  @@map("tasks")
}

enum Priority {
  LOW
  MEDIUM
  HIGH
  URGENT
}
```

#### 1.4 Test Database Connection

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed with sample data
npx tsx prisma/seed.ts

# Open Prisma Studio to verify
npx prisma studio
```

---

## 🌐 Step 2: Frontend Deployment (Vercel)

Now we'll deploy the frontend (Next.js app) to Vercel.

### 2.1 Prepare Frontend for Production

#### Update Environment Variables

Create a `.env.local` file for local development:

```env
# Local development database (optional)
DATABASE_URL="file:./prisma/dev.db"

# Production database (will be set in Vercel)
# DATABASE_URL="postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres"
```

#### Update API Routes for Production

Your API routes are already configured correctly. They will work with both local SQLite and production PostgreSQL.

### 2.2 Deploy to Vercel

#### Method 1: GitHub Integration (Recommended)

1. **📤 Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for production deployment"
   git push origin main
   ```

2. **🔗 Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **⚙️ Configure Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add your production database URL:
     ```
     DATABASE_URL = postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres
     ```

4. **🚀 Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your frontend will be available at `https://your-project.vercel.app`

#### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add DATABASE_URL

# Redeploy with environment variables
vercel --prod
```

### 2.3 Custom Domain (Optional)

1. **🛒 Purchase Domain**
   - Use Vercel's domain service or external provider

2. **🔗 Add to Vercel**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

---

## ⚙️ Step 3: Backend Deployment (Render)

Now we'll deploy the backend (API routes) to Render as a separate service.

### 3.1 Prepare Backend for Render

#### Create Backend-Only Package.json

Create a new `package.json` in your project root (or modify existing):

```json
{
  "name": "database-tutorial-backend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "build": "next build",
    "start": "next start",
    "dev": "next dev"
  },
  "dependencies": {
    "@prisma/client": "^6.12.0",
    "next": "15.4.3",
    "prisma": "^6.12.0",
    "react": "19.1.0",
    "react-dom": "19.1.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "typescript": "^5"
  }
}
```

#### Create Render Configuration

Create a `render.yaml` file in your project root:

```yaml
services:
  - type: web
    name: database-tutorial-backend
    env: node
    plan: free
    buildCommand: npm install && npx prisma generate && npm run build
    startCommand: npm start
    envVars:
      - key: DATABASE_URL
        sync: false
      - key: NODE_ENV
        value: production
```

### 3.2 Deploy to Render

#### Method 1: GitHub Integration (Recommended)

1. **📤 Push to GitHub**
   ```bash
   git add .
   git commit -m "Add Render configuration"
   git push origin main
   ```

2. **🔗 Connect to Render**
   - Visit [render.com](https://render.com)
   - Sign up with GitHub
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

3. **⚙️ Configure Build Settings**
   ```
   Name: database-tutorial-backend
   Environment: Node
   Build Command: npm install && npx prisma generate && npm run build
   Start Command: npm start
   ```

4. **🔧 Set Environment Variables**
   - Go to Environment tab
   - Add your database URL:
     ```
     DATABASE_URL = postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres
     NODE_ENV = production
     ```

5. **🚀 Deploy**
   - Click "Create Web Service"
   - Wait for build to complete
   - Your backend will be available at `https://your-backend.onrender.com`

#### Method 2: Manual Setup

1. **🔗 Connect Repository**
   - In Render dashboard
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **⚙️ Configure Service**
   ```
   Name: database-tutorial-backend
   Environment: Node
   Region: Choose closest to your users
   Branch: main
   Root Directory: (leave empty)
   Build Command: npm install && npx prisma generate && npm run build
   Start Command: npm start
   ```

3. **🔧 Environment Variables**
   - Add `DATABASE_URL` with your Supabase connection string
   - Add `NODE_ENV` with value `production`

### 3.3 Custom Domain for Backend (Optional)

1. **🔗 Add Custom Domain**
   - Go to Settings → Custom Domains
   - Add your domain (e.g., `api.yourdomain.com`)
   - Follow DNS configuration instructions

2. **🔒 SSL Certificate**
   - Render automatically provides SSL certificates
   - Your API will be available at `https://api.yourdomain.com`

---

## 🔧 Step 4: Connect Frontend to Backend

Now we need to connect your Vercel frontend to your Render backend.

### 4.1 Update Frontend API Calls

Update your frontend to call the Render backend instead of local API routes.

#### Create API Configuration

Create `src/lib/api.ts`:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export const api = {
  // Tasks
  getTasks: () => fetch(`${API_BASE_URL}/api/tasks`),
  createTask: (data: any) => fetch(`${API_BASE_URL}/api/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }),
  updateTask: (id: string, data: any) => fetch(`${API_BASE_URL}/api/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }),
  deleteTask: (id: string) => fetch(`${API_BASE_URL}/api/tasks/${id}`, {
    method: 'DELETE'
  }),

  // Categories
  getCategories: () => fetch(`${API_BASE_URL}/api/categories`),
  createCategory: (data: any) => fetch(`${API_BASE_URL}/api/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }),
  deleteCategory: (id: string) => fetch(`${API_BASE_URL}/api/categories/${id}`, {
    method: 'DELETE'
  }),

  // Users
  getUsers: () => fetch(`${API_BASE_URL}/api/users`),
  createUser: (data: any) => fetch(`${API_BASE_URL}/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
}
```

### 4.2 Update Environment Variables

#### Frontend (Vercel)
Add to your Vercel environment variables:
```
NEXT_PUBLIC_API_URL = https://your-backend.onrender.com
```

#### Backend (Render)
Ensure your Render environment variables include:
```
DATABASE_URL = postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres
NODE_ENV = production
```

### 4.3 Test the Connection

1. **🔍 Test Frontend**
   - Visit your Vercel URL
   - Try creating a task
   - Check if it appears in your Supabase dashboard

2. **🔍 Test Backend**
   - Visit `https://your-backend.onrender.com/api/tasks`
   - You should see JSON data

3. **🔍 Test Database**
   - Open Supabase dashboard
   - Go to Table Editor
   - Verify data is being created/updated

---

## 🛠️ Troubleshooting

### 🚨 Common Issues

#### Issue 1: Database Connection Failed

**Symptoms**: 500 errors, "Database connection failed"

**Solutions**:
```bash
# Check environment variables
# Vercel: Project Settings → Environment Variables
# Render: Environment tab

# Test database connection locally
npx prisma db push

# Verify connection string format
# Should be: postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres
```

#### Issue 2: Frontend Can't Reach Backend

**Symptoms**: Network errors, CORS issues

**Solutions**:
```bash
# Check NEXT_PUBLIC_API_URL in Vercel
# Should be: https://your-backend.onrender.com

# Verify backend is running
# Visit: https://your-backend.onrender.com/api/tasks

# Check CORS settings in backend
# Add CORS headers if needed
```

#### Issue 3: Build Failures

**Symptoms**: Build errors, deployment fails

**Solutions**:
```bash
# Check build locally
npm run build

# Update dependencies
npm update

# Clear Next.js cache
rm -rf .next
npm run build
```

### 🔍 Debugging Tools

#### Vercel Debugging
```bash
# View deployment logs
vercel logs

# Check function logs
vercel logs --follow
```

#### Render Debugging
```bash
# View build logs in Render dashboard
# Check Environment tab for variables
# Use Render's built-in logging
```

#### Database Debugging
```bash
# Check database connection
npx prisma db push

# View database in browser
npx prisma studio

# Check Supabase dashboard
# Go to Table Editor to see data
```

---

## 🎉 Post-Deployment

### ✅ Verification Checklist

- [ ] 🗄️ **Database**: Supabase project created and accessible
- [ ] 🌐 **Frontend**: Vercel deployment loads without errors
- [ ] ⚙️ **Backend**: Render deployment responds to API calls
- [ ] 🔗 **Connection**: Frontend can create/read/update/delete data
- [ ] 📱 **Mobile**: Responsive design works
- [ ] 🔒 **Security**: No sensitive data exposed

### 🎯 Performance Optimization

#### 1. Database Optimization
```sql
-- Add indexes for better performance
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_category_id ON tasks(category_id);
CREATE INDEX idx_tasks_completed ON tasks(completed);
```

#### 2. API Optimization
```typescript
// Add caching headers to API routes
export async function GET() {
  const data = await fetchData()
  
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
    }
  })
}
```

#### 3. Frontend Optimization
```typescript
// Use React Query for better data fetching
import { useQuery } from '@tanstack/react-query'

const { data: tasks } = useQuery({
  queryKey: ['tasks'],
  queryFn: () => api.getTasks().then(res => res.json())
})
```

### 📈 Monitoring

#### Supabase Monitoring
- **Dashboard**: Monitor database usage and performance
- **Logs**: Check for errors and slow queries
- **Metrics**: Track API calls and data usage

#### Vercel Monitoring
- **Analytics**: Track page views and performance
- **Functions**: Monitor API route performance
- **Logs**: Check for errors and issues

#### Render Monitoring
- **Logs**: Monitor backend performance
- **Metrics**: Track response times and errors
- **Uptime**: Ensure service availability

### 🎊 Congratulations!

You've successfully deployed your database tutorial project with a complete separation of concerns! 🎉

**Your Architecture:**
- 🗄️ **Database**: Supabase (PostgreSQL)
- 🌐 **Frontend**: Vercel (Next.js)
- ⚙️ **Backend**: Render (API routes)

**Next Steps:**
- 🔄 Regular updates and security patches
- 📈 Monitor performance and errors
- 🚀 Consider scaling options as you grow
- 🔒 Implement authentication if needed

---

<div align="center">

**🎯 Need Help?**

[📖 Documentation](https://github.com/raimonvibe/setting-up-database-tutorial) • [🐛 Report Issues](https://github.com/raimonvibe/setting-up-database-tutorial/issues) • [💬 Discussions](https://github.com/raimonvibe/setting-up-database-tutorial/discussions)

**⭐ Star the repository if this guide helped you!**

Made with ❤️ by [raimonvibe](https://github.com/raimonvibe)

</div>