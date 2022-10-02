import { Router } from "express"; 
import usersRouter from "./usersRouter";
import { validateTokenAuth } from "../middlewares/authMiddleware";

const router = Router();

router.use(usersRouter); 
router.use(validateTokenAuth);

export default router;