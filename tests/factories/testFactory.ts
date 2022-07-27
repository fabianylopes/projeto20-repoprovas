import { faker } from '@faker-js/faker';

import { prisma } from "../../src/config/db.js";


export async function insertTest(){
    return {
        name: faker.music.genre(),
        pdfUrl: faker.internet.url(),
        categoryId: 1,
        disciplineId: 1,
        teachersDisciplineId: 1
    }
}

