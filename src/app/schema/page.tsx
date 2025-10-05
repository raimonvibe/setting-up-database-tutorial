import { CodeBlock } from '@/components/CodeBlock'
import { Users, Tag, CheckSquare } from 'lucide-react'

export default function SchemaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="prose max-w-none">
        <h1>Database Schema Design</h1>
        <p>
          The database schema is the blueprint of your database. It defines the structure of your data, 
          including tables, columns, relationships, and constraints. In this section, we&apos;ll design a 
          comprehensive schema for a task management application.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
          <h3 className="text-blue-900 dark:text-blue-200 mb-2">What is Prisma Schema?</h3>
          <p className="text-blue-900 dark:text-blue-300">
            Prisma schema is a declarative way to define your database structure. It&apos;s written in a 
            special syntax that Prisma uses to generate the database client and manage migrations.
          </p>
        </div>

        <h2>Our Task Management Schema</h2>
        <p>Let&apos;s build a complete schema for a task management application with three main entities:</p>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <Users className="h-6 w-6 text-blue-600 mb-2" />
            <h4 className="font-semibold mb-1">User</h4>
            <p className="text-sm text-blue-900 dark:text-gray-300">People who create and manage tasks</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <Tag className="h-6 w-6 text-green-600 mb-2" />
            <h4 className="font-semibold mb-1">Category</h4>
            <p className="text-sm text-blue-900 dark:text-gray-300">Groups to organize tasks</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <CheckSquare className="h-6 w-6 text-purple-600 mb-2" />
            <h4 className="font-semibold mb-1">Task</h4>
            <p className="text-sm text-blue-900 dark:text-gray-300">Individual items to be completed</p>
          </div>
        </div>

        <h3>Complete Schema Definition</h3>
        <CodeBlock
          code={`generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
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
}`}
          filename="prisma/schema.prisma"
        />

        <h2>Understanding the Schema Components</h2>

        <h3>Field Types</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Type</th>
                <th className="px-4 py-2 text-left font-semibold">Description</th>
                <th className="px-4 py-2 text-left font-semibold">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              <tr>
                <td className="px-4 py-2 font-mono text-sm">String</td>
                <td className="px-4 py-2">Text data</td>
                <td className="px-4 py-2 font-mono text-sm">title String</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-sm">Boolean</td>
                <td className="px-4 py-2">True/false values</td>
                <td className="px-4 py-2 font-mono text-sm">completed Boolean</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-sm">DateTime</td>
                <td className="px-4 py-2">Date and time</td>
                <td className="px-4 py-2 font-mono text-sm">createdAt DateTime</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-sm">Enum</td>
                <td className="px-4 py-2">Predefined values</td>
                <td className="px-4 py-2 font-mono text-sm">priority Priority</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Field Attributes</h3>
        <ul>
          <li><code>@id</code> - Marks the field as the primary key</li>
          <li><code>@unique</code> - Ensures the field value is unique across all records</li>
          <li><code>@default()</code> - Sets a default value for the field</li>
          <li><code>@updatedAt</code> - Automatically updates the field when the record is modified</li>
          <li><code>?</code> - Makes the field optional (nullable)</li>
        </ul>

        <h3>Relationships Explained</h3>
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold mb-2">One-to-Many: User → Tasks</h4>
            <p className="text-blue-900 dark:text-gray-300 mb-3">
              One user can have many tasks, but each task belongs to only one user.
            </p>
            <CodeBlock
              code={`// In User model
tasks Task[]

userId String
user   User @relation(fields: [userId], references: [id], onDelete: Cascade)`}
            />
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold mb-2">Optional One-to-Many: Category → Tasks</h4>
            <p className="text-blue-900 dark:text-gray-300 mb-3">
              Tasks can optionally belong to a category. If a category is deleted, tasks become uncategorized.
            </p>
            <CodeBlock
              code={`// In Category model
tasks Task[]

categoryId String?
category   Category? @relation(fields: [categoryId], references: [id], onDelete: SetNull)`}
            />
          </div>
        </div>

        <h3>Delete Behaviors</h3>
        <ul>
          <li><code>Cascade</code> - When a user is deleted, all their tasks are also deleted</li>
          <li><code>SetNull</code> - When a category is deleted, tasks&apos; categoryId becomes null</li>
        </ul>

        <h2>Generating the Database</h2>
        <p>After defining your schema, you need to generate the Prisma client and create the database:</p>

        <CodeBlock
          code={`# Generate Prisma client
npx prisma generate

# Create and apply the database schema
npx prisma db push

# (Optional) Open Prisma Studio to view your database
npx prisma studio`}
          language="bash"
        />

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-8">
          <h3 className="text-blue-900 dark:text-green-200 mb-2">Pro Tips</h3>
          <ul className="text-blue-900 dark:text-green-300 space-y-1">
            <li>Use <code>@@map()</code> to customize table names in the database</li>
            <li>Always include <code>createdAt</code> and <code>updatedAt</code> for audit trails</li>
            <li>Use enums for fields with predefined values</li>
            <li>Consider the delete behavior carefully for your relationships</li>
          </ul>
        </div>

        <div className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700">
          <a 
            href="/setup" 
            className="text-blue-900 hover:text-blue-800 dark:text-gray-400 dark:hover:text-gray-200 font-medium"
          >
            ← Previous: Setup
          </a>
          <a 
            href="/crud" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Next: CRUD Operations →
          </a>
        </div>
      </div>
    </div>
  )
}
