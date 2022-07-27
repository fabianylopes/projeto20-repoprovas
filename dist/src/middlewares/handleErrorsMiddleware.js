export default function handleErrorsMiddleware(error, req, res, next) {
    console.log("Xabuuuuuu", error);
    if (error.type) {
        res.status(errorTypeToStatusCode(error.type)).send(error.type);
    }
    return res.sendStatus(500);
}
function errorTypeToStatusCode(type) {
    if (type === "unauthorized")
        return 401;
    if (type === "not found")
        return 404;
    if (type === "conflict")
        return 409;
}
