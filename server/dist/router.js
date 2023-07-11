"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const controller = require('./controller/index.controller');
// TEST Routes
router.get('/', (req, res) => {
    res.status(200).send({ text: 'Welcome to my Garden' });
});
router.post('/identify', controller.identifyPlant);
router.get('/garden', controller.getGarden);
router.post('/garden', controller.savePlantToGarden);
router.put('/garden', controller.updatePlant);
router.delete('/garden', controller.removePlant);
module.exports = router;
