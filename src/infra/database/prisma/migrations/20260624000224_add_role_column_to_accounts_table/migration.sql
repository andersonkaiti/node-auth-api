/*
  Warnings:

  - Added the required column `role` to the `account` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "role" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "account" ADD COLUMN     "role" "role" NOT NULL;
