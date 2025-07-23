import Link from 'next/link'
import { Database, ArrowRight, Code, Users, Play, Settings } from 'lucide-react'

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <Database className="h-16 w-16 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Next.js Database Integration Tutorial
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Learn how to integrate databases in Next.js applications using Prisma, SQLite, and TypeScript. 
          This comprehensive tutorial covers everything from setup to advanced relationships.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <Settings className="h-8 w-8 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Environment Setup</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Get started with Prisma, SQLite, and Next.js. Learn how to configure your development environment.
          </p>
          <Link 
            href="/setup" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            Start Setup <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <Database className="h-8 w-8 text-green-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Database Schema</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Design your database schema with Prisma. Learn about models, fields, and data types.
          </p>
          <Link 
            href="/schema" 
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
          >
            Learn Schema <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <Code className="h-8 w-8 text-purple-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">CRUD Operations</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Master Create, Read, Update, and Delete operations with practical examples and best practices.
          </p>
          <Link 
            href="/crud" 
            className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
          >
            Explore CRUD <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <Users className="h-8 w-8 text-orange-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Relationships</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Understand database relationships: one-to-many, many-to-many, and how to query related data.
          </p>
          <Link 
            href="/relationships" 
            className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
          >
            Learn Relations <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <Play className="h-8 w-8 text-red-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Interactive Demo</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Try out a complete task management application that demonstrates all the concepts in action.
          </p>
          <Link 
            href="/demo" 
            className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
          >
            Try Demo <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 shadow-lg border border-blue-200 dark:border-blue-800">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Ready to Start?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Begin your database integration journey with our step-by-step guide.
            </p>
            <Link 
              href="/setup" 
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What You&apos;ll Learn</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-gray-600 dark:text-gray-300">Setting up Prisma with Next.js and SQLite</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-gray-600 dark:text-gray-300">Designing database schemas and models</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-gray-600 dark:text-gray-300">Implementing CRUD operations with type safety</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-gray-600 dark:text-gray-300">Working with database relationships</span>
            </li>
          </ul>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-gray-600 dark:text-gray-300">Creating API routes for database operations</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-gray-600 dark:text-gray-300">Building interactive user interfaces</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-gray-600 dark:text-gray-300">Error handling and validation</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-gray-600 dark:text-gray-300">Best practices for production applications</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
