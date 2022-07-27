import supertest from 'supertest';
import dotenv from "dotenv";
dotenv.config();

import app from '../src/app.js';
import { prisma } from "../src/config/db.js";
import { createUserFactory, userDataFactory } from './factories/userFactory.js';
import { tokenFactory } from './factories/tokenFactory.js';

describe('register tests suite', () => {
    beforeEach(async () => {
        await prisma.$executeRaw`TRUNCATE TABLE users, sessions;`;
    });

    it('given email and password, should create user and return 201', async () => {
        const body = createUserFactory();

        const response = await supertest(app).post('/sign-up').send(body);              
        const user = await prisma.user.findUnique({
            where: {
                email: body.email
			}
		});
        
        expect(response.status).toEqual(201);
		expect(user).not.toBeNull();
    });

    it('given invalid data, should return 422', async () => {
        const body = {}

        const response = await supertest(app).post('/sign-up').send(body);       
        expect(response.status).toEqual(422);
    });

    it('given an already registered email should return 409', async () => {
        const body = createUserFactory();

        await supertest(app).post('/sign-up').send(body);
        const response = await supertest(app).post('/sign-up').send(body);
        const user = await prisma.user.findUnique({
			where: {
				email: body.email
			}
		});

		expect(user).not.toBeNull();
        expect(response.status).toEqual(409); 
    });

});

describe('login tests suite', () => {
    beforeEach(async () => {
        await prisma.$executeRaw`TRUNCATE TABLE users, sessions;`;
    });

    it('given email and password, should return 200 and receive token', async () => {
        const { email, password } = createUserFactory();
        await userDataFactory(email, password);

        const response = await supertest(app).post('/sign-in').send({email, password});

        const { token } = response.body;
        
        expect(response.status).toEqual(200);
        expect(token).not.toBeNull();

    });
})

describe('tests tests suite', () => {
    beforeEach(async () => {
        await prisma.$executeRaw`TRUNCATE TABLE tests;`;
    });

    it('should return tests by discipline', async () => {
        const token = await tokenFactory();

        const response = await supertest(app).get('/tests/disciplines').set("Authorization", `Bearer ${token}`);

        expect(response.status).toEqual(200);
        expect(response.body).not.toBeNull();
    });

    it('should return tests by teacher', async () => {
        const token = await tokenFactory();

        const response = await supertest(app).get('/tests/teachers').set("Authorization", `Bearer ${token}`);

        expect(response.status).toEqual(200)
        expect(response.body).not.toBeNull();
    });

    it('should create test and return 201', async () => {
        
    });
})

afterAll(async () => {
    await prisma.$disconnect();
});