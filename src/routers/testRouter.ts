import { Router } from "express";

import * as testController from "../controllers/testController.js";

const testRouter = Router();

testRouter.get('/tests/disciplines', testController.getByDiscipline);
testRouter.get('/tests/teachers', testController.getByDisciplineTeacher);

export default testRouter;