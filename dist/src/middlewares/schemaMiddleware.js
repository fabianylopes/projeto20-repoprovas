export default function validateSchemaMiddleware(schema) {
    return function (req, res, next) {
        var error = schema.validate(req.body).error;
        if (error) {
            return res.status(422).send({ error: error.message });
        }
        next();
    };
}
