import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

import { prisma } from "../../src/config/db.js";

export function createUserFactory() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  }
}

export async function userDataFactory(email: string, password: string) {
  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = await prisma.user.create({
    data: { email: email, password: hashedPassword },
  })

  return user;
}

export const userFactory = {
  createUserFactory,
  userDataFactory
}
