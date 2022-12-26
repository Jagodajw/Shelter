import { Gender, Size, Type_of_person } from '@prisma/client';

export class Animals {
  constructor(
    public name: string,
    public species_id: number,
    public breed_id: number,
    public id_number: string,
    public commune_id: number,
    public area_id: number,
    public color_id: number,
    public size: Size,
    public gender: Gender,
    public nr_chip: string,
    public date_of_birth: Date,
    public description_animal: string,
    public date_vaccination: Date,
    public vaccination: boolean,
    public shelters_id: string,
    public sterilization: boolean,
    public date_sterilization: Date
  ) {}
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
