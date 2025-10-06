# 🚀 Render Deployment Guide

This guide will help you deploy your database tutorial project to Render with Render's PostgreSQL database.

## 📋 Prerequisites

1. **GitHub Repository**: Your code should be pushed to GitHub
2. **Render Account**: Sign up at [render.com](https://render.com)

## 🗄️ Step 1: Deploy with Render PostgreSQL

### 1.1 Connect Repository

1. Go to [render.com](https://render.com)
2. Sign up/Login with GitHub
3. Click "New +" → "Blueprint"
4. Connect your GitHub repository

### 1.2 Deploy from Blueprint

The `render.yaml` file in your repository will automatically:
- Create a PostgreSQL database service
- Create a web service for your Next.js app
- Connect them together with the `DATABASE_URL` environment variable

### 1.3 Manual Setup (Alternative)

If you prefer to set up manually:

1. **Create PostgreSQL Database**:
   - Click "New +" → "PostgreSQL"
   - Name: `database-tutorial-db`
   - Plan: Free
   - Click "Create Database"

2. **Create Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Name: `database-tutorial`
   - Environment: Node
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Add Environment Variable:
     - Key: `DATABASE_URL`
     - Value: Copy from your PostgreSQL service's "Connection" tab

## 🌐 Step 2: Set Up Database Schema

After your services are deployed, you need to set up the database schema:

### 2.1 Connect to Database

1. Go to your PostgreSQL service in Render dashboard
2. Click on "Connection" tab
3. Copy the connection string

### 2.2 Set Up Schema Locally

```bash
# Set your database URL (use the connection string from Render)
export DATABASE_URL="postgresql://username:password@hostname:port/database"

# Push the schema to your database
npx prisma db push

# Generate Prisma client
npx prisma generate
```

### 2.3 Alternative: Use Render Shell

1. Go to your web service in Render dashboard
2. Click "Shell" tab
3. Run these commands:
   ```bash
   npx prisma db push
   npx prisma generate
   ```

### 2.4 Deploy

1. Your services will be automatically deployed
2. Wait for the build to complete (5-10 minutes)
3. Your app will be available at: `https://your-app-name.onrender.com`

## 🔧 Step 3: Verify Deployment

### 3.1 Test API Endpoints

Visit these URLs to test your API:

- **Tasks**: `https://your-app-name.onrender.com/api/tasks`
- **Categories**: `https://your-app-name.onrender.com/api/categories`
- **Users**: `https://your-app-name.onrender.com/api/users`

### 3.2 Test Frontend

- Visit: `https://your-app-name.onrender.com`
- Try creating a task
- Check if it appears in your Supabase dashboard

## 🛠️ Troubleshooting

### Common Issues

#### Build Failures
```bash
# Test build locally first
npm run build

# Check for missing dependencies
npm install
```

#### Database Connection Issues
- Verify your `DATABASE_URL` is correct
- Check that your Render PostgreSQL service is running
- Ensure the database connection string is properly formatted

#### 500 Errors
- Check Render logs in the dashboard
- Verify all environment variables are set
- Make sure Prisma client is generated

### Debugging

1. **Check Render Logs**:
   - Go to your service dashboard
   - Click "Logs" tab
   - Look for error messages

2. **Test Database Connection**:
   ```bash
   npx prisma db push
   ```

3. **Verify Environment Variables**:
   - Check Render dashboard → Environment tab
   - Ensure all variables are set correctly

## 🎉 Success!

Your application should now be live at:
- **Frontend**: `https://your-app-name.onrender.com`
- **API**: `https://your-app-name.onrender.com/api/*`
- **Database**: Supabase dashboard

## 📝 Next Steps

1. **Custom Domain**: Add a custom domain in Render settings
2. **SSL**: Render provides free SSL certificates
3. **Monitoring**: Set up monitoring and alerts
4. **Scaling**: Upgrade to paid plan for better performance

## 🔗 Useful Links

- [Render Documentation](https://render.com/docs)
- [Render PostgreSQL Documentation](https://render.com/docs/databases)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
