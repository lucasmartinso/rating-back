import { Router } from "express"; 
import * as usersController from "../controllers/usersController"
import { validateTokenAuth } from "../middlewares/authMiddleware";
import schemaValidator from "../middlewares/schemasValidator";
import { loginSchema, signupSchema, updatePhotoSchema } from "../schemas/usersSchema";

const usersRouter = Router();

usersRouter.post("/sign-up",schemaValidator(signupSchema),usersController.signup);
usersRouter.post("/login",schemaValidator(loginSchema),usersController.login);
usersRouter.put("/user/photo",schemaValidator(updatePhotoSchema),validateTokenAuth,usersController.updateMainPhoto);
usersRouter.post('/login/github');

export default usersRouter;