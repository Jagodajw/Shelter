import express from 'express';
import { authenticate } from '../middlewares/authentication';
import { ShelterResponse } from '../models/ShelterModel';
import { getShelterImage, getShelters } from '../services/SheltersService';

const router = express.Router();

router.use((req, res, next) => {
  // #swagger.tags = ['Shelter']
  next();
});

router.get('/shelters', authenticate, async (req, res) => {
  try {
    const shelters = await getShelters();
    res.json(shelters as ShelterResponse[]);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get('/shelterImage/:shelterId', authenticate, async (req, res) => {
  try {
    const shelterId: string = req.params.shelterId;
    const image = await getShelterImage(shelterId);

    res.send(image);
  } catch (error) {
    res.sendStatus(500);
  }
});

export default router;
