# 🚀 Deploy Guide: Vercel + Render

> **Complete step-by-step guide to deploy your database tutorial project with visual instructions and emojis**

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [🗄️ Step 1: Database Setup (Supabase)](#-step-1-database-setup-supabase)
- [🌐 Step 2: Frontend Deployment (Vercel)](#-step-2-frontend-deployment-vercel)
- [⚙️ Step 3: Backend Deployment (Render)](#-step-3-backend-deployment-render)
- [🔗 Step 4: Connect Everything](#-step-4-connect-everything)
- [🛠️ Troubleshooting](#️-troubleshooting)
- [🎉 Success!](#-success)

## 🎯 Overview

This guide will help you deploy your database tutorial project with a clear separation:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Vercel)      │◄──►│   (Render)      │◄──►│   (Supabase)    │
│   Next.js App   │    │   API Routes    │    │   PostgreSQL    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 🎨 What You'll Deploy

- 🗄️ **Database**: Supabase (Free PostgreSQL)
- 🌐 **Frontend**: Vercel (Next.js App)
- ⚙️ **Backend**: Render (API Routes)

---

## 🗄️ Step 1: Database Setup (Supabase)

### 1.1 Create Supabase Account

1. **🔗 Go to Supabase**
   ```
   🌐 Visit: https://supabase.com
   ```

2. **📝 Sign Up**
   ```
   👆 Click "Start your project"
   🔑 Sign up with GitHub (recommended)
   ```

3. **✅ Verify Email**
   ```
   📧 Check your email
   ✅ Click verification link
   ```

### 1.2 Create New Project

1. **🆕 Create Project**
   ```
   👆 Click "New Project"
   🏢 Choose your organization
   ```

2. **📝 Fill Project Details**
   ```
   📛 Name: database-tutorial
   🔐 Password: [Generate strong password]
   🌍 Region: Choose closest to your users
   ```

3. **⏳ Wait for Setup**
   ```
   ⏱️  Project creation takes 1-2 minutes
   📊 You'll see a progress indicator
   ```

### 1.3 Get Database Connection String

1. **🔧 Go to Settings**
   ```
   👆 Click "Settings" in left sidebar
   👆 Click "Database"
   ```

2. **📋 Copy Connection String**
   ```
   📜 Scroll down to "Connection string"
   👆 Click "URI" tab
   📋 Copy the connection string
   ```

3. **💾 Save Your Credentials**
   ```
   🔗 Database URL: postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres
   🔐 Password: [your-database-password]
   ```

### 1.4 Update Prisma Schema

1. **📝 Edit `prisma/schema.prisma`**
   ```prisma
   generator client {
     provider = "prisma-client-js"
   }

   datasource db {
     provider = "postgresql"  // Changed from "sqlite"
     url      = env("DATABASE_URL")
   }

   // ... rest of your models stay the same
   ```

2. **🔄 Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

3. **📤 Push Schema to Database**
   ```bash
   npx prisma db push
   ```

4. **🌱 Seed Database (Optional)**
   ```bash
   npx tsx prisma/seed.ts
   ```

### 1.5 Verify Database Setup

1. **🔍 Check Supabase Dashboard**
   ```
   👆 Go to "Table Editor"
   👀 Verify your tables are created
   ```

2. **📊 Test with Prisma Studio**
   ```bash
   npx prisma studio
   ```

---

## 🌐 Step 2: Frontend Deployment (Vercel)

### 2.1 Prepare Your Code

1. **📤 Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **✅ Verify Your Code**
   ```
   📁 Make sure all files are committed
   🔍 Check that your project builds locally
   ```

### 2.2 Deploy to Vercel

#### Method 1: GitHub Integration (Recommended)

1. **🔗 Go to Vercel**
   ```
   🌐 Visit: https://vercel.com
   ```

2. **📝 Sign Up/Login**
   ```
   👆 Click "Sign Up" or "Login"
   🔑 Use GitHub account (recommended)
   ```

3. **🆕 Create New Project**
   ```
   👆 Click "New Project"
   📂 Import your GitHub repository
   ```

4. **⚙️ Configure Project**
   ```
   📛 Project Name: database-tutorial (or your choice)
   📁 Root Directory: ./
   🔧 Build Command: npm run build
   📤 Output Directory: .next
   ```

5. **🔧 Set Environment Variables**
   ```
   👆 Click "Environment Variables"
   ➕ Add new variable:
      Name: DATABASE_URL
      Value: postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres
   ```

6. **🚀 Deploy**
   ```
   👆 Click "Deploy"
   ⏳ Wait for build to complete
   🎉 Your site will be live at: https://your-project.vercel.app
   ```

#### Method 2: Vercel CLI

1. **📦 Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **🚀 Deploy**
   ```bash
   vercel
   ```

3. **📝 Follow Prompts**
   ```
   ❓ Set up and deploy? Y
   ❓ Which scope? (your account)
   ❓ Link to existing project? N
   ❓ Project name? (your choice)
   ❓ Directory? ./
   ```

4. **🔧 Set Environment Variables**
   ```bash
   vercel env add DATABASE_URL
   # Enter your Supabase connection string
   ```

5. **🔄 Redeploy**
   ```bash
   vercel --prod
   ```

### 2.3 Custom Domain (Optional)

1. **🛒 Purchase Domain**
   ```
   🏪 Use Vercel's domain service or external provider
   💰 Popular options: Namecheap, GoDaddy, Google Domains
   ```

2. **🔗 Add to Vercel**
   ```
   👆 Go to Project Settings → Domains
   ➕ Add your custom domain
   📋 Follow DNS configuration instructions
   ```

---

## ⚙️ Step 3: Backend Deployment (Render)

### 3.1 Prepare Backend Code

1. **📝 Create `render.yaml`**
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

2. **📤 Push to GitHub**
   ```bash
   git add .
   git commit -m "Add Render configuration"
   git push origin main
   ```

### 3.2 Deploy to Render

#### Method 1: GitHub Integration (Recommended)

1. **🔗 Go to Render**
   ```
   🌐 Visit: https://render.com
   ```

2. **📝 Sign Up/Login**
   ```
   👆 Click "Get Started"
   🔑 Use GitHub account (recommended)
   ```

3. **🆕 Create Web Service**
   ```
   👆 Click "New +"
   👆 Click "Web Service"
   ```

4. **🔗 Connect Repository**
   ```
   📂 Connect your GitHub repository
   👆 Select your repository
   ```

5. **⚙️ Configure Service**
   ```
   📛 Name: database-tutorial-backend
   🌍 Environment: Node
   📁 Root Directory: (leave empty)
   🔧 Build Command: npm install && npx prisma generate && npm run build
   🚀 Start Command: npm start
   ```

6. **🔧 Set Environment Variables**
   ```
   👆 Go to "Environment" tab
   ➕ Add variable:
      Key: DATABASE_URL
      Value: postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres
   ➕ Add variable:
      Key: NODE_ENV
      Value: production
   ```

7. **🚀 Deploy**
   ```
   👆 Click "Create Web Service"
   ⏳ Wait for build to complete
   🎉 Your backend will be live at: https://your-backend.onrender.com
   ```

#### Method 2: Manual Setup

1. **🔗 Connect Repository**
   ```
   👆 In Render dashboard
   👆 Click "New +" → "Web Service"
   📂 Connect your GitHub repository
   ```

2. **⚙️ Configure Service**
   ```
   📛 Name: database-tutorial-backend
   🌍 Environment: Node
   🌍 Region: Choose closest to your users
   📂 Branch: main
   📁 Root Directory: (leave empty)
   🔧 Build Command: npm install && npx prisma generate && npm run build
   🚀 Start Command: npm start
   ```

3. **🔧 Environment Variables**
   ```
   ➕ Add DATABASE_URL with your Supabase connection string
   ➕ Add NODE_ENV with value production
   ```

### 3.3 Custom Domain for Backend (Optional)

1. **🔗 Add Custom Domain**
   ```
   👆 Go to Settings → Custom Domains
   ➕ Add your domain (e.g., api.yourdomain.com)
   📋 Follow DNS configuration instructions
   ```

2. **🔒 SSL Certificate**
   ```
   ✅ Render automatically provides SSL certificates
   🌐 Your API will be available at: https://api.yourdomain.com
   ```

---

## 🔗 Step 4: Connect Everything

### 4.1 Update Frontend to Use Backend

1. **📝 Create API Configuration**
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

2. **🔧 Update Vercel Environment Variables**
   ```
   👆 Go to Vercel Project Settings → Environment Variables
   ➕ Add new variable:
      Name: NEXT_PUBLIC_API_URL
      Value: https://your-backend.onrender.com
   ```

3. **🔄 Redeploy Frontend**
   ```
   👆 In Vercel dashboard, click "Redeploy"
   ⏳ Wait for deployment to complete
   ```

### 4.2 Test the Connection

1. **🔍 Test Frontend**
   ```
   🌐 Visit your Vercel URL
   👆 Try creating a task
   👀 Check if it appears in your Supabase dashboard
   ```

2. **🔍 Test Backend**
   ```
   🌐 Visit: https://your-backend.onrender.com/api/tasks
   👀 You should see JSON data
   ```

3. **🔍 Test Database**
   ```
   🌐 Open Supabase dashboard
   👆 Go to Table Editor
   ✅ Verify data is being created/updated
   ```

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

## 🎉 Success!

### ✅ Verification Checklist

- [ ] 🗄️ **Database**: Supabase project created and accessible
- [ ] 🌐 **Frontend**: Vercel deployment loads without errors
- [ ] ⚙️ **Backend**: Render deployment responds to API calls
- [ ] 🔗 **Connection**: Frontend can create/read/update/delete data
- [ ] 📱 **Mobile**: Responsive design works
- [ ] 🔒 **Security**: No sensitive data exposed

### 🎯 Your Live URLs

```
🌐 Frontend: https://your-project.vercel.app
⚙️ Backend: https://your-backend.onrender.com
🗄️ Database: https://supabase.com/dashboard/project/[your-project]
```

### 🎊 Congratulations!

You've successfully deployed your database tutorial project! 🎉

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
