import express from 'express';
import { authenticate } from '../../middlewares/authentication';
import { shelterAuthenticate } from '../../middlewares/shelterAuthentication';
import { AniamlsCoreSerivce } from '../../services/animals/AnimalsCoreService';
import { AnimalsRegistrationService } from '../../services/animals/AnimalsRegistrationService';
import {
  RegisterAddAnimalResponse,
  RegisterAnimalAddRequest,
  RegisterAnimalEditRequest,
  RegisterPersonAddRequest,
  RegisterPersonEditRequest,
  RegistrationAddRequest,
  RegistrationEditRequest,
} from '../../views/AnimalsView';

const router = express.Router();

router.use((req, res, next) => {
  // #swagger.tags = ['Animals registration']
  next();
});

router.get(
  '/animalDataRegister/:animalId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const animalId = req.params.animalId;

      const animalData = await AniamlsCoreSerivce.getById(animalId);
      if (animalData === null) throw new Error('ANIMAL_DOESNT_EXIST');

      const animalDataRegister = await AnimalsRegistrationService.get(animalId);
      res.status(200).json(animalDataRegister);
    } catch (error: any) {
      res.status(500).json(error.message ? { ERROR_CODE: error.message } : {});
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

      const registrationAnimal = await AnimalsRegistrationService.add(
        shelterId,
        {
          registerAnimal,
          registerPeople,
          register,
        }
      );
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
        !AnimalsRegistrationService.isAuthorized(
          shelterId,
          updatedAnimalRegistrationModel
        )
      ) {
        throw new Error('BAD_SHELTER_ID');
      }
      const registerAnimal = req.body
        .registerAnimal as RegisterAnimalEditRequest;
      const registerPeople = req.body
        .registerPeople as RegisterPersonEditRequest;
      const register = req.body.register as RegistrationEditRequest;
      const updateAnimalResponse: RegisterAddAnimalResponse =
        await AnimalsRegistrationService.update(shelterId, {
          registerAnimal,
          registerPeople,
          register,
        });

      res.json(updateAnimalResponse as RegisterAddAnimalResponse);
    } catch (error: any) {
      console.error(error);
      res.status(500).json(error.message ? { ERROR_CODE: error.message } : {});
    }
  }
);

export { router as AnimalsRegistrationController };
