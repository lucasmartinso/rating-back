import { Router } from "express"; 
import * as placesController from "../controllers/placesController"

const localizationRouter = Router();

localizationRouter.get("/states",placesController.getStates);
localizationRouter.post("/cities/:id",placesController.getCities)

export default localizationRouter;