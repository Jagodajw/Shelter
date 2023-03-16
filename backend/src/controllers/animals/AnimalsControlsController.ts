import express from 'express';
import { authenticate } from '../../middlewares/authentication';
import { shelterAuthenticate } from '../../middlewares/shelterAuthentication';
import { AnimalsControlsService } from '../../services/animals/AnimalsControlsService';
import { AnimalTableResponse } from '../../views/AnimalsView';

const router = express.Router();

router.use((req, res, next) => {
  // #swagger.tags = ['Animals controls']
  next();
});

router.get(
  '/numberOfAnimalsVaccinationChecks',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const shelterId: string = req.headers['shelters_id'] as string;
      const response =
        await AnimalsControlsService.getNumberOfAnimalsVaccinationChecks(
          shelterId
        );

      res.status(200).json(response);
    } catch (error: any) {
      console.log(error);
      res.status(500).json(error.message ? { ERROR_CODE: error.message } : {});
    }
  }
);

router.get(
  '/getAnimalsToVaccinationChecks',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const shelterId: string = req.headers['shelters_id'] as string;
      const response: AnimalTableResponse[] =
        await AnimalsControlsService.getAnimalsToVaccinationChecks(shelterId);

      res.status(200).json(response);
    } catch (error: any) {
      console.log(error);
      res.status(500).json(error.message ? { ERROR_CODE: error.message } : {});
    }
  }
);

router.get(
  '/numberOfAnimalsReleaseControl',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const response =
        await AnimalsControlsService.getNumberOfAnimalsReleaseControl();

      res.status(200).json(response);
    } catch (error: any) {
      console.log(error);
      res.status(500).json(error.message ? { ERROR_CODE: error.message } : {});
    }
  }
);

router.get(
  '/getAnimalsToReleaseControl',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const shelterId: string = req.headers['shelters_id'] as string;
      const response = await AnimalsControlsService.getAnimalsToReleaseControl(
        shelterId
      );

      res.status(200).json(response);
    } catch (error: any) {
      console.log(error);
      res.status(500).json(error.message ? { ERROR_CODE: error.message } : {});
    }
  }
);

export { router as AnimalsControlsController };
