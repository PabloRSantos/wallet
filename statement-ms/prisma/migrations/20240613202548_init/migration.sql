-- CreateEnum
CREATE TYPE "StatementOperation" AS ENUM ('DEPOSIT', 'WITHDRAWAL', 'PURCHASE', 'CANCELLATION', 'REVERSAL');

-- CreateTable
CREATE TABLE "statements" (
    "id" SERIAL NOT NULL,
    "account_id" INTEGER NOT NULL,
    "transaction_id" UUID NOT NULL,
    "operation" "StatementOperation" NOT NULL,
    "amount" INTEGER NOT NULL,
    "balance" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "statements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "statements_transaction_id_key" ON "statements"("transaction_id");
