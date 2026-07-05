-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "permissions" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "roles" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
