import express from 'express';
import multer from 'multer';
import { AnimalsAvatarService } from '../../services/animals/AnimalsAvatarService';
import { middlewares } from '../../utils/middlewares';

const router = express.Router();

router.use((req, res, next) => {
  // #swagger.tags = ['Animals avatar']
  next();
});

router.get('/animalAvatar/:animalId', ...middlewares, async (req, res) => {
  try {
    const animalId: string = req.params.animalId;
    const avatar = await AnimalsAvatarService.get(animalId);

    res.send(avatar);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error.message ? { ERROR_CODE: error.message } : {});
  }
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.put(
  '/animalAvatar/:animalId',
  ...middlewares,
  upload.single('avatar'),
  async (req, res) => {
    try {
      req.file;
      const animalId: string = req.params.animalId;
      const avatar = req.file;

      const updatedAvatar = AnimalsAvatarService.update(
        animalId,
        avatar!.buffer
      );

      res.send(updatedAvatar);
    } catch (error: any) {
      console.log(error);
      res.status(500).json(error.message ? { ERROR_CODE: error.message } : {});
    }
  }
);

router.delete('/animalAvatar/:animalId', ...middlewares, async (req, res) => {
  try {
    const animalId: string = req.params.animalId;
    const deletedAnimalAvatarEntry = await AnimalsAvatarService.delete(
      animalId
    );
    res.send(deletedAnimalAvatarEntry);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error.message ? { ERROR_CODE: error.message } : {});
  }
});

export { router as AnimalsAvatarController };
