import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      name: 'Demo User',
    },
  })

  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: 'Work' },
      update: {},
      create: {
        name: 'Work',
        description: 'Work-related tasks and projects',
        color: '#3B82F6',
      },
    }),
    prisma.category.upsert({
      where: { name: 'Personal' },
      update: {},
      create: {
        name: 'Personal',
        description: 'Personal tasks and goals',
        color: '#10B981',
      },
    }),
    prisma.category.upsert({
      where: { name: 'Learning' },
      update: {},
      create: {
        name: 'Learning',
        description: 'Educational and skill development',
        color: '#8B5CF6',
      },
    }),
  ])

  const tasks = await Promise.all([
    prisma.task.create({
      data: {
        title: 'Complete project proposal',
        description: 'Write and submit the Q1 project proposal for the new client',
        priority: 'HIGH',
        userId: user.id,
        categoryId: categories[0].id,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    }),
    prisma.task.create({
      data: {
        title: 'Buy groceries',
        description: 'Weekly grocery shopping - milk, bread, eggs, vegetables',
        priority: 'MEDIUM',
        userId: user.id,
        categoryId: categories[1].id,
      },
    }),
    prisma.task.create({
      data: {
        title: 'Learn Next.js database integration',
        description: 'Complete the comprehensive database tutorial',
        priority: 'LOW',
        completed: true,
        userId: user.id,
        categoryId: categories[2].id,
      },
    }),
    prisma.task.create({
      data: {
        title: 'Team meeting preparation',
        description: 'Prepare slides and agenda for the weekly team meeting',
        priority: 'MEDIUM',
        userId: user.id,
        categoryId: categories[0].id,
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      },
    }),
    prisma.task.create({
      data: {
        title: 'Exercise routine',
        description: 'Go for a 30-minute run in the park',
        priority: 'LOW',
        userId: user.id,
        categoryId: categories[1].id,
      },
    }),
  ])

  console.log('Database seeded successfully!')
  console.log(`Created user: ${user.email}`)
  console.log(`Created ${categories.length} categories`)
  console.log(`Created ${tasks.length} tasks`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
