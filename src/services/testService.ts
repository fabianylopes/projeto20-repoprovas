import * as testRepository from "../repositories/testRepository.js"

export async function getByDiscipline() {
    return testRepository.findByDiscipline();
}

export async function getByDisciplineTeacher() {
    return testRepository.findByDisciplineTeacher();
}