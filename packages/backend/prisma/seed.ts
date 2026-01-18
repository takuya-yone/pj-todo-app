import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'

const pgAdapter = new PrismaPg(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT),
    ssl: process.env.DB_SSLMODE === 'require',
  },
  { schema: process.env.DB_SCHEMA ?? 'public' },
)

const prisma = new PrismaClient({ adapter: pgAdapter })

async function main() {
  const healthMessage = await prisma.healthMessage.upsert({
    where: { id: 1 },
    update: { message: 'Deep Health Check is OK!' },
    create: { message: 'Deep Health Check is OK!' },
  })
  console.log({ healthMessage })

  const todo1 = await prisma.todoItem.create({
    data: {
      title: 'First Todo',
      comment: 'First Todo Comment',
      complete: false,
    },
  })
  const todoMeta1 = await prisma.todoItemMetadata.create({
    data: {
      todoId: todo1.id,
      priority: 1,
      dueDate: null,
    },
  })
  console.log({ todo1, todoMeta1 })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
