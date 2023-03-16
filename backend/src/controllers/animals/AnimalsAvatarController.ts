import express from 'express';
import multer from 'multer';
import { authenticate } from '../../middlewares/authentication';
import { shelterAuthenticate } from '../../middlewares/shelterAuthentication';
import { AnimalsAvatarService } from '../../services/animals/AnimalsAvatarService';

const router = express.Router();

router.use((req, res, next) => {
  // #swagger.tags = ['Animals avatar']
  next();
});

router.get(
  '/animalAvatar/:animalId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const animalId: string = req.params.animalId;
      const avatar = await AnimalsAvatarService.get(animalId);

      res.send(avatar);
    } catch (error: any) {
      console.log(error);
      res.status(500).json(error.message ? { ERROR_CODE: error.message } : {});
    }
  }
);

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.put(
  '/animalAvatar/:animalId',
  authenticate,
  shelterAuthenticate,
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

export { router as AnimalsAvatarController };
