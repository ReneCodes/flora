const router = require('express').Router();
const controller = require('./controller/index.controller');

router.get('/', (req, res) => {
	res.status(200).send('Welcome to my Garden');
});
router.post('/identify', controller.identifyPlant);
router.get('/garden', controller.getGarden);
router.post('/garden', controller.savePlantToGarden);
router.put('/garden/:id', controller.updatePlant);
router.delete('/garden/:id', controller.removePlant);

module.exports = router;
