import { Prisma } from '@prisma/client';
import express from 'express';
import { authenticate } from '../../middlewares/authentication';
import { shelterAuthenticate } from '../../middlewares/shelterAuthentication';
import { CityService } from '../../services/dictionary/CityService';
import { CityRequest, CityResponse } from '../../views/DictionaryView';

const router = express.Router();

router.use((req, res, next) => {
  // #swagger.tags = ['Dictonary City']
  next();
});

router.get('/cities', authenticate, shelterAuthenticate, async (req, res) => {
  try {
    const shelterId: string = req.headers['shelters_id'] as string;

    const dictionaryCity = await CityService.getList(shelterId);
    res.json(dictionaryCity as CityResponse[]);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post('/city', authenticate, shelterAuthenticate, async (req, res) => {
  try {
    const shelters_id: string = req.headers['shelters_id'] as string;
    const cityModel: CityRequest = {
      city: req.body.city,
      zip_code: req.body.zip_code,
    };
    const newCity = await CityService.add(cityModel, shelters_id);
    res.json(newCity as CityResponse);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.put(
  '/settingsCityId/:cityId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const cityId = req.params.cityId;
      const updateCityModel = {
        city: req.body.city,
        zip_code: req.body.zip_code,
      } as CityRequest;
      const convertCityId = parseInt(cityId);
      const dictionaryCityIdUpdate = await CityService.update(
        convertCityId,
        updateCityModel
      );
      res.json(dictionaryCityIdUpdate);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

router.delete(
  '/settingsCity/:cityId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const cityId = req.params.cityId;
      const convertCityId = parseInt(cityId);
      const dictionaryCityDelete = await CityService.delete(convertCityId);
      res.json(dictionaryCityDelete);
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

export { router as CityController };
