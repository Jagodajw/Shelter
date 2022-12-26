import express from 'express';
import { authenticate } from '../middlewares/authentication';
import {
  getAllAnimals,
  getAnimalDataAdoption,
  getAnimalDataRegister,
  postAnimalDataRegister,
} from '../services/AnimalsService';

const router = express.Router();

//REQUEST - ep/endpoint
// req- ządanie z frontu
// Response res - odpowiedź z backu
router.get('/animals', authenticate, async (req, res) => {
  try {
    const animals = await getAllAnimals();
    res.json(animals);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get('/animalDataRegister/:animalId', authenticate, async (req, res) => {
  try {
    const animalId = req.params.animalId;
    const animalDataRegister = await getAnimalDataRegister(animalId);
    res.json(animalDataRegister);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get('/animalDataAdoption/:animalId', authenticate, async (req, res) => {
  try {
    const animalId = req.params.animalId;
    const animalDataAdoption = await getAnimalDataAdoption(animalId);
    res.json(animalDataAdoption);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post('/animalRegistration/', authenticate, async (req, res) => {
  try {
    const registerAnimal = req.body.registerAnimal;
    const registerPeople = req.body.registerPeople;
    const register = req.body.register;
    const registrationAnimal = await postAnimalDataRegister(
      registerAnimal,
      registerPeople,
      register
    );
    res.json(registrationAnimal);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;
