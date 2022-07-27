import { Router } from "express";

import * as testController from "../controllers/testController.js";
import { validateTokenMiddleware } from "../middlewares/tokenMiddleware.js";
import validateSchemaMiddleware from "../middlewares/schemaMiddleware.js";
import testSchema from "../schemas/testSchema.js";

const testRouter = Router();

testRouter.use(validateTokenMiddleware);
testRouter.post('/test', validateSchemaMiddleware(testSchema), testController.insertTest);
testRouter.get('/tests/disciplines', testController.getByDiscipline);
testRouter.get('/tests/teachers', testController.getByDisciplineTeacher);

export default testRouter;