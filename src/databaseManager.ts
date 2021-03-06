import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const projects = await prisma.project.findMany()
  console.log(projects)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
