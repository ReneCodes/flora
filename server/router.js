const router = require('express').Router();
const controller = require('./controller/index.controller');


router.post('/identify', controller.identifyPlant);
router.get('/garden', controller.getGarden);
router.post('/garden', controller.savePlantToGarden);
router.put('/garden', controller.updatePlant);
router.delete('/garden', controller.removePlant);

router.get('/', (req, res) => {
	res.status(200).send({text: 'Welcome to my Garden'});
});
module.exports = router;
