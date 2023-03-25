import express from 'express';
import { authenticate } from '../../middlewares/authentication';
import { shelterAuthenticate } from '../../middlewares/shelterAuthentication';
import { TypeAdoptionService } from '../../services/dictionary/TypeAdoptionService';
import { prismaErrorHandler } from '../../utils/prisma-error-handler';
import {
  TypeAdoptionRequest,
  TypeAdoptionResponse,
} from '../../views/DictionaryView';

const router = express.Router();

router.use((req, res, next) => {
  // #swagger.tags = ['Dictonary TypeAdoption']
  next();
});

router.get(
  '/typeAdoption',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const shelterId: string = req.headers['shelters_id'] as string;

      const dictionaryTypeAdoption = await TypeAdoptionService.getList(
        shelterId
      );
      res.json(dictionaryTypeAdoption as TypeAdoptionResponse[]);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

router.delete(
  '/typeAdoption/:typeAdoptionId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const typeAdoptionId = req.params.typeAdoptionId;
      const convertAdoptionId = parseInt(typeAdoptionId);
      const dictionaryTypeAdoptionDelete = await TypeAdoptionService.delete(
        convertAdoptionId
      );
      res.json(dictionaryTypeAdoptionDelete);
    } catch (error) {
      const { status, code } = prismaErrorHandler(error);
      res.status(status).json(code);
    }
  }
);

router.put(
  '/typeAdoption/:typeAdoptionId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const updatedTypeAdoption: TypeAdoptionRequest = req.body;
      const typeAdoptionId = req.params.typeAdoptionId;

      const convertAdoptionId = parseInt(typeAdoptionId);
      const dictionaryTypeAdoptionUpdate = await TypeAdoptionService.update(
        convertAdoptionId,
        updatedTypeAdoption
      );
      res.json(dictionaryTypeAdoptionUpdate);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

router.post(
  '/typeAdoption',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const shelterId: string = req.headers['shelters_id'] as string;
      const typeAdoption: TypeAdoptionRequest = req.body;
      const dictionaryTypeAdoptionUpdate = await TypeAdoptionService.add(
        typeAdoption,
        shelterId
      );
      res.json(dictionaryTypeAdoptionUpdate as TypeAdoptionResponse);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

export { router as TypeAdoptionController };
