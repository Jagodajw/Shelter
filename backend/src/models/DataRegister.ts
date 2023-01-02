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

export class People {
  constructor(
    public type_of_person: Type_of_person,
    public name: string,
    public id_number: string,
    public pesel: string,
    public nip: string,
    public telephone: string,
    public email: string,
    public adress: string,
    public city_id: number,
    public province_id: number,
    public commune_id: number,
    public description: string,
    public shelters_id: string,
    public black_list?: boolean
  ) {}
}

export class Registration {
  constructor(
    public animals_id: string,
    public people_id: number,
    public date_of_registration: Date,
    public quarantine: Date,
    public introduced_employees_id: number,
    public accepted_employees_id: number,
    public decription_registration: string,
    public type_of_acceptance: string,
    public shelters_id: string
  ) {}
}
