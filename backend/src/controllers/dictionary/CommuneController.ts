import { Prisma } from '@prisma/client';
import express from 'express';
import { authenticate } from '../../middlewares/authentication';
import { shelterAuthenticate } from '../../middlewares/shelterAuthentication';
import { CommuneService } from '../../services/dictionary/CommuneService';
import { CommuneResponse } from '../../views/DictionaryView';

const router = express.Router();

router.use((req, res, next) => {
  // #swagger.tags = ['Dictonary Commune']
  next();
});

router.get('/commune', authenticate, shelterAuthenticate, async (req, res) => {
  try {
    const shelterId: string = req.headers['shelters_id'] as string;

    const dictionaryCommune = await CommuneService.getList(shelterId);
    res.json(dictionaryCommune as CommuneResponse[]);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.delete(
  '/commune/:communeId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const communeId = req.params.communeId;
      const convertCommuneId = parseInt(communeId);
      const dictionaryCommuneDelete = await CommuneService.delete(
        convertCommuneId
      );
      res.json(dictionaryCommuneDelete);
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
  '/settingsCommuneId/:communeId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const updatedCommune = req.body.commune;
      const communeId = req.params.communeId;

      const convertCommuneId = parseInt(communeId);
      const dictionaryCommuneIdUpdate = await CommuneService.update(
        convertCommuneId,
        updatedCommune
      );
      res.json(dictionaryCommuneIdUpdate);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
);

router.post('/commune', authenticate, shelterAuthenticate, async (req, res) => {
  try {
    const shelterId: string = req.headers['shelters_id'] as string;
    const commune: string = req.body.commune;
    const dictionaryAddCommune = await CommuneService.add(
      { commune },
      shelterId
    );
    res.json(dictionaryAddCommune as CommuneResponse);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export { router as CommuneController };
