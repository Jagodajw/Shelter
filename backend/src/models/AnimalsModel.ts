import {
  Gender as PrismaGender,
  Size as PrismaSize,
  Type_of_person as PrismaTypeOfPerson,
} from '@prisma/client';

export type Gender = PrismaGender;
export type Type_of_person = PrismaTypeOfPerson;
export type Size = PrismaSize;

export interface AnimalModel {
  ID: string;
  name: string;
  id_number: string;
  shelters_id: string;
  commune: {
    commune: string;
  } | null;
  area: {
    area: string;
  } | null;
  species: {
    species: string;
  } | null;
  breed: {
    breed: string;
  } | null;
  nr_chip: string;
  gender: Gender;
  adopted: boolean | null;
}
