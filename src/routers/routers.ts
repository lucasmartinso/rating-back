import { Router } from "express"; 
import usersRouter from "./usersRouter";
import { validateTokenAuth } from "../middlewares/authMiddleware";
import placesRouter from "./placesRouter";
import ratingRouter from "./ratingRouter";

const router = Router();

router.use(usersRouter); 
router.use(placesRouter);
router.use(ratingRouter);

export default router;