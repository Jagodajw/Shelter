import { Shelters } from '@prisma/client';

export type ShelterViewResponse = Omit<Shelters, 'img'> & {
  img: string | null;
};
