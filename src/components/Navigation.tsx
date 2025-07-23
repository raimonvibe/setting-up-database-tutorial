'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Database, Home, Settings, Code, Users, Play } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/setup', label: 'Setup', icon: Settings },
  { href: '/schema', label: 'Schema', icon: Database },
  { href: '/crud', label: 'CRUD', icon: Code },
  { href: '/relationships', label: 'Relations', icon: Users },
  { href: '/demo', label: 'Demo', icon: Play },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <Database className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl text-gray-900 dark:text-white">
                DB Tutorial
              </span>
            </Link>
            
            <div className="hidden md:flex space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
          
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
