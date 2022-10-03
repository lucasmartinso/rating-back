-- CreateTable
CREATE TABLE "typeFoodPlaces" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "typeFoodPlaces_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "typeFoodPlaces_name_key" ON "typeFoodPlaces"("name");
