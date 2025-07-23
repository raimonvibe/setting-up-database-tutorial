import { CodeBlock } from '@/components/CodeBlock'
import { Plus, Eye, Edit, Trash2, Database, CheckCircle } from 'lucide-react'

export default function CrudPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="prose max-w-none">
        <h1>CRUD Operations</h1>
        <p>
          CRUD operations are the foundation of any database-driven application. CRUD stands for 
          <strong> Create, Read, Update, and Delete</strong> - the four basic operations you can 
          perform on data. In this section, we&apos;ll implement complete CRUD functionality using 
          Next.js API routes and Prisma.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
          <h3 className="text-blue-800 dark:text-blue-200 mb-2">What You&apos;ll Learn</h3>
          <ul className="text-blue-700 dark:text-blue-300 space-y-1">
            <li><strong>Create:</strong> Adding new records to your database</li>
            <li><strong>Read:</strong> Fetching and filtering data from your database</li>
            <li><strong>Update:</strong> Modifying existing records</li>
            <li><strong>Delete:</strong> Removing records from your database</li>
          </ul>
        </div>

        <h2>CRUD Operations Overview</h2>
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <Plus className="h-6 w-6 text-green-600 mb-2" />
            <h4 className="font-semibold mb-1">Create</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">POST requests to add new data</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <Eye className="h-6 w-6 text-blue-600 mb-2" />
            <h4 className="font-semibold mb-1">Read</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">GET requests to fetch data</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <Edit className="h-6 w-6 text-yellow-600 mb-2" />
            <h4 className="font-semibold mb-1">Update</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">PUT requests to modify data</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <Trash2 className="h-6 w-6 text-red-600 mb-2" />
            <h4 className="font-semibold mb-1">Delete</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">DELETE requests to remove data</p>
          </div>
        </div>

        <h2>1. Create Operations (POST)</h2>
        <p>
          Create operations add new records to your database. Let&apos;s start with creating a new user:
        </p>

        <h3>Creating a User</h3>
        <CodeBlock
          code={`import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        _count: {
          select: { tasks: true },
        },
      },
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}`}
          filename="src/app/api/users/route.ts"
        />

        <h3>Creating a Task with Relationships</h3>
        <p>When creating tasks, we need to handle relationships to users and categories:</p>

        <CodeBlock
          code={`export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, priority, userId, categoryId, dueDate } = body

    if (!title || !userId) {
      return NextResponse.json(
        { error: 'Title and userId are required' },
        { status: 400 }
      )
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        priority: priority || 'MEDIUM',
        userId,
        categoryId: categoryId || null,
        dueDate: dueDate ? new Date(dueDate) : null,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
      },
    })

    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    console.error('Error creating task:', error)
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    )
  }
}`}
          filename="src/app/api/tasks/route.ts"
        />

        <h2>2. Read Operations (GET)</h2>
        <p>
          Read operations fetch data from your database. They can be simple queries or complex 
          queries with filtering, sorting, and relationships.
        </p>

        <h3>Basic Read Operation</h3>
        <CodeBlock
          code={`export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        _count: {
          select: { tasks: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}`}
          filename="src/app/api/users/route.ts"
        />

        <h3>Advanced Read with Filtering</h3>
        <p>You can add query parameters to filter and search your data:</p>

        <CodeBlock
          code={`export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const completed = searchParams.get('completed')
    const categoryId = searchParams.get('categoryId')
    const priority = searchParams.get('priority')

    const where: Record<string, string | boolean> = {}
    if (completed !== null) {
      where.completed = completed === 'true'
    }
    if (categoryId) {
      where.categoryId = categoryId
    }
    if (priority) {
      where.priority = priority
    }

    const tasks = await prisma.task.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
      },
      orderBy: [
        { completed: 'asc' },
        { priority: 'desc' },
        { createdAt: 'desc' },
      ],
    })

    return NextResponse.json(tasks)
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    )
  }
}`}
          filename="src/app/api/tasks/route.ts"
        />

        <h3>Reading a Single Record</h3>
        <CodeBlock
          code={`export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const task = await prisma.task.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
      },
    })

    if (!task) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(task)
  } catch (error) {
    console.error('Error fetching task:', error)
    return NextResponse.json(
      { error: 'Failed to fetch task' },
      { status: 500 }
    )
  }
}`}
          filename="src/app/api/tasks/[id]/route.ts"
        />

        <h2>3. Update Operations (PUT)</h2>
        <p>
          Update operations modify existing records. It&apos;s important to handle partial updates 
          and validate the data before updating.
        </p>

        <CodeBlock
          code={`export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { title, description, completed, priority, dueDate, categoryId } = body

    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(completed !== undefined && { completed }),
        ...(priority !== undefined && { priority }),
        ...(dueDate !== undefined && { dueDate: dueDate ? new Date(dueDate) : null }),
        ...(categoryId !== undefined && { categoryId }),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
      },
    })

    return NextResponse.json(task)
  } catch (error) {
    console.error('Error updating task:', error)
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    )
  }
}`}
          filename="src/app/api/tasks/[id]/route.ts"
        />

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-8">
          <h3 className="text-yellow-800 dark:text-yellow-200 mb-2">Partial Updates</h3>
          <p className="text-yellow-700 dark:text-yellow-300">
            The spread operator pattern allows 
            you to update only the fields that are provided in the request, leaving other fields unchanged.
          </p>
        </div>

        <h2>4. Delete Operations (DELETE)</h2>
        <p>
          Delete operations remove records from your database. Always consider the impact on 
          related data and use appropriate cascade behaviors.
        </p>

        <CodeBlock
          code={`export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    await prisma.task.delete({
      where: {
        id,
      },
    })

    return NextResponse.json({ message: 'Task deleted successfully' })
  } catch (error) {
    console.error('Error deleting task:', error)
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    )
  }
}`}
          filename="src/app/api/tasks/[id]/route.ts"
        />

        <h2>Error Handling Best Practices</h2>
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold mb-2">Validation Errors (400)</h4>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              Return 400 status codes for missing required fields or invalid data.
            </p>
            <CodeBlock
              code={`if (!email) {
  return NextResponse.json(
    { error: 'Email is required' },
    { status: 400 }
  )
}`}
            />
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold mb-2">Not Found Errors (404)</h4>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              Return 404 status codes when a requested resource doesn&apos;t exist.
            </p>
            <CodeBlock
              code={`if (!task) {
  return NextResponse.json(
    { error: 'Task not found' },
    { status: 404 }
  )
}`}
            />
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold mb-2">Server Errors (500)</h4>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              Always catch and handle unexpected errors with proper logging.
            </p>
            <CodeBlock
              code={`} catch (error) {
  console.error('Error creating user:', error)
  return NextResponse.json(
    { error: 'Failed to create user' },
    { status: 500 }
  )
}`}
            />
          </div>
        </div>

        <h2>Testing Your CRUD Operations</h2>
        <p>You can test your API routes using tools like curl, Postman, or the browser:</p>

        <CodeBlock
          code={`# Create a new user
curl -X POST http://localhost:3000/api/users \\
  -H "Content-Type: application/json" \\
  -d '{"email": "john@example.com", "name": "John Doe"}'

# Get all users
curl http://localhost:3000/api/users

# Get tasks with filters
curl "http://localhost:3000/api/tasks?completed=false&priority=HIGH"

# Update a task
curl -X PUT http://localhost:3000/api/tasks/[task-id] \\
  -H "Content-Type: application/json" \\
  -d '{"completed": true}'

# Delete a task
curl -X DELETE http://localhost:3000/api/tasks/[task-id]`}
          language="bash"
        />

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-2">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="text-green-800 dark:text-green-200">CRUD Complete!</h3>
          </div>
          <p className="text-green-700 dark:text-green-300">
            You now have a complete understanding of CRUD operations with Prisma and Next.js. 
            These patterns form the foundation of most database-driven applications.
          </p>
        </div>

        <div className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700">
          <a 
            href="/schema" 
            className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 font-medium"
          >
            ← Previous: Database Schema
          </a>
          <a 
            href="/relationships" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Next: Database Relationships →
          </a>
        </div>
      </div>
    </div>
  )
}
