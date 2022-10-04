import { Router } from "express"; 
import * as ratingController from "../controllers/ratingController"
import schemaValidator from "../middlewares/schemasValidator";
import { ratingSchema } from "../schemas/ratingSchema";

const ratingRouter = Router();

ratingRouter.post("/rating/:id",schemaValidator(ratingSchema),ratingController.createRating);
ratingRouter.get("/places",ratingController.getPlaces);
ratingRouter.get("/places/food/last",ratingController.foodPlaces)

export default ratingRouter;