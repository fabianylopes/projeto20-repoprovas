import Joi from "joi";
import { CreateTest } from "../utils/createData";

const testSchema = Joi.object<CreateTest>({
    name: Joi.string().required(),
    pdfUrl: Joi.string().uri().required(),
    categoryId: Joi.number().required(),
    teachersDisciplineId: Joi.number().required()
});

export default testSchema;