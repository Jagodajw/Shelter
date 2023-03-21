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
import {
  PeopleCoreController,
  PeopleGettersController,
} from './controllers/people';
import SheltersController from './controllers/SheltersController';

const router = express.Router();

const authApi: Router = AuthController;
const sheltersApi: Router = SheltersController;

const animalsRoutes: Router[] = [
  AnimalsCoreController,
  AnimalsControlsController,
  AnimalsAdoptionController,
  AnimalsAvatarController,
  AnimalsRegistrationController,
];

const peopleRoutes: Router[] = [PeopleCoreController, PeopleGettersController];

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
router.use(sheltersApi);

animalsRoutes.forEach((route) => router.use(route));
peopleRoutes.forEach((route) => router.use(route));
dictionaryRoutes.forEach((route) => router.use(route));

export default router;
