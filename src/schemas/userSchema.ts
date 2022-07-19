import joi from "joi";

import { CreateUserData } from "../repositories/userRepository";

const signUpSchema = joi.object<CreateUserData>({
    email: joi.string().required(),
    password: joi.string().required(),
    //confirmPassword: joi.string().required()
});

const signInSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required()
});

export {
    signInSchema,
    signUpSchema
}