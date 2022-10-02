/*
  Warnings:

  - You are about to drop the `citys` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "citys" DROP CONSTRAINT "citys_stateId_fkey";

-- DropForeignKey
ALTER TABLE "foodPlaces" DROP CONSTRAINT "foodPlaces_cityId_fkey";

-- DropTable
DROP TABLE "citys";

-- CreateTable
CREATE TABLE "cities" (
    "id" SERIAL NOT NULL,
    "code" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "stateId" INTEGER NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cities_name_key" ON "cities"("name");

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "states"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foodPlaces" ADD CONSTRAINT "foodPlaces_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
