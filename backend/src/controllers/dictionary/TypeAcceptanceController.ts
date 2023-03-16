import { Prisma } from '@prisma/client';
import express from 'express';
import { authenticate } from '../../middlewares/authentication';
import { shelterAuthenticate } from '../../middlewares/shelterAuthentication';
import { TypeAcceptanceService } from '../../services/dictionary/TypeAcceptanceService';
import { TypeAcceptanceResponse } from '../../views/DictionaryView';

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
  '/typeAcceptance/:typeAcceptanceId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const updatedTypeAcceptance = req.body.type_acceptance;
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
      const typeAcceptance: string = req.body.type_acceptance;
      const dictionaryTypeAcceptanceUpdate = await TypeAcceptanceService.add(
        { type_acceptance: typeAcceptance },
        shelterId
      );
      res.json(dictionaryTypeAcceptanceUpdate as TypeAcceptanceResponse);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

export { router as TypeAcceptanceController };
