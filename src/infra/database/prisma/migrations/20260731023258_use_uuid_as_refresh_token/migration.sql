/*
  Warnings:

  - You are about to drop the column `accountId` on the `refresh_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `refresh_tokens` table. All the data in the column will be lost.
  - Added the required column `account_id` to the `refresh_tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expires_at` to the `refresh_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "refresh_tokens" DROP CONSTRAINT "refresh_tokens_accountId_fkey";

-- DropIndex
DROP INDEX "refresh_tokens_token_idx";

-- AlterTable
ALTER TABLE "refresh_tokens" DROP COLUMN "accountId",
DROP COLUMN "token",
ADD COLUMN     "account_id" UUID NOT NULL,
ADD COLUMN     "expires_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "issued_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
