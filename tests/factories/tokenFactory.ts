import jwt from "jsonwebtoken";

import { createUserFactory, userDataFactory } from "./userFactory.js";

export async function tokenFactory() {
  const { email, password } = createUserFactory();

  const createdUser = await userDataFactory(email, password);

  return jwt.sign({ userId: createdUser.id }, process.env.JWT_SECRET);
}