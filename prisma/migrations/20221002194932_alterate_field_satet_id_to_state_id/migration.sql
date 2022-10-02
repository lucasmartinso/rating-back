/*
  Warnings:

  - You are about to drop the column `stateId` on the `cities` table. All the data in the column will be lost.
  - Added the required column `state_id` to the `cities` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cities" DROP CONSTRAINT "cities_stateId_fkey";

-- AlterTable
ALTER TABLE "cities" DROP COLUMN "stateId",
ADD COLUMN     "state_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "states"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
