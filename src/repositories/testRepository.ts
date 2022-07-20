import { prisma } from "../config/db.js";

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
                                    categories: true,
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
                    categories: true,
                }
            }
        }
    });
}