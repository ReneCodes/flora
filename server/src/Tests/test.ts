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
    console.log('Plant to plant ==> ', plant1.plant_name)
    const res = await supertest(app).post('/garden')
      .send(plant1)

    expect(res.status).toStrictEqual(201);
    expect(res.body).toStrictEqual({ result: 'planted in Garden' });
  })

})
