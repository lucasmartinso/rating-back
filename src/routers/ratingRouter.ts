import { Router } from "express"; 
import * as placesController from "../controllers/placesController"
import schemaValidator from "../middlewares/schemasValidator";
import { ratingSchema } from "../schemas/ratingSchema";

const ratingRouter = Router();

ratingRouter.post("/rating/:id",schemaValidator(ratingSchema),placesController.createPlaces);

export default ratingRouter;