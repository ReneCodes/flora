import {describe, expect, test} from '@jest/globals';
import { Mocks }  from './Mocks';
const supertest = require('supertest');
import Plant from '../model/Plant.model';
const app = require('../app')

describe("Integration tests", () => {

  afterEach(async () => {
    //I have removed every other db reference from this file because it should,
    //in theory, not talk to the db, but I think I need this one???
    await Plant.deleteMany();
  })

  it('should save a plant to the database', async (): Promise<void> => {
    const plant1 = Mocks.plant1;
    const res = await supertest(app).post('/garden')
      .send(plant1)

    expect(res.status).toStrictEqual(201);
    expect(res.body).toStrictEqual({ result: 'planted in Garden' });
  })

  it('should fetch plants from the database', async (): Promise<void> => {
    await supertest(app).post('/garden').send(Mocks.plant1)
    await supertest(app).post('/garden').send(Mocks.plant2)
    await supertest(app).post('/garden').send(Mocks.plant3)
    
    const res = await supertest(app).get("/garden");
    console.log("res.body: ", res.body);
    expect(res.status).toStrictEqual(200);
    expect(res.body.length).toBe(3);
    expect(res.body[0].plant_name).toBe("Phlebodium aureum");
    expect(res.body[1].plant_name).toBe("Oxalis triangularis");
    expect(res.body[2].plant_name).toBe("Dracaena trifasciata");
  })

})
