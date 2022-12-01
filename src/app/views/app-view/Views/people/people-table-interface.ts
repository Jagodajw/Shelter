import { PetsTableInterface } from "../pets/pets-table-interface";

export interface PeopleTableInterface {
    id: number;
    name: string;
    surname: string;
    adress: string;
    city: string;
    postCode: number;
    community: string;
    province: string;
    ID: string;
    pesel: string;
    telephone: number;
    email: string;
    description: string;
    blackList: boolean;
    typePerson: peopleType;
    pets: PetsTableInterface[];

    
  }

  export enum peopleType{
    naturalPerson,
    legalPerson,
    found
  }