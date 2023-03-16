import { Prisma } from '@prisma/client';
import express from 'express';
import { authenticate } from '../../middlewares/authentication';
import { shelterAuthenticate } from '../../middlewares/shelterAuthentication';
import { BreedService } from '../../services/dictionary/BreedService';
import { BreedRequest, BreedResponse } from '../../views/DictionaryView';

const router = express.Router();

router.use((req, res, next) => {
  // #swagger.tags = ['Dictonary Breed']
  next();
});

router.get('/breed', authenticate, shelterAuthenticate, async (req, res) => {
  try {
    const shelterId: string = req.headers['shelters_id'] as string;
    const dictionaryBreed = await BreedService.getList(shelterId);

    res.json(dictionaryBreed as BreedResponse[]);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get(
  '/breed/:speciesId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
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
  }
);

router.delete(
  '/breed/:breedId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const breedId = req.params.breedId;
      const convertBreedId = parseInt(breedId);
      const dictionaryBreedDelete = await BreedService.delete(convertBreedId);
      res.json(dictionaryBreedDelete);
    } catch (error) {
      let errorStatus = 500;
      let errorCode = {};
      if (!(error instanceof Prisma.PrismaClientKnownRequestError)) return;
      if (error.code === 'P2003') {
        errorStatus = 406;
        errorCode = { ERROR_CODE: 'RESORCE_IN_USE' };
      }

      res.status(errorStatus).json(errorCode);
    }
  }
);

router.put(
  '/breed/:breedId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const updatedBreed = req.body.breed;
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
  }
);

router.post('/breed', authenticate, async (req, res) => {
  try {
    const shelterId: string = req.headers['shelters_id'] as string;
    const breedModel: BreedRequest = {
      breed: req.body.breed,
      species_id: req.body.species_id,
    };
    const dictionaryAddBreed = await BreedService.add(breedModel, shelterId);
    res.json(dictionaryAddBreed as BreedResponse);
  } catch (error) {
    res.sendStatus(500);
  }
});

export { router as BreedController };
