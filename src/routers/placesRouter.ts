import { Router } from "express"; 
import * as placesController from "../controllers/placesController"
import schemaValidator from "../middlewares/schemasValidator";
import { descriptionSchema, restaurantSchema, websiteSchema } from "../schemas/placesSchema";

const placesRouter = Router();

placesRouter.post("/places/create",schemaValidator(restaurantSchema),placesController.createPlaces);
placesRouter.put("/places/:id/verify",placesController.updateVerify);
placesRouter.put("/places/:id/website",schemaValidator(websiteSchema),placesController.updateWebsite);
placesRouter.put("/places/:id/description",schemaValidator(descriptionSchema),placesController.updateDescription);

export default placesRouter;