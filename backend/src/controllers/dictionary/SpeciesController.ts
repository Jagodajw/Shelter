import express from 'express';
import { authenticate } from '../../middlewares/authentication';
import { shelterAuthenticate } from '../../middlewares/shelterAuthentication';
import { SpeciesService } from '../../services/dictionary/SpeciesService';
import { prismaErrorHandler } from '../../utils/prisma-error-handler';
import { SpeciesRequest, SpeciesResponse } from '../../views/DictionaryView';

const router = express.Router();

router.use((req, res, next) => {
  // #swagger.tags = ['Dictonary Species']
  next();
});

router.get('/species', authenticate, shelterAuthenticate, async (req, res) => {
  try {
    const shelterId: string = req.headers['shelters_id'] as string;

    const dictionarySpecies = await SpeciesService.getList(shelterId);
    res.json(dictionarySpecies as SpeciesResponse[]);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.delete(
  '/species/:speciesId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const speciesId = req.params.speciesId;
      const convertSpeciesId = parseInt(speciesId);
      const dictionarySpeciesDelete = await SpeciesService.delete(
        convertSpeciesId
      );
      res.json(dictionarySpeciesDelete);
    } catch (error) {
      const { status, code } = prismaErrorHandler(error);
      res.status(status).json(code);
    }
  }
);

router.put(
  '/species/:speciesId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const updatedSpecies: SpeciesRequest = req.body;
      const speciesId = req.params.speciesId;

      const convertSpeciesId = parseInt(speciesId);
      const dictionarySpeciesIdUpdate = await SpeciesService.update(
        convertSpeciesId,
        updatedSpecies
      );
      res.json(dictionarySpeciesIdUpdate);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

router.post('/species', authenticate, shelterAuthenticate, async (req, res) => {
  try {
    const shelterId: string = req.headers['shelters_id'] as string;
    const species: SpeciesRequest = req.body;
    const dictionaryAddSpeciesd = await SpeciesService.add(species, shelterId);
    res.json(dictionaryAddSpeciesd as SpeciesResponse);
  } catch (error) {
    res.sendStatus(500);
  }
});

export { router as SpeciesController };
