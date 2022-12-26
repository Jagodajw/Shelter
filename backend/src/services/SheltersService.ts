import { prisma } from '..';

export async function getShelters() {
  return await prisma.shelters.findMany();
}
