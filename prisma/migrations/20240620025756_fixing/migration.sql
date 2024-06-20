/*
  Warnings:

  - You are about to drop the column `departament` on the `OrderAddress` table. All the data in the column will be lost.
  - You are about to drop the column `departament` on the `UserAddress` table. All the data in the column will be lost.
  - Added the required column `department` to the `OrderAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department` to the `UserAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderAddress" DROP COLUMN "departament",
ADD COLUMN     "department" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserAddress" DROP COLUMN "departament",
ADD COLUMN     "department" TEXT NOT NULL;
