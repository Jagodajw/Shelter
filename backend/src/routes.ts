import express, { Router } from 'express';
import PetsController from './controllers/AnimalsController';
import AuthController from './controllers/AuthController';
import DictionaryController from './controllers/DictionaryController';
import PeopleController from './controllers/PeopleController';
import SheltersController from './controllers/SheltersController';

const router = express.Router();

const authApi: Router = AuthController;
const petsApi: Router = PetsController;
const peopleApi: Router = PeopleController;
const DictionaryApi: Router = DictionaryController;
const sheltersApi: Router = SheltersController;

router.use(authApi);
router.use(petsApi);
router.use(peopleApi);
router.use(DictionaryApi);
router.use(sheltersApi);

export default router;
