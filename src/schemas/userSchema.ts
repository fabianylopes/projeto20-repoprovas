import joi from "joi";

import { CreateUser } from "../utils/createData.js";

const signUpSchema = joi.object<CreateUser>({
    email: joi.string().required(),
    password: joi.string().required(),
});

const signInSchema = joi.object<CreateUser>({
    email: joi.string().required(),
    password: joi.string().required()
});

export {
    signInSchema,
    signUpSchema
}