import express from 'express';
import { PeopleCoreSerivce } from '../../services/people/PeopleCoreService';
import { middlewares } from '../../utils/middlewares';

const router = express.Router();

router.use((req, res, next) => {
  // #swagger.tags = ['People Core']
  next();
});

router.get(
  '/people/:personId/:blockState',
  ...middlewares,
  async (req, res) => {
    try {
      const personId: number = parseInt(req.params.personId);
      const blockState: boolean = req.params.blockState === 'true';
      const changedState = await PeopleCoreSerivce.toggleBlacklistState(
        blockState,
        personId
      );
      res.json(changedState as boolean);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

export { router as PeopleCoreController };
