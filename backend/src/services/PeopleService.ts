import { prisma } from '..';

export async function getanimalsOfPeopleGivingBack(PeopleId: number) {
  const animalsOfPeopleGivingBack =
    await prisma.animalsOfPeopleGivingBack.findMany({
      where: {
        people_id: PeopleId,
      },
    });
  return { animalsOfPeopleGivingBack };
}

export async function getPeopleById(peopleId: number) {
  return await prisma.dataRegisterPeople.findUnique({
    where: {
      ID: peopleId,
    },
  });
}

// export async function update(peopleId:number) {
//   return await prisma.dataRegisterPeople.updateMany({
//     where: {
//       ID: peopleId,
//     },
//   });
// }
