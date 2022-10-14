import { Router } from "express"; 
import * as placesController from "../controllers/placesController"

const localizationRouter = Router();

localizationRouter.get("/localization",placesController.getStates);
//localizationRouter.post("/localization",placesController)

export default localizationRouter;