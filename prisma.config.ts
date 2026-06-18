import { defineConfig, env } from "prisma/config";
import "dotenv/config";
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx ./prisma/seed.ts",
  },
  datasource: {
    // url: process.env.DATABASE_URL!, // الرابط هياخده من ملف .env
    url: env("DATABASE_URL"),
  },
  // هنا تقدر تحدد أي إعدادات تانية زي migrations.path لو محتاج
})