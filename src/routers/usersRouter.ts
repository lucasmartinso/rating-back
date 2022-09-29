import { Router } from "express"; 
import * as usersController from "../controllers/usersController"
import schemaValidator from "../middlewares/schemasValidator";
import { loginSchema, signupSchema } from "../schemas/usersSchema";

const usersRouter = Router();

usersRouter.post("/sign-up",schemaValidator(signupSchema),usersController.signup);
usersRouter.post("/login",schemaValidator(loginSchema),usersController.login);
usersRouter.put("/user/photo",schemaValidator(signupSchema),usersController.updateMainPhoto);

export default usersRouter;