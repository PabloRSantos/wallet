-- CreateEnum
CREATE TYPE "TransactionOperation" AS ENUM ('DEPOSIT', 'WITHDRAWAL', 'PURCHASE', 'CANCELLATION', 'REVERSAL');

-- CreateTable
CREATE TABLE "transactions" (
    "id" UUID NOT NULL,
    "account_id" INTEGER NOT NULL,
    "operation" "TransactionOperation" NOT NULL,
    "amount" INTEGER NOT NULL,
    "parent_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "transactions_parent_id_key" ON "transactions"("parent_id");

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "transactions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
