import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.findFirst()
  if (!user) {
    throw new Error(
      'No user found in database. Please create at least one user.',
    )
  }

  const webhooks = []
  for (let i = 0; i < 5; i++) {
    // 5 webhooks
    const webhook = await prisma.webhook.create({
      data: {
        name: faker.lorem.words(1),
        url: faker.string.uuid(),
        userId: user.id,
      },
    })
    webhooks.push(webhook)
  }

  for (const webhook of webhooks) {
    const nbLogs = faker.number.int({ min: 3, max: 10 })
    for (let i = 0; i < nbLogs; i++) {
      await prisma.requestLog.create({
        data: {
          webhookId: webhook.id,
          method: faker.helpers.arrayElement(['GET', 'POST', 'PUT', 'DELETE']),
          origin: faker.internet.url(),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${faker.internet.password()}`,
          },
          queryParams: { foo: faker.word.sample() },
          body: { data: faker.lorem.paragraph() },
          ip: faker.internet.ip(),
          userAgent: faker.internet.userAgent(),
        },
      })
    }
  }
  console.log('✅ Seed completed: webhooks and request created for first user.')
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
