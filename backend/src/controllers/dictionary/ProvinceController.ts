import express from 'express';
import { authenticate } from '../../middlewares/authentication';
import { ProvinceService } from '../../services/dictionary/ProvinceService';

const router = express.Router();

router.use((req, res, next) => {
  // #swagger.tags = ['Dictonary Province']
  next();
});

router.get('/province', authenticate, async (req, res) => {
  try {
    const provinces = await ProvinceService.getList();
    res.json(provinces);
  } catch (error) {
    res.sendStatus(500);
  }
});

export { router as ProvinceController };
