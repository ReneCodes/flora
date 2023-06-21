"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const Mocks_1 = require("./Mocks");
const supertest = require('supertest');
const app = require('../app');
const mongoose_1 = __importDefault(require("mongoose"));
beforeAll(done => done());
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
(0, globals_1.describe)("Integration backend tests", () => {
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connection.db.dropDatabase();
    }));
    it('should save a plant to the database', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield supertest(app).post('/garden').send(Mocks_1.Mocks.plant1);
        (0, globals_1.expect)(res.status).toStrictEqual(201);
        (0, globals_1.expect)(res.body.result).toBe('planted in Garden');
        (0, globals_1.expect)(res.body.plant.plant_name).toBe('Phlebodium aureum');
    }));
    it('should fetch plants from the database', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest(app).post('/garden').send(Mocks_1.Mocks.plant1);
        yield supertest(app).post('/garden').send(Mocks_1.Mocks.plant2);
        yield supertest(app).post('/garden').send(Mocks_1.Mocks.plant3);
        const res = yield supertest(app).get("/garden");
        (0, globals_1.expect)(res.status).toBe(200);
        (0, globals_1.expect)(res.body.length).toBe(3);
        (0, globals_1.expect)(res.body[0].plant_name).toBe("Phlebodium aureum");
        (0, globals_1.expect)(res.body[1].plant_name).toBe("Oxalis triangularis");
        (0, globals_1.expect)(res.body[2].plant_name).toBe("Dracaena trifasciata");
    }));
    it('should delete a plant from the database', () => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest(app).post('/garden').send(Mocks_1.Mocks.plant1);
        const res1 = yield supertest(app).get("/garden");
        const res2 = yield supertest(app).delete("/garden").send(res1.body[0]._id);
        const res3 = yield supertest(app).get("/garden");
        (0, globals_1.expect)(res1.body.length).toBe(1);
        (0, globals_1.expect)(res2.status).toBe(200);
        (0, globals_1.expect)(res2.body).toStrictEqual({ result: `Plant ${res1.body[0]._id} Removed` });
        (0, globals_1.expect)(res3.body.length).toBe(0);
    }));
    it('should update a plant in the database', () => __awaiter(void 0, void 0, void 0, function* () {
        const personal_name = "hot pocket";
        const note = "pure deliciousness";
        yield supertest(app).post('/garden').send(Mocks_1.Mocks.plant1);
        const res1 = yield supertest(app).get("/garden");
        const res2 = yield supertest(app).put("/garden").send({ _id: res1.body[0]._id, personal_name: personal_name, note: note });
        (0, globals_1.expect)(res2.status).toBe(201);
        (0, globals_1.expect)(res2.body.result).toBe(`plant ${res1.body[0]._id} visited`);
        (0, globals_1.expect)(res2.body.plant.personal_name).toBe(personal_name);
        (0, globals_1.expect)(res2.body.plant.note).toBe(note);
    }));
});
