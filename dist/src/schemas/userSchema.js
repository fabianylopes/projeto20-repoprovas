import joi from "joi";
var signUpSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required()
});
var signInSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required()
});
export { signInSchema, signUpSchema };
