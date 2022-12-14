import express, { Router } from 'express';
import AuthController from './controllers/AuthController';
import PetsController from './controllers/AnimalsController';

const router = express.Router();

const authApi: Router = AuthController;
const petsApi: Router = PetsController;
router.use(authApi);
router.use(petsApi);

export default router;
