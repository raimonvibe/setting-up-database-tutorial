import { CodeBlock } from '@/components/CodeBlock'
import { CheckCircle, Terminal, Database, FileText } from 'lucide-react'

export default function SetupPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="prose max-w-none">
        <h1>Environment Setup</h1>
        <p>
          In this section, we&apos;ll set up everything you need to start working with databases in Next.js. 
          We&apos;ll use Prisma as our ORM (Object-Relational Mapping) tool and SQLite as our database for simplicity.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
          <h3 className="text-blue-900 dark:text-blue-200 mb-2">Why These Technologies?</h3>
          <ul className="text-blue-900 dark:text-blue-300 space-y-1">
            <li><strong>Prisma:</strong> Type-safe database client with excellent TypeScript support</li>
            <li><strong>SQLite:</strong> Lightweight, file-based database perfect for development and small applications</li>
            <li><strong>Next.js:</strong> Full-stack React framework with built-in API routes</li>
          </ul>
        </div>

        <h2>Prerequisites</h2>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <Terminal className="h-6 w-6 text-green-600 mb-2" />
            <h4 className="font-semibold mb-1">Node.js 18+</h4>
            <p className="text-sm text-blue-900 dark:text-gray-300">JavaScript runtime environment</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <FileText className="h-6 w-6 text-blue-600 mb-2" />
            <h4 className="font-semibold mb-1">Code Editor</h4>
            <p className="text-sm text-blue-900 dark:text-gray-300">VS Code recommended</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <Database className="h-6 w-6 text-purple-600 mb-2" />
            <h4 className="font-semibold mb-1">Basic SQL</h4>
            <p className="text-sm text-blue-900 dark:text-gray-300">Understanding of database concepts</p>
          </div>
        </div>

        <h2>Step 1: Create a New Next.js Project</h2>
        <p>First, let&apos;s create a new Next.js project with TypeScript and Tailwind CSS:</p>
        
        <CodeBlock
          code={`npx create-next-app@latest my-database-app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd my-database-app`}
          language="bash"
        />

        <h2>Step 2: Install Prisma</h2>
        <p>Install Prisma CLI and the Prisma Client:</p>
        
        <CodeBlock
          code={`npm install prisma @prisma/client
npm install -D prisma`}
          language="bash"
        />

        <h2>Step 3: Initialize Prisma</h2>
        <p>Initialize Prisma in your project with SQLite as the database provider:</p>
        
        <CodeBlock
          code={`npx prisma init --datasource-provider sqlite`}
          language="bash"
        />

        <p>This command creates:</p>
        <ul>
          <li><code>prisma/schema.prisma</code> - Your database schema file</li>
          <li><code>.env</code> - Environment variables file</li>
        </ul>

        <h2>Step 4: Configure Environment Variables</h2>
        <p>Your <code>.env</code> file should contain:</p>
        
        <CodeBlock
          code={`# Database
DATABASE_URL="file:./dev.db"`}
          filename=".env"
        />

        <h2>Step 5: Set Up Prisma Client</h2>
        <p>Create a database utility file to manage your Prisma client connection:</p>
        
        <CodeBlock
          code={`import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma`}
          filename="src/lib/db.ts"
        />

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-8">
          <h3 className="text-yellow-800 dark:text-yellow-200 mb-2">Why This Pattern?</h3>
          <p className="text-blue-900 dark:text-yellow-300">
            This pattern prevents multiple Prisma Client instances in development due to Next.js hot reloading. 
            In production, a new instance is created normally.
          </p>
        </div>

        <h2>Step 6: Install Additional Dependencies</h2>
        <p>For this tutorial, we&apos;ll also use Lucide React for icons:</p>
        
        <CodeBlock
          code={`npm install lucide-react`}
          language="bash"
        />

        <h2>Step 7: Generate Prisma Client</h2>
        <p>Generate the Prisma client to use in your application:</p>
        
        <CodeBlock
          code={`npx prisma generate`}
          language="bash"
        />

        <h2>Step 8: Create Database</h2>
        <p>Create and sync your database with the schema:</p>
        
        <CodeBlock
          code={`npx prisma db push`}
          language="bash"
        />

        <h2>Step 9: Seed Database (Optional)</h2>
        <p>Add some sample data to get started quickly:</p>
        
        <CodeBlock
          code={`npx tsx prisma/seed.ts`}
          language="bash"
        />

        <h2>Verification</h2>
        <p>Let&apos;s verify everything is set up correctly. Your project structure should look like this:</p>
        
        <CodeBlock
          code={`my-database-app/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── lib/
│       └── db.ts
├── .env
├── package.json
└── ...other files`}
          language="text"
        />

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-2">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="text-blue-900 dark:text-green-200">Setup Complete!</h3>
          </div>
          <p className="text-blue-900 dark:text-green-300">
            You now have a Next.js project with Prisma configured and ready to use. 
            In the next section, we&apos;ll design our database schema.
          </p>
        </div>

        <div className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700">
          <div></div>
          <a 
            href="/schema" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Next: Database Schema →
          </a>
        </div>
      </div>
    </div>
  )
}
