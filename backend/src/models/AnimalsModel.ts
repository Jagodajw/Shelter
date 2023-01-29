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
import {
  AreaResponse,
  BreedResponse,
  CityResponse,
  ColorResponse,
  CommuneResponse,
  SpeciesResponse,
  TypeAcceptanceResponse,
} from './DictionaryModel';

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

export type RegisterAnimalAddRequest = Omit<
  Animals,
  | 'ID'
  | 'shelters_id'
  | 'id_number'
  | 'sterilization'
  | 'date_sterilization'
  | 'species_id'
  | 'breed_id'
  | 'commune_id'
  | 'area_id'
  | 'color_id'
> & {
  species: SpeciesResponse;
  breed: BreedResponse;
  commune: CommuneResponse;
  area: AreaResponse;
  color: ColorResponse;
};

export type RegisterPersonAddRequest = Omit<
  People,
  'ID' | 'shelters_id' | 'city_id' | 'commune_id'
> & {
  city: CityResponse;
  commune: CommuneResponse;
  zip_code: string;
};

export type RegistrationAddRequest = Omit<
  Registration,
  'ID' | 'shelters_id' | 'type_of_acceptance_id'
> & {
  sterilization: boolean;
  date_sterilization: Date;
  type_of_acceptance: TypeAcceptanceResponse;
};

export interface RegisterEditAnimalRequest {
  registerAnimal: RegisterAnimalEditRequest;
  registerPeople: RegisterPersonEditRequest;
  register: RegistrationEditRequest;
}

export type RegisterAnimalEditRequest = Omit<
  Animals,
  | 'id_number'
  | 'sterilization'
  | 'date_sterilization'
  | 'species_id'
  | 'breed_id'
  | 'commune_id'
  | 'area_id'
  | 'color_id'
> & {
  species: SpeciesResponse;
  breed: BreedResponse;
  commune: CommuneResponse;
  area: AreaResponse;
  color: ColorResponse;
};

export type RegisterPersonEditRequest = Omit<
  People,
  'city_id' | 'commune_id'
> & {
  city: CityResponse;
  commune: CommuneResponse;
  zip_code: string;
};

export type RegistrationEditRequest = Omit<
  Registration,
  'type_of_acceptance_id'
> & {
  sterilization: boolean;
  date_sterilization: Date;
  type_of_acceptance: TypeAcceptanceResponse;
};

export type AnimalStatus = 'adopted' | 'staying';
