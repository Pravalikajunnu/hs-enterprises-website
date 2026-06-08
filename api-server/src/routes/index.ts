import { Router, type IRouter } from "express";
import healthRouter from "./health";
import reviewsRouter from "./reviews";
import leadsRouter from "./leads";

const router: IRouter = Router();

router.use(healthRouter);
router.use(reviewsRouter);
router.use(leadsRouter);

export default router;
