import express from 'express';
import { authenticate } from '../../middlewares/authentication';
import { shelterAuthenticate } from '../../middlewares/shelterAuthentication';
import { AniamlsCoreSerivce } from '../../services/animals/AnimalsCoreService';
import {
  AnimalQuery,
  AnimalStatus,
  AnimalTableResponse,
} from '../../views/AnimalsView';

const router = express.Router();

router.use((req, res, next) => {
  // #swagger.tags = ['Animals Core']
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
      const animals = await AniamlsCoreSerivce.getAll(shelters_id, status);

      res.status(200).json(animals);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
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
      const animalsByQueryResponse = await AniamlsCoreSerivce.getAllByQuery(
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
      const response = await AniamlsCoreSerivce.archiveAnimal(animalId);

      res.status(200).json(response);
    } catch (error: any) {
      console.log(error);
      res.status(500).json(error.message ? { ERROR_CODE: error.message } : {});
    }
  }
);

export { router as AnimalsCoreController };
