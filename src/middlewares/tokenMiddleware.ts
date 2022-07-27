import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { findById } from "../repositories/userRepository.js";

export async function validateTokenMiddleware(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers["authorization"];
    if(!authorization) throw { type: "unauthorized", message: "Missing token" }

    const token = authorization?.replace('Bearer ', '').trim();
    if(!token) throw { type: "unauthorized", message: "Missing token" }

    try {
        const secretKey = process.env.JWT_SECRET;
        const { userId } = jwt.verify(token, secretKey) as { userId: number };

        const userToken = await findById(userId);
        res.locals.userToken = userToken;

        next();
    } catch {
        throw { type: "unauthorized", message: "Invalid token" }
    }
}