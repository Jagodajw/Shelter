import express from 'express';
import { authenticate } from '../middlewares/authentication';
import { getShelters } from '../services/SheltersService';

const router = express.Router();

router.get('/shelters', authenticate, async (req, res) => {
  try {
    const shelters = await getShelters();
    res.json(shelters);
  } catch (error) {
    res.sendStatus(500);
  }
});
export default router;
