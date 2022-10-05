import { Router } from "express"; 
import * as placesController from "../controllers/placesController"
import { validateTokenAuth } from "../middlewares/authMiddleware";
import schemaValidator from "../middlewares/schemasValidator";
import { descriptionSchema, restaurantSchema, websiteSchema } from "../schemas/placesSchema";

const placesRouter = Router();

placesRouter.post("/places/create",schemaValidator(restaurantSchema),validateTokenAuth,placesController.createPlaces);
placesRouter.put("/places/:id/verify",validateTokenAuth,placesController.updateVerify);
placesRouter.put("/places/:id/website",validateTokenAuth, schemaValidator(websiteSchema),placesController.updateWebsite);
placesRouter.put("/places/:id/description",validateTokenAuth, schemaValidator(descriptionSchema),placesController.updateDescription);
placesRouter.get("/places/:id",placesController.getPlace);
placesRouter.post("/places/search",placesController.searchPlace)

export default placesRouter;