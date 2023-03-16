import express from 'express';
import { authenticate } from '../../middlewares/authentication';
import { shelterAuthenticate } from '../../middlewares/shelterAuthentication';
import { AnimalsAdoptionService } from '../../services/animals/AnimalsAdoptionService';
import {
  AdoptDataByAnimalIdResponse,
  AdoptionResponse,
  AnimalAdoptionRequest,
  EditAnimalAdoptionRequest,
  RegisterPersonAddRequest,
  RegisterPersonEditRequest,
} from '../../views/AnimalsView';

const router = express.Router();

router.use((req, res, next) => {
  // #swagger.tags = ['Animals adoption']
  next();
});

router.post(
  '/adoptAnimal/:animalId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const animalId = req.params.animalId;
      const shelterId: string = req.headers['shelters_id'] as string;
      const adoptionRequest: AnimalAdoptionRequest = req.body.dataPetOut;
      const personRequest: RegisterPersonAddRequest =
        req.body.dataPersonTakeAway;

      const adoptAnimalResponse: AdoptionResponse =
        await AnimalsAdoptionService.adopt(
          animalId,
          shelterId,
          adoptionRequest,
          personRequest
        );
      res.status(200).json(adoptAnimalResponse);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);

router.put(
  '/adoptAnimal/:animalId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const animalId = req.params.animalId;
      const shelterId: string = req.headers['shelters_id'] as string;
      const adoptionRequest: EditAnimalAdoptionRequest = req.body.dataPetOut;
      const personRequest: RegisterPersonEditRequest =
        req.body.dataPersonTakeAway;

      const updateResponse = await AnimalsAdoptionService.update(
        animalId,
        shelterId,
        adoptionRequest,
        personRequest
      );

      res.status(200).json(updateResponse);
    } catch (error: any) {
      console.error(error);
      res.status(500).json(error.message ? { ERROR_CODE: error.message } : {});
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
        await AnimalsAdoptionService.getByAnimalId(animalId);

      res.status(200).json(adoptDataResponse);
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
      const animalDataAdoption = await AnimalsAdoptionService.get(animalId);
      res.status(200).json(animalDataAdoption);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

export { router as AnimalsAdoptionController };
