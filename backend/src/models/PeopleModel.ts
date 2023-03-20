import { TypeOfPerson } from '../views/PeopleView';
import { AnimalModel } from './AnimalsModel';

export interface PersonTableModel {
  people: {
    ID: number;
    name: string;
    adress: string | null;
    pesel: string | null;
    telephone: string | null;
    email: string | null;
    description: string | null;
    black_list: boolean | null;
    type_of_person: TypeOfPerson | null;
    city: {
      city: string;
      zip_code: string;
    } | null;
    commune: {
      commune: string;
    } | null;
    province: {
      province: string;
    } | null;
  } | null;
  animals: AnimalModel | null;
}
