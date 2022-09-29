import { Router } from "express"; 
import * as usersController from "../controllers/usersController"

const usersRouter = Router();

usersRouter.post("/sign-up",usersController.signup);

export default usersRouter;