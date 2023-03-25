// import express from 'express';
// import { authenticate } from '../middlewares/authentication';
// import {
//   getanimalsOfPeopleGivingBack,
//   getPeopleById,
//   PeopleService,
// } from '../services/PeopleService';
// import { PeopleResponse, PeopleStatus } from '../views/PeopleView';

// const router = express.Router();

// router.use((req, res, next) => {
//   // #swagger.tags = ['People']
//   next();
// });

// router.get(
//   '/people/:status/:areBlockedUsers',
//   authenticate,
//   async (req, res) => {
//     try {
//       const shelters_id: string = req.headers['shelters_id'] as string;
//       const status: PeopleStatus = req.params.status as PeopleStatus;
//       const areBlockedUsers: boolean = req.params.areBlockedUsers === 'true';

//       const people: PeopleResponse[] = await PeopleService.getList(
//         shelters_id,
//         status,
//         areBlockedUsers
//       );
//       res.json(people as PeopleResponse[]);
//     } catch (error) {
//       res.sendStatus(500);
//     }
//   }
// );

// router.get(
//   '/animalsOfPeopleGivingBack/:peopleId',
//   authenticate,
//   async (req, res) => {
//     try {
//       const peopleId = req.params.peopleId;

//       const convertPeopleId = parseInt(peopleId);

//       const animalsOfPeopleGivingBack = await getanimalsOfPeopleGivingBack(
//         convertPeopleId
//       );
//       res.json(animalsOfPeopleGivingBack);
//     } catch (error) {
//       res.sendStatus(500);
//     }
//   }
// );

// router.get('/peopleById/:peopleId', authenticate, async (req, res) => {
//   try {
//     const peopleId = req.params.peopleId;
//     const convertPeopleId = parseInt(peopleId);
//     const peopleById = await getPeopleById(convertPeopleId);
//     res.json(peopleById);
//   } catch (error) {
//     res.sendStatus(500);
//   }
// });
// export default router;
