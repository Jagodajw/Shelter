import express from 'express';
import { authenticate } from '../middlewares/authentication';
import { shelterAuthenticate } from '../middlewares/shelterAuthentication';
import {
  getAllAnimalsByShelterId,
  getAnimalDataAdoption,
  getAnimalDataRegister,
  postAnimalDataRegister,
} from '../services/AnimalsService';

const router = express.Router();

router.use((req, res, next) => {
  // #swagger.tags = ['Animals']
  next();
});

//REQUEST - ep/endpoint
// req- ządanie z frontu
// Response res - odpowiedź z backu
router.get('/animals', authenticate, shelterAuthenticate, async (req, res) => {
  try {
    const shelters_id: string = req.headers['shelters_id'] as string;
    const animals = await getAllAnimalsByShelterId(shelters_id);

    res.status(200).json(animals);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get(
  '/animalDataRegister/:animalId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const animalId = req.params.animalId;
      const animalDataRegister = await getAnimalDataRegister(animalId);
      res.status(200).json(animalDataRegister);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

router.get(
  '/animalDataAdoption/:animalId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const animalId = req.params.animalId;
      const animalDataAdoption = await getAnimalDataAdoption(animalId);
      res.status(200).json(animalDataAdoption);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

router.post(
  '/animalRegistration/',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const registerAnimal = req.body.registerAnimal;
      const registerPeople = req.body.registerPeople;
      const register = req.body.register;
      const registrationAnimal = await postAnimalDataRegister(
        registerAnimal,
        registerPeople,
        register
      );
      res.json(registrationAnimal);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
);

export default router;
