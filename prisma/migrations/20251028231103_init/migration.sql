-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'subAdmin', 'teacher', 'manager');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'teacher';
