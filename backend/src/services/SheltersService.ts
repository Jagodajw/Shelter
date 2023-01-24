import { prisma } from '..';
import { ShelterResponse } from '../models/ShelterModel';

export async function getShelters(): Promise<ShelterResponse[]> {
  return await prisma.shelters.findMany();
}
