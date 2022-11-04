import { Router } from "express"; 
import usersRouter from "./usersRouter";
import placesRouter from "./placesRouter";
import ratingRouter from "./ratingRouter";
import localizationRouter from "./localizationRouter";

const router = Router();

router.use(usersRouter); 
router.use(placesRouter);
router.use(ratingRouter);
router.use(localizationRouter);

export default router;