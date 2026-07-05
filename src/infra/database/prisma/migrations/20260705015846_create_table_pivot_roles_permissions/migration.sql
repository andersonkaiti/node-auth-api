/*
  Warnings:

  - You are about to drop the column `roleId` on the `accounts` table. All the data in the column will be lost.
  - Added the required column `role_id` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_roleId_fkey";

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "roleId",
ADD COLUMN     "role_id" UUID NOT NULL;

-- CreateTable
CREATE TABLE "roles_permissions" (
    "role_id" UUID NOT NULL,
    "permission_code" TEXT NOT NULL,

    CONSTRAINT "roles_permissions_pkey" PRIMARY KEY ("role_id","permission_code")
);

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
