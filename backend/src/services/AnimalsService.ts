import { prisma } from '..';

export async function getAllAnimals() {
  return await prisma.animals.findMany();
}
