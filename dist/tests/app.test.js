var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import supertest from 'supertest';
import dotenv from "dotenv";
dotenv.config();
import app from '../src/app.js';
import { prisma } from "../src/config/db.js";
import { createUserFactory, userDataFactory } from './factories/userFactory.js';
import { tokenFactory } from './factories/tokenFactory.js';
import { insertTest } from './factories/testFactory.js';
describe('register tests suite', function () {
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.$executeRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["TRUNCATE TABLE users, sessions;"], ["TRUNCATE TABLE users, sessions;"])))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('given email and password, should create user and return 201', function () { return __awaiter(void 0, void 0, void 0, function () {
        var body, response, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = createUserFactory();
                    return [4 /*yield*/, supertest(app).post('/sign-up').send(body)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, prisma.user.findUnique({
                            where: {
                                email: body.email
                            }
                        })];
                case 2:
                    user = _a.sent();
                    expect(response.status).toEqual(201);
                    expect(user).not.toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    it('given invalid data, should return 422', function () { return __awaiter(void 0, void 0, void 0, function () {
        var body, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = {};
                    return [4 /*yield*/, supertest(app).post('/sign-up').send(body)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(422);
                    return [2 /*return*/];
            }
        });
    }); });
    it('given an already registered email should return 409', function () { return __awaiter(void 0, void 0, void 0, function () {
        var body, response, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = createUserFactory();
                    return [4 /*yield*/, supertest(app).post('/sign-up').send(body)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, supertest(app).post('/sign-up').send(body)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, prisma.user.findUnique({
                            where: {
                                email: body.email
                            }
                        })];
                case 3:
                    user = _a.sent();
                    expect(user).not.toBeNull();
                    expect(response.status).toEqual(409);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('login tests suite', function () {
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.$executeRaw(templateObject_2 || (templateObject_2 = __makeTemplateObject(["TRUNCATE TABLE users, sessions;"], ["TRUNCATE TABLE users, sessions;"])))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('given email and password, should return 200 and receive token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, email, password, response, token;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = createUserFactory(), email = _a.email, password = _a.password;
                    return [4 /*yield*/, userDataFactory(email, password)];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, supertest(app).post('/sign-in').send({ email: email, password: password })];
                case 2:
                    response = _b.sent();
                    token = response.body.token;
                    expect(response.status).toEqual(200);
                    expect(token).not.toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('tests tests suite', function () {
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.$executeRaw(templateObject_3 || (templateObject_3 = __makeTemplateObject(["TRUNCATE TABLE tests;"], ["TRUNCATE TABLE tests;"])))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return tests by discipline', function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tokenFactory()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, supertest(app).get('/tests/disciplines').set("Authorization", "Bearer ".concat(token))];
                case 2:
                    response = _a.sent();
                    expect(response.status).toEqual(200);
                    expect(response.body).not.toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return tests by teacher', function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tokenFactory()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, supertest(app).get('/tests/teachers').set("Authorization", "Bearer ".concat(token))];
                case 2:
                    response = _a.sent();
                    expect(response.status).toEqual(200);
                    expect(response.body).not.toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should create test and return 201', function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, body, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tokenFactory()];
                case 1:
                    token = _a.sent();
                    body = insertTest();
                    return [4 /*yield*/, supertest(app).post('/test').send(body).set("Authorization", "Bearer ".concat(token))];
                case 2:
                    response = _a.sent();
                    expect(response.status).toEqual(201);
                    return [2 /*return*/];
            }
        });
    }); });
});
afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
var templateObject_1, templateObject_2, templateObject_3;
