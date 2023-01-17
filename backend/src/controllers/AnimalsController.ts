import express from 'express';
import { authenticate } from '../middlewares/authentication';
import { shelterAuthenticate } from '../middlewares/shelterAuthentication';
import {
  RegisterAddAnimalResponse,
  RegisterAnimalAddRequest,
  RegisterPersonAddRequest,
  RegistrationAddRequest,
} from '../models/AnimalsModel';
import {
  getAllAnimalsByShelterId,
  getAnimalById,
  getAnimalDataAdoption,
  getAnimalDataRegister,
  isAuthorizedShelterInUpdatedAnimalModel,
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

      const animalData = await getAnimalById(animalId);
      if (animalData === null) throw new Error('ANIMAL_DOESNT_EXIST');

      const animalDataRegister = await getAnimalDataRegister(animalId);
      res.status(200).json(animalDataRegister);
    } catch (error: any) {
      res.status(500).json(error.message ? { ERROR_CODE: error.message } : {});
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
  '/animalRegistration',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const shelterId: string = req.headers['shelters_id'] as string;
      const registerAnimal = req.body
        .registerAnimal as RegisterAnimalAddRequest;
      const registerPeople = req.body
        .registerPeople as RegisterPersonAddRequest;
      const register = req.body.register as RegistrationAddRequest;

      const registrationAnimal = await postAnimalDataRegister(shelterId, {
        registerAnimal,
        registerPeople,
        register,
      });
      res.json(registrationAnimal as RegisterAddAnimalResponse);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
);

router.put(
  '/animalRegistration',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const shelterId: string = req.headers['shelters_id'] as string;
      const updatedAnimalRegistrationModel: RegisterAddAnimalResponse =
        req.body;

      if (
        !isAuthorizedShelterInUpdatedAnimalModel(
          shelterId,
          updatedAnimalRegistrationModel
        )
      ) {
        throw new Error();
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
);

export default router;
