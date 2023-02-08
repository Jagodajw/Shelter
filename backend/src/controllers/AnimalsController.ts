import express from 'express';
import { authenticate } from '../middlewares/authentication';
import { shelterAuthenticate } from '../middlewares/shelterAuthentication';
import {
  AdoptDataByAnimalIdResponse,
  AdoptionResponse,
  AnimalAdoptionRequest,
  AnimalQuery,
  AnimalStatus,
  AnimalTableResponse,
  RegisterAddAnimalResponse,
  RegisterAnimalAddRequest,
  RegisterAnimalEditRequest,
  RegisterPersonAddRequest,
  RegisterPersonEditRequest,
  RegistrationAddRequest,
  RegistrationEditRequest,
} from '../models/AnimalsModel';
import {
  adoptAnimal,
  archiveAnimal,
  getAdoptDataByAnimalId,
  getAllAnimalsByQuery,
  getAllAnimalsByShelterId,
  getAnimalById,
  getAnimalDataAdoption,
  getAnimalDataRegister,
  isAuthorizedShelterInUpdatedAnimalModel,
  postAnimalDataRegister,
  updateAnimalDataRegister,
} from '../services/AnimalsService';

const router = express.Router();

router.use((req, res, next) => {
  // #swagger.tags = ['Animals']
  next();
});

//REQUEST - ep/endpoint
// req- ządanie z frontu
// Response res - odpowiedź z backu
router.get(
  '/animals/:status',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const shelters_id: string = req.headers['shelters_id'] as string;
      const status: AnimalStatus = req.params.status as AnimalStatus;
      const animals = await getAllAnimalsByShelterId(shelters_id, status);

      res.status(200).json(animals);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);

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
  '/adoptAnimal/:animalId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const animalId = req.params.animalId;
      const shelterId: string = req.headers['shelters_id'] as string;
      const adoptionRequest: AnimalAdoptionRequest = req.body.dataPetOut;
      const personnRequest: RegisterPersonAddRequest =
        req.body.dataPersonTakeAway;

      const adoptAnimalResponse: AdoptionResponse = await adoptAnimal(
        animalId,
        shelterId,
        adoptionRequest,
        personnRequest
      );
      res.status(200).json(adoptAnimalResponse);
    } catch (error) {
      console.log(error);
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

router.get(
  '/adoptAnimal/:animalId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const animalId = req.params.animalId;
      const adoptDataResponse: AdoptDataByAnimalIdResponse =
        await getAdoptDataByAnimalId(animalId);

      res.status(200).json(adoptDataResponse);
    } catch (error: any) {
      res.status(500).json(error.message ? { ERROR_CODE: error.message } : {});
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
        throw new Error('BAD_SHELTER_ID');
      }
      const registerAnimal = req.body
        .registerAnimal as RegisterAnimalEditRequest;
      const registerPeople = req.body
        .registerPeople as RegisterPersonEditRequest;
      const register = req.body.register as RegistrationEditRequest;
      const updateAnimalResponse: RegisterAddAnimalResponse =
        await updateAnimalDataRegister(shelterId, {
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

router.post(
  '/animalsByQuery/:status',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const animalStatus: AnimalStatus = req.params.status as AnimalStatus;
      const query = req.body as AnimalQuery;
      const animalsByQueryResponse = await getAllAnimalsByQuery(
        query,
        animalStatus
      );

      res.status(200).json(animalsByQueryResponse as AnimalTableResponse[]);
    } catch (error: any) {
      console.log(error);
      res.status(500).json(error.message ? { ERROR_CODE: error.message } : {});
    }
  }
);

router.delete(
  '/animal/:animalId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const animalId: string = req.params.animalId;
      const response = await archiveAnimal(animalId);

      res.status(200).json(response);
    } catch (error: any) {
      console.log(error);
      res.status(500).json(error.message ? { ERROR_CODE: error.message } : {});
    }
  }
);

export default router;
