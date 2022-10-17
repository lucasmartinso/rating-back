export const querie: string = 
`SELECT fp.id, fp.name, fp.score, fp."mainPhoto", AVG(r.food) AS food, AVG(r.environment) AS environment, AVG(r.attendance) AS attendance, AVG(r.price) AS price, t.name AS typeFood, COUNT(r."foodPlaceId") AS "numberRatings", fp.verify 
    FROM "foodPlaces" fp
    JOIN "ratingFoodPlaces" r ON r."foodPlaceId"=fp.id
    JOIN "typeFoodPlaces" t ON t.id=fp."typeId"
    GROUP BY fp.id, t.name
`