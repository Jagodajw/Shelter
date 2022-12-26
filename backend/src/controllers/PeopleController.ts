import express from 'express';
import { authenticate } from '../middlewares/authentication';
import {
  getAllPeople,
  getanimalsOfPeopleGivingBack,
  getPeopleById,
} from '../services/PeopleService';

const router = express.Router();

//REQUEST - ep/endpoint
// req- ządanie z frontu
// Response res - odpowiedź z backu
router.get('/people', authenticate, async (req, res) => {
  try {
    const people = await getAllPeople();
    res.json(people);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get(
  '/animalsOfPeopleGivingBack/:peopleId',
  authenticate,
  async (req, res) => {
    try {
      const peopleId = req.params.peopleId;

      const convertPeopleId = parseInt(peopleId);

      const animalsOfPeopleGivingBack = await getanimalsOfPeopleGivingBack(
        convertPeopleId
      );
      res.json(animalsOfPeopleGivingBack);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

router.get('/peopleById/:peopleId', authenticate, async (req, res) => {
  try {
    const peopleId = req.params.peopleId;
    const convertPeopleId = parseInt(peopleId);
    const peopleById = await getPeopleById(convertPeopleId);
    res.json(peopleById);
  } catch (error) {
    res.sendStatus(500);
  }
});
export default router;
