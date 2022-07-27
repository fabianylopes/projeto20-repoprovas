import * as testRepository from "../repositories/testRepository.js"
import { CreateTest } from "../utils/createData.js";

export async function insert(createTest: CreateTest) {
    return testRepository.insert(createTest);
}

export async function getByDiscipline() {
    return testRepository.findByDiscipline();
}

export async function getByDisciplineTeacher() {
    return testRepository.findByDisciplineTeacher();
}