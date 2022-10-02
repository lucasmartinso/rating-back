import { Router } from "express"; 
import * as placesController from "../controllers/placesController"
import schemaValidator from "../middlewares/schemasValidator";
import { restaurantSchema } from "../schemas/placesSchema";

const placesRouter = Router();

placesRouter.post("/places/create",schemaValidator(restaurantSchema),placesController.createPlaces);
placesRouter.put("/places/:id/verify",placesController.updateVerify);
placesRouter.post("/places/:id/website",placesController.updateWebsite);
placesRouter.put("/places/:id/description",placesController.updateDescription);

export default placesRouter;