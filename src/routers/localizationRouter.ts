import { Router } from "express"; 
import * as localizationController from "../controllers/localizationController"

const localizationRouter = Router();

localizationRouter.get("/states",localizationController.getStates);
localizationRouter.post("/cities/:id",localizationController.getCities)

export default localizationRouter;