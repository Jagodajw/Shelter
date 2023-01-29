import {
  Adoption,
  Animals,
  Area,
  Breed,
  City,
  Color,
  Commune,
  Employees,
  Gender as PrismaGender,
  People,
  Province,
  Registration,
  Size as PrismaSize,
  Species,
  TypeAcceptance,
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

export type RegisterAnimalResponse = Animals & {
  commune: Commune | null;
  species: Species | null;
  breed: Breed | null;
  color: Color | null;
  area: Area | null;
};
export type RegisterPeopleResponse = People & {
  city: City | null;
  province: Province | null;
  commune: Commune | null;
};
export type RegistrationResponse = Registration & {
  type_of_acceptance: TypeAcceptance | null;
  introduced_employees: Employees | null;
  accepted_employees: Employees | null;
};

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

export type AnimalAdoptionRequest = Omit<
  Adoption,
  'ID' | 'type_adoption_id'
> & { type_adoption: TypeAcceptanceResponse };

export type AdoptionResponse = Adoption;
