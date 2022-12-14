import jwt, { Secret } from 'jsonwebtoken';
import express from 'express';
import { authenticate } from '../middlewares/authentication';
import { getAllAnimals } from '../services/AnimalsService';

const router = express.Router();

router.get('/animals', authenticate, async (req, res) => {
  try {
    const animals = await getAllAnimals();
    res.json(animals);
  } catch (error) {
    res.sendStatus(500);
  }
});

export default router;
