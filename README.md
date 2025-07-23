This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Vercel Configuration

This project includes a `vercel.json` configuration file that ensures optimal build settings:

- **Framework**: Next.js (for automatic optimizations)
- **Build Command**: `npm run build` (standard Next.js build)
- **Install Command**: `npm install` (dependency installation)
- **Output Directory**: `.next` (Next.js build output)

### Deployment Settings

When deploying to Vercel, ensure these settings in your project dashboard:

1. **Framework Preset**: Next.js (recommended over "Other")
2. **Build Command**: `npm run build` (not `npm install && npm run build`)
3. **Install Command**: `npm install` (separate from build command)
4. **Output Directory**: `.next` (automatically set with Next.js preset)

The `vercel.json` file in this repository will automatically configure these settings for optimal performance.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
