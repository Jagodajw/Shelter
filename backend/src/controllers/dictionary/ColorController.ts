import { Prisma } from '@prisma/client';
import express from 'express';
import { authenticate } from '../../middlewares/authentication';
import { shelterAuthenticate } from '../../middlewares/shelterAuthentication';
import { ColorService } from '../../services/dictionary/ColorService';
import { ColorResponse } from '../../views/DictionaryView';

const router = express.Router();

router.use((req, res, next) => {
  // #swagger.tags = ['Dictonary Color']
  next();
});

router.get('/colors', authenticate, shelterAuthenticate, async (req, res) => {
  try {
    const shelterId: string = req.headers['shelters_id'] as string;

    const dictionaryColor = await ColorService.getList(shelterId);
    res.json(dictionaryColor as ColorResponse[]);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.delete(
  '/color/:colorId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const colorId = req.params.colorId;
      const convertColorId = parseInt(colorId);
      const dictionaryColorDelete = await ColorService.delete(convertColorId);
      res.json(dictionaryColorDelete);
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
  '/settingsColorId/:colorId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const updatedColor = req.body.color;
      const colorId = req.params.colorId;

      const convertColorId = parseInt(colorId);
      const dictionaryColorIdUpdate = await ColorService.update(
        convertColorId,
        updatedColor
      );
      res.json(dictionaryColorIdUpdate);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

router.post('/color', authenticate, shelterAuthenticate, async (req, res) => {
  try {
    const shelterId: string = req.headers['shelters_id'] as string;
    const color: string = req.body.color;
    const dictionaryAddColor = await ColorService.add({ color }, shelterId);
    res.json(dictionaryAddColor as ColorResponse);
  } catch (error) {
    res.sendStatus(500);
  }
});

export { router as ColorController };
