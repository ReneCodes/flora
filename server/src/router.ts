import { Router, Request, Response } from 'express';

const router: Router = Router();

const controller = require('./controller/index.controller');

// TEST Routes
router.get('/', (req: Request, res: Response) => {
	res.status(200).send({ text: 'Welcome to my Garden' });
});

router.post('/identify', controller.identifyPlant);
router.get('/garden', controller.getGarden);
router.post('/garden', controller.savePlantToGarden);
router.put('/garden', controller.updatePlant);
router.delete('/garden', controller.removePlant);

module.exports = router;
