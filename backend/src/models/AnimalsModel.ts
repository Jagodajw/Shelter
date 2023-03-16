import {
  Gender as PrismaGender,
  Size as PrismaSize,
  Type_of_person as PrismaTypeOfPerson,
} from '@prisma/client';

export type Gender = PrismaGender;
export type Type_of_person = PrismaTypeOfPerson;
export type Size = PrismaSize;
