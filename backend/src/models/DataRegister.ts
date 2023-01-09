import { Gender, Size, Type_of_person } from '@prisma/client';

export interface Animals {
  name: string;
  species_id: number;
  breed_id: number;
  id_number: string;
  commune_id: number;
  area_id: number;
  color_id: number;
  size: Size;
  gender: Gender;
  nr_chip: string;
  date_of_birth: Date;
  description_animal: string;
  date_vaccination: Date;
  vaccination: boolean;
  shelters_id: string;
  sterilization: boolean;
  date_sterilization: Date;
}

export interface People {
  type_of_person: Type_of_person;
  name: string;
  id_number: string;
  pesel: string;
  nip?: string;
  email: string;
  telephone: string;
  adress: string;
  // maybe to delete shelter attribute in city table?
  city_id: number;
  province_id: number;
  commune_id: number;
  description: string;
  shelters_id: string;
  black_list?: boolean;
}

export interface Registration {
  animals_id: string;
  people_id: number;
  date_of_registration: Date;
  quarantine: Date;
  introduced_employees_id: number;
  accepted_employees_id: number;
  decription_registration: string;
  type_of_acceptance: string;
  shelters_id: string;
}
