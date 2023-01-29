import { tableAnimals } from '@prisma/client';
import { prisma } from '..';
import { AnimalIdGenerator } from '../helpers/AnimalIdGenerator';
import { MissingDictionaryAdder } from '../helpers/MissingDictionaryAdder';
import {
  AnimalDetailResponse,
  AnimalStatus,
  RegisterAddAnimalRequest,
  RegisterAddAnimalResponse,
  RegisterAnimalResponse,
  RegisterEditAnimalRequest,
  RegisterPeopleResponse,
  RegistrationResponse
} from '../models/AnimalsModel';

export async function getAllAnimalsByShelterId(
  shelterId: string,
  animalStatus: AnimalStatus
): Promise<tableAnimals[]> {
  return await prisma.tableAnimals.findMany({
    where: { shelters_id: shelterId, adopted: animalStatus === 'adopted' },
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
  return await prisma.$transaction(async (tx) => {
    const register: RegistrationResponse | null = (await tx.registration.findUnique({
      where: {
        animals_id: animalId,
      },
      include: {
        type_of_acceptance: true,
        introduced_employees: true,
        accepted_employees: true
      }
    })) as RegistrationResponse | null;

    if (register === null)
      throw new Error('REGISTRATION_OF_ANIMAL_DOESNT_EXIST');

    const registerAnimal: RegisterAnimalResponse | null = (await tx.animals.findUnique({
      where: {
        ID: register.animals_id,
      },
      include: {
        species: true,
        breed: true,
        commune: true,
        area: true,
        color: true,
      }
    })) as RegisterAnimalResponse | null;

    const registerPeople: RegisterPeopleResponse | null = (await tx.people.findUnique({
      where: {
        ID: register.people_id,
      },
      include: {
        city: true,
        commune: true,
        province: true
      }
    })) as RegisterPeopleResponse | null  ;

    return { registerAnimal, registerPeople, register };
  });
}

export async function postAnimalDataRegister(
  shelterId: string,
  {
    registerAnimal: updateDataRegisterAnimal,
    registerPeople: updateDataRegisterPeople,
    register: updateDataRegistration,
  }: RegisterAddAnimalRequest
): Promise<RegisterAddAnimalResponse> {
  return await prisma.$transaction(async (tx) => {
    const dictionaryAdder = new MissingDictionaryAdder(tx);
    const speciesId = await dictionaryAdder.getDictonaryField(
      'species',
      updateDataRegisterAnimal.species,
      shelterId
    );
    console.log('spec id', speciesId);
    const generatedAnimalId = await AnimalIdGenerator.getGeneratedAnimalId(
      speciesId
    );
    const breedId = await dictionaryAdder.getDictonaryField(
      'breed',
      updateDataRegisterAnimal.breed,
      shelterId,
      { species_id: speciesId }
    );
    const animalCommuneId = await dictionaryAdder.getDictonaryField(
      'commune',
      updateDataRegisterAnimal.commune,
      shelterId
    );
    const areaId = await dictionaryAdder.getDictonaryField(
      'area',
      updateDataRegisterAnimal.area,
      shelterId
    );

    const colorId = await dictionaryAdder.getDictonaryField(
      'color',
      updateDataRegisterAnimal.color,
      shelterId
    );

    const registerAnimal = await tx.animals.create({
      data: {
        name: updateDataRegisterAnimal.name,
        species_id: speciesId,
        breed_id: breedId,
        id_number: generatedAnimalId,
        commune_id: animalCommuneId,
        area_id: areaId,
        color_id: colorId,
        size: updateDataRegisterAnimal.size,
        gender: updateDataRegisterAnimal.gender,
        nr_chip: updateDataRegisterAnimal.nr_chip,
        date_of_birth: updateDataRegisterAnimal.date_of_birth,
        description_animal: updateDataRegisterAnimal.description_animal,
        date_vaccination: updateDataRegisterAnimal.date_vaccination,
        vaccination: updateDataRegisterAnimal.vaccination,
        sterilization: updateDataRegistration.sterilization,
        date_sterilization: updateDataRegistration.date_sterilization,
        shelters_id: shelterId,
      },
    });

    const cityId = await dictionaryAdder.getDictonaryField(
      'city',
      updateDataRegisterPeople.city,
      shelterId,
      { zip_code: updateDataRegisterPeople.zip_code }
    );

    const peopleCommuneId = await dictionaryAdder.getDictonaryField(
      'commune',
      updateDataRegisterPeople.commune,
      shelterId
    );

    const registerPeople = await tx.people.create({
      data: {
        type_of_person: updateDataRegisterPeople.type_of_person,
        name: updateDataRegisterPeople.name,
        id_number: updateDataRegisterPeople.id_number,
        pesel: updateDataRegisterPeople.pesel,
        nip: updateDataRegisterPeople.nip,
        email: updateDataRegisterPeople.email,
        telephone: updateDataRegisterPeople.telephone,
        adress: updateDataRegisterPeople.adress,
        city_id: cityId,
        province_id: updateDataRegisterPeople.province_id,
        commune_id: peopleCommuneId,
        description: updateDataRegisterPeople.description,
        shelters_id: shelterId,
      },
    });

    const typeOfAcceptanceId = await dictionaryAdder.getDictonaryField(
      'type_of_acceptance',
      updateDataRegistration.type_of_acceptance,
      shelterId
    );

    const register = await tx.registration.create({
      data: {
        date_of_registration: updateDataRegistration.date_of_registration,
        quarantine: updateDataRegistration.quarantine,
        accepted_employees_id: updateDataRegistration.accepted_employees_id,
        introduced_employees_id: updateDataRegistration.introduced_employees_id,
        decription_registration: updateDataRegistration.decription_registration,
        type_of_acceptance_id: typeOfAcceptanceId,
        animals_id: registerAnimal.ID,
        people_id: registerPeople.ID,
        shelters_id: shelterId,
      },
    });

    return { registerAnimal, registerPeople, register };
  });
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

export async function updateAnimalDataRegister(
  shelterId: string,
  {
    registerAnimal: updateDataRegisterAnimal,
    registerPeople: updateDataRegisterPeople,
    register: updateDataRegistration,
  }: RegisterEditAnimalRequest
): Promise<RegisterAddAnimalResponse> {
  return await prisma.$transaction(async (tx) => {
    const dictionaryAdder = new MissingDictionaryAdder(tx);
    const speciesId = await dictionaryAdder.getDictonaryField(
      'species',
      updateDataRegisterAnimal.species,
      shelterId
    );
    console.log('spec id', speciesId);
    const generatedAnimalId = await AnimalIdGenerator.getGeneratedAnimalId(
      speciesId
    );
    const breedId = await dictionaryAdder.getDictonaryField(
      'breed',
      updateDataRegisterAnimal.species,
      shelterId,
      { species_id: speciesId }
    );
    const animalCommuneId = await dictionaryAdder.getDictonaryField(
      'commune',
      updateDataRegisterAnimal.commune,
      shelterId
    );
    const areaId = await dictionaryAdder.getDictonaryField(
      'area',
      updateDataRegisterAnimal.area,
      shelterId
    );

    const colorId = await dictionaryAdder.getDictonaryField(
      'color',
      updateDataRegisterAnimal.color,
      shelterId
    );

    const registerAnimal = await tx.animals.update({
      where: { ID: updateDataRegisterAnimal.ID },
      data: {
        name: updateDataRegisterAnimal.name,
        species_id: speciesId,
        breed_id: breedId,
        id_number: generatedAnimalId,
        commune_id: animalCommuneId,
        area_id: areaId,
        color_id: colorId,
        size: updateDataRegisterAnimal.size,
        gender: updateDataRegisterAnimal.gender,
        nr_chip: updateDataRegisterAnimal.nr_chip,
        date_of_birth: updateDataRegisterAnimal.date_of_birth,
        description_animal: updateDataRegisterAnimal.description_animal,
        date_vaccination: updateDataRegisterAnimal.date_vaccination,
        vaccination: updateDataRegisterAnimal.vaccination,
        sterilization: updateDataRegistration.sterilization,
        date_sterilization: updateDataRegistration.date_sterilization,
        shelters_id: shelterId,
      },
    });

    const cityId = await dictionaryAdder.getDictonaryField(
      'city',
      updateDataRegisterPeople.city,
      shelterId,
      { zip_code: updateDataRegisterPeople.zip_code }
    );

    const peopleCommuneId = await dictionaryAdder.getDictonaryField(
      'commune',
      updateDataRegisterPeople.commune,
      shelterId
    );

    const registerPeople = await tx.people.update({
      where: { ID: updateDataRegisterPeople.ID },
      data: {
        type_of_person: updateDataRegisterPeople.type_of_person,
        name: updateDataRegisterPeople.name,
        id_number: updateDataRegisterPeople.id_number,
        pesel: updateDataRegisterPeople.pesel,
        nip: updateDataRegisterPeople.nip,
        email: updateDataRegisterPeople.email,
        telephone: updateDataRegisterPeople.telephone,
        adress: updateDataRegisterPeople.adress,
        city_id: cityId,
        province_id: updateDataRegisterPeople.province_id,
        commune_id: peopleCommuneId,
        description: updateDataRegisterPeople.description,
        shelters_id: shelterId,
      },
    });

    const typeOfAcceptanceId = await dictionaryAdder.getDictonaryField(
      'type_of_acceptance',
      updateDataRegistration.type_of_acceptance,
      shelterId
    );

    const register = await tx.registration.update({
      where: { ID: updateDataRegistration.ID },
      data: {
        date_of_registration: updateDataRegistration.date_of_registration,
        quarantine: updateDataRegistration.quarantine,
        accepted_employees_id: updateDataRegistration.accepted_employees_id,
        introduced_employees_id: updateDataRegistration.introduced_employees_id,
        decription_registration: updateDataRegistration.decription_registration,
        type_of_acceptance_id: typeOfAcceptanceId,
        animals_id: registerAnimal.ID,
        people_id: registerPeople.ID,
        shelters_id: shelterId,
      },
    });

    return { registerAnimal, registerPeople, register };
  });
}
