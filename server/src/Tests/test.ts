import {describe, expect, test} from '@jest/globals';
import mongoose from 'mongoose';
import { Mocks }  from './Mocks';
const { DB_OWNER, DB_PASS, VAULT, TEST_DB_NAME, CLUSTER_EXT } = require('../config');

const express = require('express');
const router = require('../router');
const supertest = require('supertest');
import Plant from '../model/Plant.model';

describe("Integration tests", () => {

  const app = express();
  app.use(express.json());
  app.use(router);
  const request = supertest(app);

  beforeAll(async () => {
    const url = `mongodb+srv://${DB_OWNER}:${DB_PASS}@${VAULT}.${CLUSTER_EXT}.mongodb.net/${TEST_DB_NAME}`;
    await mongoose.disconnect();
    await mongoose.connect(url);
  });

  afterEach(async () => {
    await Plant.deleteMany();
  })

  it('should save a plant to the database', async (/*done*/) => {
    const plant1 = Mocks.plant1;
    const res = await request.post('/garden', )
      .send({plant1})

  })

})

//mental block here, and just not moving forward, so moving on to something else.

// describe('db get', () => {
//   test('should return all our plants', () => {
//     return getGarden().then(data => {
//       expect(data).toBe()
//     })
//   })
// })