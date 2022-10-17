-- CreateTable
CREATE TABLE "ratingFoodPlaces" (
    "id" SERIAL NOT NULL,
    "foodPlaceId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "food" INTEGER NOT NULL,
    "environment" INTEGER NOT NULL,
    "attendance" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ratingFoodPlaces_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ratingFoodPlaces" ADD CONSTRAINT "ratingFoodPlaces_foodPlaceId_fkey" FOREIGN KEY ("foodPlaceId") REFERENCES "foodPlaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratingFoodPlaces" ADD CONSTRAINT "ratingFoodPlaces_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
