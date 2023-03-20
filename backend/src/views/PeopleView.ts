import { People, Type_of_person } from '@prisma/client';
import { AnimalTableResponse } from './AnimalsView';

export type PeopleStatus = 'moving' | 'receiving';

export type TypeOfPerson = Type_of_person;

export type PeopleResponse = Pick<
  People,
  | 'ID'
  | 'name'
  | 'adress'
  | 'pesel'
  | 'telephone'
  | 'email'
  | 'description'
  | 'black_list'
> & {
  type_of_person: TypeOfPerson | null;
  surname: string;
  city: string | null;
  zip_code: string | null;
  commune: string | null;
  province: string | null;
  animals: AnimalTableResponse[];
};
