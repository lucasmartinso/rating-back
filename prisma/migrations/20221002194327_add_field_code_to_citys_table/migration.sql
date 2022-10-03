-- CreateTable
CREATE TABLE "citys" (
    "id" SERIAL NOT NULL,
    "code" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "stateId" INTEGER NOT NULL,

    CONSTRAINT "citys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "foodPlaces" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "mainPhoto" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "typeId" INTEGER NOT NULL,
    "cityId" INTEGER NOT NULL,

    CONSTRAINT "foodPlaces_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "citys_name_key" ON "citys"("name");

-- CreateIndex
CREATE UNIQUE INDEX "foodPlaces_name_key" ON "foodPlaces"("name");

-- CreateIndex
CREATE UNIQUE INDEX "foodPlaces_website_key" ON "foodPlaces"("website");

-- CreateIndex
CREATE UNIQUE INDEX "foodPlaces_address_key" ON "foodPlaces"("address");

-- AddForeignKey
ALTER TABLE "citys" ADD CONSTRAINT "citys_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "states"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foodPlaces" ADD CONSTRAINT "foodPlaces_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "typeFoodPlaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foodPlaces" ADD CONSTRAINT "foodPlaces_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "citys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
