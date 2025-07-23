'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Check, X, Calendar, User, Tag, Play } from 'lucide-react'

interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  dueDate?: string
  createdAt: string
  user: {
    id: string
    name?: string
    email: string
  }
  category?: {
    id: string
    name: string
    color: string
  }
}

interface Category {
  id: string
  name: string
  description?: string
  color: string
  _count: {
    tasks: number
  }
}

interface User {
  id: string
  name?: string
  email: string
  _count: {
    tasks: number
  }
}

const priorityColors = {
  LOW: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
  MEDIUM: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  HIGH: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  URGENT: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
}

export default function DemoPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [showCategoryForm, setShowCategoryForm] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM' as const,
    dueDate: '',
    userId: '',
    categoryId: '',
  })

  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: '',
    color: '#3B82F6',
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [tasksRes, categoriesRes, usersRes] = await Promise.all([
        fetch('/api/tasks'),
        fetch('/api/categories'),
        fetch('/api/users'),
      ])

      const [tasksData, categoriesData, usersData] = await Promise.all([
        tasksRes.json(),
        categoriesRes.json(),
        usersRes.json(),
      ])

      setTasks(tasksData)
      setCategories(categoriesData)
      setUsers(usersData)

      if (usersData.length > 0 && !taskForm.userId) {
        setTaskForm(prev => ({ ...prev, userId: usersData[0].id }))
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const createTask = async () => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...taskForm,
          dueDate: taskForm.dueDate || null,
          categoryId: taskForm.categoryId || null,
        }),
      })

      if (response.ok) {
        await fetchData()
        setShowTaskForm(false)
        setTaskForm({
          title: '',
          description: '',
          priority: 'MEDIUM',
          dueDate: '',
          userId: users[0]?.id || '',
          categoryId: '',
        })
      }
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }

  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })

      if (response.ok) {
        await fetchData()
        setEditingTask(null)
      }
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const deleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchData()
      }
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  const createCategory = async () => {
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryForm),
      })

      if (response.ok) {
        await fetchData()
        setShowCategoryForm(false)
        setCategoryForm({
          name: '',
          description: '',
          color: '#3B82F6',
        })
      }
    } catch (error) {
      console.error('Error creating category:', error)
    }
  }

  const deleteCategory = async (categoryId: string) => {
    try {
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchData()
      }
    } catch (error) {
      console.error('Error deleting category:', error)
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading demo...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Play className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Interactive Demo</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
          Try out our task management application! This demo shows all the database concepts in action. 
          Create tasks, organize them with categories, and see how relationships work in real-time.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Tasks</h2>
                <button
                  onClick={() => setShowTaskForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Task</span>
                </button>
              </div>
            </div>

            <div className="p-6">
              {tasks.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 dark:text-gray-500 mb-4">
                    <Check className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No tasks yet</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Get started by creating your first task!
                  </p>
                  <button
                    onClick={() => setShowTaskForm(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                  >
                    Create Task
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <button
                              onClick={() => updateTask(task.id, { completed: !task.completed })}
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                                task.completed
                                  ? 'bg-green-500 border-green-500 text-white'
                                  : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
                              }`}
                            >
                              {task.completed && <Check className="h-3 w-3" />}
                            </button>
                            <h3 className={`font-medium ${
                              task.completed 
                                ? 'line-through text-gray-500 dark:text-gray-400' 
                                : 'text-gray-900 dark:text-white'
                            }`}>
                              {task.title}
                            </h3>
                            <span className={`px-2 py-1 text-xs rounded-full ${priorityColors[task.priority]}`}>
                              {task.priority}
                            </span>
                          </div>
                          
                          {task.description && (
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                              {task.description}
                            </p>
                          )}
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center space-x-1">
                              <User className="h-4 w-4" />
                              <span>{task.user.name || task.user.email}</span>
                            </div>
                            
                            {task.category && (
                              <div className="flex items-center space-x-1">
                                <Tag className="h-4 w-4" />
                                <span 
                                  className="px-2 py-1 rounded text-xs text-white"
                                  style={{ backgroundColor: task.category.color }}
                                >
                                  {task.category.name}
                                </span>
                              </div>
                            )}
                            
                            {task.dueDate && (
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setEditingTask(task)}
                            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900 dark:text-white">Categories</h3>
                <button
                  onClick={() => setShowCategoryForm(true)}
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="p-4">
              {categories.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-4">
                  No categories yet
                </p>
              ) : (
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="text-sm text-gray-900 dark:text-white">
                          {category.name}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          ({category._count.tasks})
                        </span>
                      </div>
                      <button
                        onClick={() => deleteCategory(category.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">Statistics</h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Total Tasks</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{tasks.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Completed</span>
                <span className="text-sm font-medium text-green-600">
                  {tasks.filter(t => t.completed).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Pending</span>
                <span className="text-sm font-medium text-orange-600">
                  {tasks.filter(t => !t.completed).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Categories</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{categories.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showTaskForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Create New Task</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={taskForm.title}
                  onChange={(e) => setTaskForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter task title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={taskForm.description}
                  onChange={(e) => setTaskForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows={3}
                  placeholder="Enter task description"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Priority
                  </label>
                  <select
                    value={taskForm.priority}
                    onChange={(e) => setTaskForm(prev => ({ ...prev, priority: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category
                  </label>
                  <select
                    value={taskForm.categoryId}
                    onChange={(e) => setTaskForm(prev => ({ ...prev, categoryId: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">No category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  value={taskForm.dueDate}
                  onChange={(e) => setTaskForm(prev => ({ ...prev, dueDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowTaskForm(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createTask}
                disabled={!taskForm.title}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-md transition-colors"
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}

      {showCategoryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Create New Category</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter category name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter category description"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Color
                </label>
                <input
                  type="color"
                  value={categoryForm.color}
                  onChange={(e) => setCategoryForm(prev => ({ ...prev, color: e.target.value }))}
                  className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-md"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCategoryForm(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createCategory}
                disabled={!categoryForm.name}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-md transition-colors"
              >
                Create Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
