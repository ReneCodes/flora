import {describe, expect, test} from '@jest/globals';
import { Mocks }  from './Mocks';
const supertest = require('supertest');
import Plant from '../model/Plant.model';
const app = require('../app')
import mongoose from 'mongoose'

beforeAll(done => done());
afterAll(async () => {
  await mongoose.connection.close()
})
describe("Integration backend tests", () => {

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
  })

  it('should save a plant to the database', async (): Promise<void> => {
    const res = await supertest(app).post('/garden').send(Mocks.plant1)

    expect(res.status).toStrictEqual(201);
    expect(res.body).toStrictEqual({ result: 'planted in Garden' });
  })
  
  it('should fetch plants from the database', async (): Promise<void> => {
    await supertest(app).post('/garden').send(Mocks.plant1)
    await supertest(app).post('/garden').send(Mocks.plant2)
    await supertest(app).post('/garden').send(Mocks.plant3)
    
    const res = await supertest(app).get("/garden");
    
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(3);
    expect(res.body[0].plant_name).toBe("Phlebodium aureum");
    expect(res.body[1].plant_name).toBe("Oxalis triangularis");
    expect(res.body[2].plant_name).toBe("Dracaena trifasciata");
  })
  
  it('should delete a plant from the database', async (): Promise<void> => {
    await supertest(app).post('/garden').send(Mocks.plant1)
    const res1 = await supertest(app).get("/garden");
    const res2 = await supertest(app).delete("/garden").send(res1.body[0]._id)
    const res3 = await supertest(app).get("/garden");

    expect(res1.body.length).toBe(1);
    expect(res2.status).toBe(200);
    expect(res2.body).toStrictEqual({ result: `Plant ${res1.body[0]._id} Removed` });
    expect(res3.body.length).toBe(0);
  })
  
  it('should update a plant in the database', async (): Promise<void> => {
    const personal_name:string = "hot pocket"
    const note:string = "pure deliciousness"

    await supertest(app).post('/garden').send(Mocks.plant1)
    const res1 = await supertest(app).get("/garden");
    const res2 = await supertest(app).put("/garden").send({_id:res1.body[0]._id, personal_name:personal_name, note: note })
    console.log("res2: ",res2.body);

    expect(res2.status).toBe(201);
    expect(res2.body.result).toBe(`plant ${res1.body[0]._id} visited`);
    expect(res2.body.plant.personal_name).toBe(personal_name);
    expect(res2.body.plant.note).toBe(note);
  })

})
