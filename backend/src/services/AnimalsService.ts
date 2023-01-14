import {
  dataRegisterAnimal,
  dataRegisterPeople,
  dataRegistration,
  tableAnimals,
} from '@prisma/client';
import { prisma } from '..';
import {
  AnimalDetailResponse,
  RegisterAddAnimalRequest,
  RegisterAddAnimalResponse,
  RegisterAnimalAddRequest,
  RegisterAnimalResponse,
  RegisterPeopleResponse,
  RegistrationResponse,
} from '../models/AnimalsModel';

export async function getAllAnimalsByShelterId(
  shelterId: string
): Promise<tableAnimals[]> {
  return await prisma.tableAnimals.findMany({
    where: { shelters_id: shelterId },
  });
}

export async function getAnimalById(
  animalId: string
): Promise<tableAnimals | null> {
  return await prisma.tableAnimals.findUnique({ where: { ID: animalId } });
}

export async function getAnimalDataRegister(
  animalId: string
): Promise<AnimalDetailResponse> {
  const registerAnimal: dataRegisterAnimal | null =
    (await prisma.dataRegisterAnimal.findUnique({
      where: {
        animals_id: animalId,
      },
    })) as RegisterAnimalResponse | null;
  const registerPeople: dataRegisterPeople | null =
    (await prisma.dataRegisterPeople.findUnique({
      where: {
        animals_id: animalId,
      },
    })) as RegisterPeopleResponse | null;
  const register: dataRegistration | null =
    (await prisma.dataRegistration.findUnique({
      where: {
        animals_id: animalId,
      },
    })) as RegistrationResponse | null;

  return { registerAnimal, registerPeople, register };
}

export async function postAnimalDataRegister(
  shelterId: string,
  {
    registerAnimal: updateDataRegisterAnimal,
    registerPeople: updateDataRegisterPeople,
    register: updateDataRegistration,
  }: RegisterAddAnimalRequest
): Promise<RegisterAddAnimalResponse> {
  const registerAnimal = await prisma.animals.create({
    data: {
      name: updateDataRegisterAnimal.name,
      species_id: updateDataRegisterAnimal.species_id,
      breed_id: updateDataRegisterAnimal.breed_id,
      id_number: updateDataRegisterAnimal.id_number,
      commune_id: updateDataRegisterAnimal.commune_id,
      area_id: updateDataRegisterAnimal.area_id,
      color_id: updateDataRegisterAnimal.color_id,
      size: updateDataRegisterAnimal.size,
      gender: updateDataRegisterAnimal.gender,
      nr_chip: updateDataRegisterAnimal.nr_chip,
      date_of_birth: updateDataRegisterAnimal.date_of_birth,
      description_animal: updateDataRegisterAnimal.description_animal,
      date_vaccination: updateDataRegisterAnimal.date_vaccination,
      vaccination: updateDataRegisterAnimal.vaccination,
      sterilization: updateDataRegisterAnimal.sterilization,
      date_sterilization: updateDataRegisterAnimal.date_sterilization,
      shelters_id: shelterId,
    },
  });
  const registerPeople = await prisma.people.create({
    data: {
      type_of_person: updateDataRegisterPeople.type_of_person,
      name: updateDataRegisterPeople.name,
      id_number: updateDataRegisterPeople.id_number,
      pesel: updateDataRegisterPeople.pesel,
      nip: updateDataRegisterPeople.nip,
      email: updateDataRegisterPeople.email,
      telephone: updateDataRegisterPeople.telephone,
      adress: updateDataRegisterPeople.adress,
      city_id: updateDataRegisterPeople.city_id,
      province_id: updateDataRegisterPeople.province_id,
      commune_id: updateDataRegisterPeople.commune_id,
      description: updateDataRegisterPeople.description,
      shelters_id: shelterId,
    },
  });
  const register = await prisma.registration.create({
    data: {
      date_of_registration: updateDataRegistration.date_of_registration,
      quarantine: updateDataRegistration.quarantine,
      accepted_employees_id: updateDataRegistration.accepted_employees_id,
      introduced_employees_id: updateDataRegistration.introduced_employees_id,
      decription_registration: updateDataRegistration.decription_registration,
      type_of_acceptance: updateDataRegistration.type_of_acceptance,
      animals_id: registerAnimal.ID,
      people_id: registerPeople.ID,
      shelters_id: shelterId,
    },
  });

  return { register, registerPeople, registerAnimal };
}

export async function getAnimalDataAdoption(animalId: string) {
  const dataAdoptionAnimal = await prisma.dataAdoptionAnimal.findMany({
    where: {
      animals_id: animalId,
    },
  });
  const dataRegisterPeople = await prisma.dataRegisterPeople.findUnique({
    where: {
      animals_id: animalId,
    },
  });

  return { dataAdoptionAnimal, dataRegisterPeople };
}

export function isAuthorizedShelterInUpdatedAnimalModel(
  shelterId: string,
  { register, registerAnimal, registerPeople }: RegisterAddAnimalResponse
): boolean {
  return (
    shelterId === register.shelters_id &&
    shelterId === registerAnimal.shelters_id &&
    shelterId === registerPeople.shelters_id
  );
}

export function addNonExistentDictionaries({
  register,
  registerAnimal,
  registerPeople,
}: RegisterAddAnimalRequest): void {
  const registerAnimalDicionariesKeys: Array<keyof RegisterAnimalAddRequest> = [
    'area_id',
    'commune_id',
    'color_id',
    'species_id',
    'breed_id',
  ];
}
