import express from 'express';
import { PeopleGettersService } from '../../services/people/PeopleGettersService';
import { middlewares } from '../../utils/middlewares';
import { prismaErrorHandler } from '../../utils/prisma-error-handler';
import { RegisterPeopleResponse } from '../../views/AnimalsView';
import { PeopleResponse, PeopleStatus } from '../../views/PeopleView';

const router = express.Router();

router.use((req, res, next) => {
  // #swagger.tags = ['People Getters']
  next();
});

router.get('/people', ...middlewares, async (req, res) => {
  try {
    const shelters_id: string = req.headers['shelters_id'] as string;
    const status: PeopleStatus = req.query.status as PeopleStatus;
    const areBlockedUsers: boolean = req.query.areBlockedUsers === 'true';

    const people: PeopleResponse[] = await PeopleGettersService.getList(
      shelters_id,
      status,
      areBlockedUsers
    );
    res.json(people as PeopleResponse[]);
  } catch (error) {
    const { status, code } = prismaErrorHandler(error);
    res.status(status).json(code);
  }
});

router.get('/person/:personId', ...middlewares, async (req, res) => {
  try {
    const personId: number = Number.parseInt(req.params.personId);
    const personData: RegisterPeopleResponse | null =
      await PeopleGettersService.getById(personId);
    console.log(personData);
    if (personData === null) throw new Error('PERSON_DOESNT_EXISTS');

    res.send(personData);
  } catch (error) {
    const { status, code } = prismaErrorHandler(error);
    res.status(status).json(code);
  }
});

export { router as PeopleGettersController };
