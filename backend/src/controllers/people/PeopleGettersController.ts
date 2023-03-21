import express from 'express';
import { PeopleGettersService } from '../../services/people/PeopleGettersService';
import { middlewares } from '../../utils/middlewares';
import { PeopleResponse, PeopleStatus } from '../../views/PeopleView';

const router = express.Router();

router.use((req, res, next) => {
  // #swagger.tags = ['People Getters']
  next();
});

router.get(
  '/people/:status/:areBlockedUsers',
  ...middlewares,
  async (req, res) => {
    try {
      const shelters_id: string = req.headers['shelters_id'] as string;
      const status: PeopleStatus = req.params.status as PeopleStatus;
      const areBlockedUsers: boolean = req.params.areBlockedUsers === 'true';

      const people: PeopleResponse[] = await PeopleGettersService.getList(
        shelters_id,
        status,
        areBlockedUsers
      );
      res.json(people as PeopleResponse[]);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

export { router as PeopleGettersController };
