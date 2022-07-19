import { User } from "@prisma/client"; 
import { prisma } from "../config/db.js";

export type CreateUserData = Omit<User, "id">

export async function create(createUserData: CreateUserData) {
    return prisma.user.create({
        data: createUserData
    });
}

export async function findByEmail(email: string) {
    return prisma.user.findUnique({
        where: {
            email,
        }
    });
}