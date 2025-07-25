import { CodeBlock } from '@/components/CodeBlock'
import { Users, ArrowRight, Link, Database, CheckCircle } from 'lucide-react'

export default function RelationshipsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="prose max-w-none">
        <h1>Database Relationships</h1>
        <p>
          Database relationships define how different tables (models) connect to each other. 
          They&apos;re essential for organizing data efficiently and maintaining data integrity. 
          In this section, we&apos;ll explore the relationships in our task management schema 
          and learn how to work with them using Prisma.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
          <h3 className="text-blue-800 dark:text-blue-200 mb-2">Why Relationships Matter</h3>
          <ul className="text-blue-700 dark:text-blue-300 space-y-1">
            <li><strong>Data Integrity:</strong> Ensure data consistency across tables</li>
            <li><strong>Efficiency:</strong> Avoid data duplication and reduce storage</li>
            <li><strong>Flexibility:</strong> Query related data easily and efficiently</li>
            <li><strong>Maintainability:</strong> Update data in one place, reflect everywhere</li>
          </ul>
        </div>

        <h2>Our Schema Relationships</h2>
        <p>Let&apos;s examine the relationships in our task management application:</p>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex items-center justify-center space-x-8 mb-6">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg mb-2">
                <Users className="h-8 w-8 text-blue-600 mx-auto" />
              </div>
              <h4 className="font-semibold">User</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">One user</p>
            </div>
            <ArrowRight className="h-6 w-6 text-gray-400" />
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg mb-2">
                <Database className="h-8 w-8 text-green-600 mx-auto" />
              </div>
              <h4 className="font-semibold">Tasks</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Many tasks</p>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-8">
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg mb-2">
                <Link className="h-8 w-8 text-purple-600 mx-auto" />
              </div>
              <h4 className="font-semibold">Category</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">One category</p>
            </div>
            <ArrowRight className="h-6 w-6 text-gray-400" />
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg mb-2">
                <Database className="h-8 w-8 text-green-600 mx-auto" />
              </div>
              <h4 className="font-semibold">Tasks</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Many tasks</p>
            </div>
          </div>
        </div>

        <h2>Types of Relationships</h2>

        <h3>1. One-to-Many: User → Tasks</h3>
        <p>
          Each user can have many tasks, but each task belongs to exactly one user. 
          This is the most common type of relationship in databases.
        </p>

        <CodeBlock
          code={`model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  tasks     Task[]
  
  @@map("users")
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
}`}
          filename="prisma/schema.prisma"
        />

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
          <h4 className="font-semibold mb-2">Key Components Explained</h4>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li><code>tasks Task[]</code> - Array field on User model (virtual field)</li>
            <li><code>userId String</code> - Foreign key field storing the user&apos;s ID</li>
            <li><code>user User @relation(...)</code> - Relation field connecting to User</li>
            <li><code>fields: [userId]</code> - Local field used for the relationship</li>
            <li><code>references: [id]</code> - Field on the related model to connect to</li>
            <li><code>onDelete: Cascade</code> - Delete all tasks when user is deleted</li>
          </ul>
        </div>

        <h3>2. Optional One-to-Many: Category → Tasks</h3>
        <p>
          Tasks can optionally belong to a category. A category can have many tasks, 
          but tasks don&apos;t require a category.
        </p>

        <CodeBlock
          code={`model Category {
  id          String   @id @default(cuid())
  name        String   @unique
  description String?
  color       String   @default("#3B82F6")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  tasks       Task[]
  
  @@map("categories")
}

categoryId  String?     // Optional foreign key (nullable)
category    Category?   // Optional relation (nullable)
            @relation(fields: [categoryId], references: [id], onDelete: SetNull)`}
          filename="prisma/schema.prisma"
        />

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-8">
          <h3 className="text-yellow-800 dark:text-yellow-200 mb-2">Optional Relationships</h3>
          <p className="text-yellow-700 dark:text-yellow-300">
            The <code>?</code> symbol makes both the foreign key (<code>categoryId?</code>) and 
            the relation field (<code>category?</code>) optional. When a category is deleted, 
            <code>onDelete: SetNull</code> sets the <code>categoryId</code> to null instead of 
            deleting the tasks.
          </p>
        </div>

        <h2>Delete Behaviors</h2>
        <p>Delete behaviors determine what happens to related records when a parent record is deleted:</p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold mb-2 text-red-600">Cascade</h4>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              When a user is deleted, all their tasks are automatically deleted too.
            </p>
            <CodeBlock
              code="user User @relation(\n  fields: [userId], \n  references: [id], \n  onDelete: Cascade\n)"
            />
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold mb-2 text-blue-600">SetNull</h4>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              When a category is deleted, tasks become uncategorized (categoryId becomes null).
            </p>
            <CodeBlock
              code="category Category? @relation(\n  fields: [categoryId], \n  references: [id], \n  onDelete: SetNull\n)"
            />
          </div>
        </div>

        <h2>Working with Relationships in Queries</h2>

        <h3>Including Related Data</h3>
        <p>Use the <code>include</code> option to fetch related data in your queries:</p>

        <CodeBlock
          code="// Fetch tasks with user and category information\nconst tasks = await prisma.task.findMany({\n  include: {\n    user: {\n      select: {\n        id: true,\n        name: true,\n        email: true,\n      },\n    },\n    category: {\n      select: {\n        id: true,\n        name: true,\n        color: true,\n      },\n    },\n  },\n  orderBy: {\n    createdAt: 'desc',\n  },\n})"
        />

        <h3>Selecting Specific Fields</h3>
        <p>Use <code>select</code> instead of <code>include</code> for more control over returned fields:</p>

        <CodeBlock
          code="// Only get specific fields from tasks and related data\nconst tasks = await prisma.task.findMany({\n  select: {\n    id: true,\n    title: true,\n    completed: true,\n    user: {\n      select: {\n        name: true,\n      },\n    },\n    category: {\n      select: {\n        name: true,\n        color: true,\n      },\n    },\n  },\n})"
        />

        <h3>Counting Related Records</h3>
        <p>Use <code>_count</code> to get the number of related records:</p>

        <CodeBlock
          code="// Get users with their task count\nconst users = await prisma.user.findMany({\n  select: {\n    id: true,\n    name: true,\n    email: true,\n    _count: {\n      select: {\n        tasks: true,\n      },\n    },\n  },\n})\n\nconst categories = await prisma.category.findMany({\n  include: {\n    _count: {\n      select: {\n        tasks: true,\n      },\n    },\n  },\n})"
        />

        <h3>Filtering by Related Data</h3>
        <p>You can filter records based on their relationships:</p>

        <CodeBlock
          code={`// Get all tasks for a specific user
const userTasks = await prisma.task.findMany({
  where: {
    userId: "specific-user-id",
  },
  include: {
    category: true,
  },
})

const categoryTasks = await prisma.task.findMany({
  where: {
    categoryId: "specific-category-id",
  },
  include: {
    user: {
      select: {
        name: true,
        email: true,
      },
    },
  },
})

const usersWithIncompleteTasks = await prisma.user.findMany({
  where: {
    tasks: {
      some: {
        completed: false,
      },
    },
  },
  include: {
    _count: {
      select: {
        tasks: true,
      },
    },
  },
})`}
        />

        <h2>Creating Records with Relationships</h2>

        <h3>Method 1: Using Foreign Keys</h3>
        <CodeBlock
          code={`// Create a task by providing the userId
const task = await prisma.task.create({
  data: {
    title: "New task",
    description: "Task description",
    userId: "existing-user-id",
    categoryId: "existing-category-id", // Optional
  },
  include: {
    user: true,
    category: true,
  },
})`}
        />

        <h3>Method 2: Using Nested Creates</h3>
        <CodeBlock
          code={`// Create a user and their first task in one operation
const userWithTask = await prisma.user.create({
  data: {
    email: "newuser@example.com",
    name: "New User",
    tasks: {
      create: [
        {
          title: "First task",
          description: "Getting started",
          priority: "HIGH",
        },
      ],
    },
  },
  include: {
    tasks: true,
  },
})`}
        />

        <h3>Method 3: Connecting Existing Records</h3>
        <CodeBlock
          code={`// Create a task and connect it to existing user and category
const task = await prisma.task.create({
  data: {
    title: "Connected task",
    user: {
      connect: {
        id: "existing-user-id",
      },
    },
    category: {
      connect: {
        id: "existing-category-id",
      },
    },
  },
  include: {
    user: true,
    category: true,
  },
})`}
        />

        <h2>Advanced Relationship Patterns</h2>

        <h3>Nested Filtering</h3>
        <CodeBlock
          code={`// Get categories that have high-priority tasks
const categoriesWithHighPriorityTasks = await prisma.category.findMany({
  where: {
    tasks: {
      some: {
        priority: "HIGH",
      },
    },
  },
  include: {
    tasks: {
      where: {
        priority: "HIGH",
      },
    },
    _count: {
      select: {
        tasks: true,
      },
    },
  },
})`}
        />

        <h3>Ordering by Related Fields</h3>
        <CodeBlock
          code={`// Get tasks ordered by user name
const tasks = await prisma.task.findMany({
  include: {
    user: {
      select: {
        name: true,
      },
    },
  },
  orderBy: {
    user: {
      name: 'asc',
    },
  },
})`}
        />

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-2">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="text-green-800 dark:text-green-200">Relationships Mastered!</h3>
          </div>
          <p className="text-green-700 dark:text-green-300">
            You now understand how to design, implement, and query database relationships with Prisma. 
            These concepts are fundamental to building scalable, well-structured applications.
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
          <h3 className="text-blue-800 dark:text-blue-200 mb-2">Best Practices</h3>
          <ul className="text-blue-700 dark:text-blue-300 space-y-1">
            <li>Always consider the delete behavior for your relationships</li>
            <li>Use <code>select</code> to limit data transfer and improve performance</li>
            <li>Index foreign key fields for better query performance</li>
            <li>Be mindful of N+1 query problems - use <code>include</code> wisely</li>
            <li>Consider using <code>_count</code> instead of loading all related records when you only need counts</li>
          </ul>
        </div>

        <div className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700">
          <a 
            href="/crud" 
            className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 font-medium"
          >
            ← Previous: CRUD Operations
          </a>
          <a 
            href="/demo" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Next: Interactive Demo →
          </a>
        </div>
      </div>
    </div>
  )
}
