import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: "jason@sitesbyjason.com" },
    update: {},
    create: {
      email: "jason@sitesbyjason.com",
      name: "Jason",
      role: UserRole.Owner,
    },
  });
  await prisma.user.upsert({
    where: { email: "josh@sitesbyjason.com" },
    update: {},
    create: {
      email: "josh@sitesbyjason.com",
      name: "Josh",
      role: UserRole.Employee,
    },
  });
  await prisma.user.upsert({
    where: { email: "kristen@sitesbyjason.com" },
    update: {},
    create: {
      email: "kristen@sitesbyjason.com",
      name: "Kristen",
      role: UserRole.Guest,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
