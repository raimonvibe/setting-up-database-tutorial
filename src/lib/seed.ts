import { prisma } from './db'

export async function seedDatabase() {
  try {
    const existingUsers = await prisma.user.count()
    if (existingUsers > 0) {
      console.log('Database already seeded')
      return
    }

    const user = await prisma.user.create({
      data: {
        email: 'demo@example.com',
        name: 'Demo User',
      },
    })

    await prisma.category.createMany({
      data: [
        {
          name: 'Work',
          description: 'Work-related tasks',
          color: '#3B82F6',
        },
        {
          name: 'Personal',
          description: 'Personal tasks and goals',
          color: '#10B981',
        },
        {
          name: 'Learning',
          description: 'Educational and skill development',
          color: '#8B5CF6',
        },
      ],
    })

    const workCategory = await prisma.category.findUnique({
      where: { name: 'Work' },
    })

    const personalCategory = await prisma.category.findUnique({
      where: { name: 'Personal' },
    })

    await prisma.task.createMany({
      data: [
        {
          title: 'Complete project proposal',
          description: 'Write and submit the Q1 project proposal',
          priority: 'HIGH',
          userId: user.id,
          categoryId: workCategory?.id,
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
        {
          title: 'Buy groceries',
          description: 'Weekly grocery shopping',
          priority: 'MEDIUM',
          userId: user.id,
          categoryId: personalCategory?.id,
        },
        {
          title: 'Learn Next.js',
          description: 'Complete the Next.js tutorial',
          priority: 'LOW',
          completed: true,
          userId: user.id,
        },
      ],
    })

    console.log('Database seeded successfully')
  } catch (error) {
    console.error('Error seeding database:', error)
    throw error
  }
}
