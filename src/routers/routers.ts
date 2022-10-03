import { Router } from "express"; 
import usersRouter from "./usersRouter";
import { validateTokenAuth } from "../middlewares/authMiddleware";
import placesRouter from "./placesRouter";

const router = Router();

router.use(usersRouter); 
router.use(validateTokenAuth);
router.use(placesRouter);

export default router;