import express from 'express';
import { BreedService } from '../../services/dictionary/BreedService';
import { middlewares } from '../../utils/middlewares';
import { prismaErrorHandler } from '../../utils/prisma-error-handler';
import {
  BreedAddRequest,
  BreedListResponse,
  BreedResponse,
  BreedUpdateRequest,
} from '../../views/DictionaryView';

const router = express.Router();

router.use((req, res, next) => {
  // #swagger.tags = ['Dictonary Breed']
  next();
});

router.get('/breed', ...middlewares, async (req, res) => {
  try {
    const shelterId: string = req.headers['shelters_id'] as string;
    const dictionaryBreed = await BreedService.getList(shelterId);

    res.json(dictionaryBreed as BreedListResponse[]);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get('/breed/:speciesId', ...middlewares, async (req, res) => {
  try {
    const shelterId: string = req.headers['shelters_id'] as string;
    const speciesId: string = req.params.speciesId;
    const dictionaryBreed = await BreedService.getListBySpeciesId(
      shelterId,
      Number.parseInt(speciesId)
    );

    res.json(dictionaryBreed as BreedResponse[]);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.delete('/breed/:breedId', ...middlewares, async (req, res) => {
  try {
    const breedId = req.params.breedId;
    const convertBreedId = parseInt(breedId);
    const dictionaryBreedDelete = await BreedService.delete(convertBreedId);
    res.json(dictionaryBreedDelete);
  } catch (error) {
    const { status, code } = prismaErrorHandler(error);
    res.status(status).json(code);
  }
});

router.put('/breed/:breedId', ...middlewares, async (req, res) => {
  try {
    const updatedBreed: BreedUpdateRequest = req.body;
    const breedId = req.params.breedId;

    const convertBreedId = parseInt(breedId);
    const dictionaryBreedIdUpdate = await BreedService.update(
      convertBreedId,
      updatedBreed
    );
    res.json(dictionaryBreedIdUpdate);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post('/breed', ...middlewares, async (req, res) => {
  try {
    const shelterId: string = req.headers['shelters_id'] as string;
    const breedModel: BreedAddRequest = {
      breed: req.body.breed,
      species: req.body.species,
    };
    const dictionaryAddBreed = await BreedService.addWithSpecies(
      breedModel,
      shelterId
    );
    res.json(dictionaryAddBreed as BreedResponse);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export { router as BreedController };
