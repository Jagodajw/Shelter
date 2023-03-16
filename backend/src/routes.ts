import express, { Router } from 'express';
import {
  AnimalsAdoptionController,
  AnimalsAvatarController,
  AnimalsControlsController,
  AnimalsRegistrationController,
} from './controllers/animals';
import AnimalsCoreController from './controllers/AnimalsCoreController';
import AuthController from './controllers/AuthController';
import {
  AreaController,
  BreedController,
  CityController,
  ColorController,
  CommuneController,
  EmployeeController,
  ProvinceController,
  SpeciesController,
  TypeAcceptanceController,
  TypeAdoptionController,
} from './controllers/dictionary';
import PeopleController from './controllers/PeopleController';
import SheltersController from './controllers/SheltersController';

const router = express.Router();

const authApi: Router = AuthController;
const peopleApi: Router = PeopleController;
const sheltersApi: Router = SheltersController;

const animalsRoutes: Router[] = [
  AnimalsCoreController,
  AnimalsControlsController,
  AnimalsAdoptionController,
  AnimalsAvatarController,
  AnimalsRegistrationController,
];

const dictionaryRoutes: Router[] = [
  CityController,
  EmployeeController,
  AreaController,
  CommuneController,
  SpeciesController,
  BreedController,
  ColorController,
  TypeAdoptionController,
  ProvinceController,
  TypeAcceptanceController,
];

router.use(authApi);
router.use(peopleApi);
router.use(sheltersApi);

animalsRoutes.forEach((route) => router.use(route));
dictionaryRoutes.forEach((route) => router.use(route));

export default router;
