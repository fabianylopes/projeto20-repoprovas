import { prisma } from "../config/db.js";

import { CreateTest } from "../utils/createData.js";

export async function insert(test: CreateTest) {
    return prisma.test.create({
        data: test,
    });
}

export async function findByDiscipline() {
    return prisma.term.findMany({
        include: {
            disciplines: {
                include: {
                    teachersDiscipline: {
                        include: {
                            teacher: true,
                            tests: {
                                include: {
                                    category: true,
                                }
                            }
                        }
                    }
                }
            }
        }
    });
}

export async function findByDisciplineTeacher() {
    return prisma.teachersDiscipline.findMany({
        include: {
            teacher: true,
            discipline: true,
            tests: {
                include: {
                    category: true,
                }
            }
        }
    });
}