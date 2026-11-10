import { prisma } from '../src/db/prisma.js'

// Fixed ids so users update instead of duplicate
const ALICE = '00000000-0000-4000-8000-00000000a11c'
const ADMIN = '00000000-0000-4000-8000-0000000ad814'

async function main() {
  await prisma.user.upsert({
    where: { id: ALICE },
    update: {},
    create: {
      id: ALICE,
      email: 'alice@example.com',
      name: 'Alice'
    }
  })
  await prisma.user.upsert({
    where: { id: ADMIN },
    update: {},
    create: {
      id: ADMIN,
      email: 'admin@example.com',
      name: 'Admin',
      role: 'ADMIN'
    }
  })

  await prisma.snippet.deleteMany({ where: { authorId: ALICE } })
  await prisma.snippet.createMany({
    data: [
      {
        authorId: ALICE,
        title: 'Hello',
        body: "console.log('hi')",
        visibility: 'PUBLIC'
      },
      {
        authorId: ALICE,
        title: 'Secret',
        body: 'const key = 42',
        visibility: 'PRIVATE'
      }
    ]
  })

  const counts = {
    users: await prisma.user.count(),
    snippets: await prisma.snippet.count()
  }
  console.log('seeded', counts)
}

try {
  await main()
} finally {
  await prisma.$disconnect()
}
