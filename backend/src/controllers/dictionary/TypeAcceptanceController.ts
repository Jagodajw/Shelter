import express from 'express';
import { authenticate } from '../../middlewares/authentication';
import { shelterAuthenticate } from '../../middlewares/shelterAuthentication';
import { TypeAcceptanceService } from '../../services/dictionary/TypeAcceptanceService';
import { prismaErrorHandler } from '../../utils/prisma-error-handler';
import {
  TypeAcceptanceRequest,
  TypeAcceptanceResponse,
} from '../../views/DictionaryView';

const router = express.Router();

router.use((req, res, next) => {
  // #swagger.tags = ['Dictonary TypeAcceptance']
  next();
});

router.get(
  '/typeAcceptance',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const shelterId: string = req.headers['shelters_id'] as string;

      const typeAcceptance = await TypeAcceptanceService.getList(shelterId);
      res.json(typeAcceptance as TypeAcceptanceResponse[]);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);

router.delete(
  '/typeAcceptance/:typeAcceptanceId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const typeAcceptanceId = req.params.typeAcceptanceId;
      const convertAcceptanceId = parseInt(typeAcceptanceId);
      const dictionaryTypeAcceptanceDelete = await TypeAcceptanceService.delete(
        convertAcceptanceId
      );
      res.json(dictionaryTypeAcceptanceDelete);
    } catch (error) {
      const { status, code } = prismaErrorHandler(error);
      res.status(status).json(code);
    }
  }
);

router.put(
  '/typeAcceptance/:typeAcceptanceId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const updatedTypeAcceptance: TypeAcceptanceRequest = req.body;
      const typeAdoptionId = req.params.typeAcceptanceId;

      const convertAcceptanceId = parseInt(typeAdoptionId);
      const dictionaryTypeAcceptanceUpdate = await TypeAcceptanceService.update(
        convertAcceptanceId,
        updatedTypeAcceptance
      );
      res.json(dictionaryTypeAcceptanceUpdate);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

router.post(
  '/typeAcceptance',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const shelterId: string = req.headers['shelters_id'] as string;
      const typeAcceptance: TypeAcceptanceRequest = req.body;
      const dictionaryTypeAcceptanceUpdate = await TypeAcceptanceService.add(
        typeAcceptance,
        shelterId
      );
      res.json(dictionaryTypeAcceptanceUpdate as TypeAcceptanceResponse);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

export { router as TypeAcceptanceController };
