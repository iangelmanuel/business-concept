/*
  Warnings:

  - Added the required column `departament` to the `OrderAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identification` to the `OrderAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeOfIdentification` to the `OrderAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departament` to the `UserAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identification` to the `UserAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeOfIdentification` to the `UserAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderAddress" ADD COLUMN     "departament" TEXT NOT NULL,
ADD COLUMN     "extraData" TEXT,
ADD COLUMN     "identification" TEXT NOT NULL,
ADD COLUMN     "typeOfIdentification" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserAddress" ADD COLUMN     "departament" TEXT NOT NULL,
ADD COLUMN     "extraData" TEXT,
ADD COLUMN     "identification" TEXT NOT NULL,
ADD COLUMN     "typeOfIdentification" TEXT NOT NULL;
