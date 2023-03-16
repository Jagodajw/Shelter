import { Prisma } from '@prisma/client';
import express from 'express';
import { authenticate } from '../../middlewares/authentication';
import { shelterAuthenticate } from '../../middlewares/shelterAuthentication';
import { AreaService } from '../../services/dictionary/AreaService';
import { AreaResponse } from '../../views/DictionaryView';

const router = express.Router();

router.use((req, res, next) => {
  // #swagger.tags = ['Dictonary Area']
  next();
});

router.get('/area', authenticate, shelterAuthenticate, async (req, res) => {
  try {
    const shelterId: string = req.headers['shelters_id'] as string;

    const dictionaryArea = await AreaService.getList(shelterId);
    res.json(dictionaryArea as AreaResponse[]);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.delete(
  '/area/:areaId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const areaId = req.params.areaId;
      const convertAreaId = parseInt(areaId);
      const dictionaryAreaDelete = await AreaService.delete(convertAreaId);
      res.json(dictionaryAreaDelete);
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
  '/area/:areaId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const updatedArea = req.body.area;
      const areaId = req.params.areaId;

      const convertAreaId = parseInt(areaId);
      const dictionaryAreaIdUpdate = await AreaService.update(
        convertAreaId,
        updatedArea
      );
      res.json(dictionaryAreaIdUpdate);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

router.post('/area', authenticate, shelterAuthenticate, async (req, res) => {
  try {
    const shelterId: string = req.headers['shelters_id'] as string;
    const area: string = req.body.area;
    const dictionaryAddArea = await AreaService.add({ area }, shelterId);
    res.json(dictionaryAddArea as AreaResponse);
  } catch (error) {
    res.sendStatus(500);
  }
});

export { router as AreaController };
