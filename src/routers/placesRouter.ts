import { Router } from "express"; 
import * as placesController from "../controllers/placesController"
import schemaValidator from "../middlewares/schemasValidator";
import { restaurantSchema } from "../schemas/placesSchema";

const placesRouter = Router();

placesRouter.post("/places/create",schemaValidator(restaurantSchema),placesController.createPlaces);

export default placesRouter;