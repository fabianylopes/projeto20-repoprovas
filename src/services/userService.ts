import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import * as userRepository from "../repositories/userRepository.js"
import { CreateUserData } from "../repositories/userRepository.js";

export async function signUp(createUserData: CreateUserData) {
    const { email, password } = createUserData;
    
    const existingEmail = await userRepository.findByEmail(email);
    if(existingEmail) throw {type: "conflict", message: "Email has already been registred!"}

    const hashedPassword = bcrypt.hashSync(password, 10);

    await userRepository.create({email, password: hashedPassword});
}

export async function signIn(createUserData: CreateUserData) {
    const { email, password } = createUserData;

    const user = await userRepository.findByEmail(email);
    if(!user) throw {type: "unauthorized", message: "Invalid data!"}

    const rightPassword = bcrypt.compareSync(password, user.password);
    if(!rightPassword) throw { type: "unauthorized", message: "Invalid password" } 

    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign({ userId:user.id }, secretKey);

    return token;
}