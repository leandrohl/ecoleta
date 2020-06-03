import express from 'express'; //a biblioteca é declarada

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

//index, show, create, update, delete
const routes = express.Router(); //agora o routes funciona como app
const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items',itemsController.index);

routes.post('/points', pointsController.create);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);


export default routes;