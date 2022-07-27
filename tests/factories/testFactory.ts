import { faker } from '@faker-js/faker';

export async function insertTest(){
    return {
        name: faker.music.genre(),
        pdfUrl: faker.internet.url(),
        categoryId: 1,
        teachersDisciplineId: 1
    }
}

