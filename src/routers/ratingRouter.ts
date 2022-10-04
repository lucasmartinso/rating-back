import { Router } from "express"; 
import * as ratingController from "../controllers/ratingController"
import schemaValidator from "../middlewares/schemasValidator";
import { ratingSchema } from "../schemas/ratingSchema";

const ratingRouter = Router();

ratingRouter.post("/rating/:id",schemaValidator(ratingSchema),ratingController.createRating);
ratingRouter.get("/places",ratingController.getPlaces);
ratingRouter.get("/places/food/:type",ratingController.foodPlaces);
ratingRouter.get("/places/enviroment/:type",);
ratingRouter.get("/places/attendance/:type",);
ratingRouter.get("/places/price/:type",);

export default ratingRouter;