import { prisma } from '..';
import { ShelterResponse } from '../models/ShelterModel';

export async function getShelters(): Promise<ShelterResponse[]> {
  return await prisma.shelters.findMany();
}

export async function getShelterImage(
  shelterId: string
): Promise<Buffer | null | undefined> {
  const response = await prisma.shelters.findUnique({
    where: { ID: shelterId },
    select: { img: true },
  });

  return response?.img;
}
