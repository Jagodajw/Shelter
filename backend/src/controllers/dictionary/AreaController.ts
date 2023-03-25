import express from 'express';
import { authenticate } from '../../middlewares/authentication';
import { shelterAuthenticate } from '../../middlewares/shelterAuthentication';
import { AreaService } from '../../services/dictionary/AreaService';
import { prismaErrorHandler } from '../../utils/prisma-error-handler';
import { AreaRequest, AreaResponse } from '../../views/DictionaryView';

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
      const { status, code } = prismaErrorHandler(error);
      res.status(status).json(code);
    }
  }
);

router.put(
  '/area/:areaId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const updatedArea: AreaRequest = req.body;
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
    const area: AreaRequest = req.body;
    const dictionaryAddArea = await AreaService.add(area, shelterId);
    res.json(dictionaryAddArea as AreaResponse);
  } catch (error) {
    res.sendStatus(500);
  }
});

export { router as AreaController };
