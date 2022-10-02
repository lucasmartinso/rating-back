import { Router } from "express"; 
import * as placesController from "../controllers/placesController"
import { validateTokenAuth } from "../middlewares/authMiddleware";
import schemaValidator from "../middlewares/schemasValidator";
import { loginSchema, signupSchema, updatePhotoSchema } from "../schemas/usersSchema";

const usersRouter = Router();

usersRouter.post("/places/create",placesController.createPlaces);

export default usersRouter;