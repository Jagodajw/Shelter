import express from 'express';
import { PeopleCoreSerivce } from '../../services/people/PeopleCoreService';
import { middlewares } from '../../utils/middlewares';
import { prismaErrorHandler } from '../../utils/prisma-error-handler';
import {
  PeopleRawResponse,
  RegisterPersonEditRequest,
} from '../../views/AnimalsView';

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

router.put('/person/:personId', ...middlewares, async (req, res) => {
  try {
    const personId: number = parseInt(req.params.personId);
    const sheltersId: string = req.headers['shelters_id'] as string;
    const personModel: RegisterPersonEditRequest = req.body;

    const responseModel: PeopleRawResponse = await PeopleCoreSerivce.update(
      personId,
      sheltersId,
      personModel
    );

    res.json(responseModel);
  } catch (error) {
    const { status, code } = prismaErrorHandler(error);
    res.status(status).json(code);
  }
});

export { router as PeopleCoreController };
