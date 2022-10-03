import { Router } from "express"; 
import * as placesController from "../controllers/placesController"
import schemaValidator from "../middlewares/schemasValidator";
import { restaurantSchema } from "../schemas/placesSchema";

const ratingRouter = Router();

ratingRouter.post("/rating/:id",schemaValidator(restaurantSchema),placesController.createPlaces);

export default ratingRouter;