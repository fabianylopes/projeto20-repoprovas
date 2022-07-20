import { CreateUser } from "../utils/createData.js";
import { prisma } from "../config/db.js";

export async function create(createUser: CreateUser) {
    return prisma.user.create({
        data: createUser,
    });
}

export async function findByEmail(email: string) {
    return prisma.user.findUnique({
        where: {
            email,
        }
    });
}