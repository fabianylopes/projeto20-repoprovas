import { NextFunction, Request, Response } from "express";

export async function handleErrorsMiddleware(error, req: Request, res: Response, next: NextFunction) {
    
    console.log("Xabuuuuuu", error);

    if(error.type){
        res.status(errorTypeToStatusCode(error.type)).send(error.type);
    }

    return res.sendStatus(500);
}

function errorTypeToStatusCode(type: string) {
    if (type === "unauthorized") return 401;
    if (type === "not found") return 404;
    if (type === "conflict") return 409;
}