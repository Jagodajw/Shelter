import express from 'express';
import { authenticate } from '../middlewares/authentication';
import { getShelters } from '../services/SheltersService';

const router = express.Router();

router.use((req, res, next) => {
  // #swagger.tags = ['Shelter']
  next();
});

router.get('/shelters', authenticate, async (req, res) => {
  /* #swagger.responses[200] = {
            description: 'User successfully obtained.',
            schema: { $ref: '#/definitions/SheltersResponse' }
    } */
  try {
    const shelters = await getShelters();
    res.json(shelters);
  } catch (error) {
    res.sendStatus(500);
  }
});
export default router;
