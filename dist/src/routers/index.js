import { Router } from "express";
import userRouter from "./userRouter.js";
import testRouter from "./testRouter.js";
var router = Router();
router.use(userRouter);
router.use(testRouter);
export default router;
