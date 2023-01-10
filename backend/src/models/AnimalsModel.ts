import {
  Animals,
  dataRegisterAnimal,
  dataRegisterPeople,
  dataRegistration,
  Gender as PrismaGender,
  People,
  Registration,
  Size as PrismaSize,
  Type_of_person as PrismaTypeOfPerson,
} from '@prisma/client';

export interface AnimalTableResponse {
  ID: string;
  name: string;
  species: string;
  breed: string;
  gender: Gender;
  commune: string;
  area: string;
  id_number: string;
  nr_chip: string;
  shelters_id: string;
}

export type Gender = PrismaGender;

export interface AnimalDetailResponse {
  registerAnimal: RegisterAnimalResponse | null;
  registerPeople: RegisterPeopleResponse | null;
  register: RegistrationResponse | null;
}

export type RegisterAnimalResponse = dataRegisterAnimal;
export type RegisterPeopleResponse = dataRegisterPeople;
export type RegistrationResponse = dataRegistration;

export type Type_of_person = PrismaTypeOfPerson;
export type Size = PrismaSize;

export interface RegisterAddAnimalResponse {
  registerAnimal: Animals;
  registerPeople: People;
  register: Registration;
}

export interface RegisterAddAnimalRequest {
  registerAnimal: RegisterAnimalAddRequest;
  registerPeople: RegisterPersonAddRequest;
  register: RegistrationAddRequest;
}

export type RegisterAnimalAddRequest = Omit<Animals, 'ID' | 'shelters_id'>;

export type RegisterPersonAddRequest = Omit<People, 'ID' | 'shelters_id'>;

export type RegistrationAddRequest = Omit<Registration, 'ID' | 'shelters_id'>;
