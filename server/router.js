const router = require('express').Router();
const controller = require('./controller/index.controller');

// TEST Routes
router.get('/', (req, res) => {
	res.status(200).send({text: 'Welcome to my Garden'});
});
router.post('/', (req, res) => {
	res.status(200).send({text: "I've received POST", ...req.body});
});
router.put('/', (req, res) => {
	res.status(200).send({text: 'You want to PUT', ...req.body});
});
router.delete('/', (req, res) => {
	res.status(200).send({text: 'DELETE this', ...req.body});
});

router.post('/identify', controller.identifyPlant);
router.get('/garden', controller.getGarden);
router.post('/garden', controller.savePlantToGarden);
router.put('/garden', controller.updatePlant);
router.delete('/garden', controller.removePlant);

module.exports = router;
