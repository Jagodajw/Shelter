import { Gender, tableAnimals } from '@prisma/client';
import { prisma } from '..';
import { AnimalIdGenerator } from '../helpers/AnimalIdGenerator';
import { MissingDictionaryAdder } from '../helpers/MissingDictionaryAdder';
import {
  AdoptDataByAnimalIdResponse,
  AdoptionResponse,
  AnimalAdoptionRequest,
  AnimalData,
  AnimalDetailResponse,
  AnimalQuery,
  AnimalStatus,
  AnimalTableResponse,
  EditAnimalAdoptionRequest,
  RegisterAddAnimalRequest,
  RegisterAddAnimalResponse,
  RegisterAnimalResponse,
  RegisterEditAnimalRequest,
  RegisterPeopleResponse,
  RegisterPersonAddRequest,
  RegisterPersonEditRequest,
  RegistrationResponse,
} from '../models/AnimalsModel';

export async function getAllAnimalsByShelterId(
  shelterId: string,
  animalStatus: AnimalStatus
): Promise<AnimalTableResponse[]> {
  const response = await prisma.animals.findMany({
    where: {
      shelters_id: shelterId,
      adopted: animalStatus === 'adopted',
      archived: false,
    },
    select: {
      ID: true,
      name: true,
      species: { select: { species: true } },
      breed: { select: { breed: true } },
      gender: true,
      commune: { select: { commune: true } },
      area: { select: { area: true } },
      id_number: true,
      nr_chip: true,
      shelters_id: true,
      adopted: true,
    },
  });

  return await response.map((response) => ({
    ...response,
    species: response.species?.species ?? '',
    breed: response.breed?.breed ?? '',
    commune: response.commune?.commune ?? '',
    area: response.area?.area ?? '',
  }));
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
    const register: RegistrationResponse | null =
      (await tx.registration.findUnique({
        where: {
          animals_id: animalId,
        },
        include: {
          type_of_acceptance: true,
          introduced_employees: true,
          accepted_employees: true,
        },
      })) as RegistrationResponse | null;

    if (register === null)
      throw new Error('REGISTRATION_OF_ANIMAL_DOESNT_EXIST');

    const registerAnimal: RegisterAnimalResponse | null =
      (await tx.animals.findUnique({
        where: {
          ID: register.animals_id,
        },
        include: {
          species: true,
          breed: true,
          commune: true,
          area: true,
          color: true,
        },
      })) as RegisterAnimalResponse | null;

    const registerPeople: RegisterPeopleResponse | null =
      (await tx.people.findUnique({
        where: {
          ID: register.people_id,
        },
        include: {
          city: true,
          commune: true,
          province: true,
        },
      })) as RegisterPeopleResponse | null;

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

    const registerAnimal = await tx.animals.update({
      where: { ID: updateDataRegisterAnimal.ID },
      data: {
        name: updateDataRegisterAnimal.name,
        species_id: speciesId,
        breed_id: breedId,
        id_number: updateDataRegisterAnimal.id_number,
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
        province_id: updateDataRegisterPeople.province_id,
        description: updateDataRegisterPeople.description,
        city_id: cityId,
        commune_id: peopleCommuneId,
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

export async function adoptAnimal(
  animalId: string,
  sheltersId: string,
  adoptionRequest: AnimalAdoptionRequest,
  personRequest: RegisterPersonAddRequest
): Promise<AdoptionResponse> {
  return await prisma.$transaction(async (tx) => {
    const dictionaryAdder = new MissingDictionaryAdder(tx);

    const cityId = await dictionaryAdder.getDictonaryField(
      'city',
      personRequest.city,
      sheltersId,
      { zip_code: personRequest.zip_code }
    );

    const communeId = await dictionaryAdder.getDictonaryField(
      'commune',
      personRequest.commune,
      sheltersId
    );

    const personRespnse = await tx.people.create({
      data: {
        type_of_person: personRequest.type_of_person,
        name: personRequest.name,
        id_number: personRequest.id_number,
        pesel: personRequest.pesel,
        nip: personRequest.nip,
        email: personRequest.email,
        telephone: personRequest.telephone,
        adress: personRequest.adress,
        province_id: personRequest.province_id,
        description: personRequest.description,
        shelters_id: sheltersId,
        city_id: cityId,
        commune_id: communeId,
      },
    });

    const typeAdoptionId = await dictionaryAdder.getDictonaryField(
      'type_adoption',
      adoptionRequest.type_adoption,
      sheltersId
    );

    const adoptionResponse = await tx.adoption.create({
      data: {
        date_of_adoption: adoptionRequest.date_of_adoption,
        description: adoptionRequest.description,
        introduced_employees_id: adoptionRequest.introduced_employees_id,
        accepted_employees_id: adoptionRequest.accepted_employees_id,
        type_adoption_id: typeAdoptionId,
        animals_id: animalId,
        shelters_id: sheltersId,
        people_id: personRespnse.ID,
      },
    });

    await tx.animals.update({
      where: { ID: animalId },
      data: { adopted: true },
    });

    return adoptionResponse;
  });
}

export async function updateAnimalAdoption(
  sheltersId: string,
  adoptionRequest: EditAnimalAdoptionRequest,
  personRequest: RegisterPersonEditRequest
): Promise<AdoptionResponse> {
  return await prisma.$transaction(async (tx) => {
    const dictionaryAdder = new MissingDictionaryAdder(tx);

    const cityId = await dictionaryAdder.getDictonaryField(
      'city',
      personRequest.city,
      sheltersId,
      { zip_code: personRequest.zip_code }
    );

    const communeId = await dictionaryAdder.getDictonaryField(
      'commune',
      personRequest.commune,
      sheltersId
    );

    const personRespnse = await tx.people.update({
      where: { ID: adoptionRequest.ID },
      data: {
        type_of_person: personRequest.type_of_person,
        name: personRequest.name,
        id_number: personRequest.id_number,
        pesel: personRequest.pesel,
        nip: personRequest.nip,
        email: personRequest.email,
        telephone: personRequest.telephone,
        adress: personRequest.adress,
        province_id: personRequest.province_id,
        description: personRequest.description,
        shelters_id: sheltersId,
        city_id: cityId,
        commune_id: communeId,
      },
    });

    const typeAdoptionId = await dictionaryAdder.getDictonaryField(
      'type_adoption',
      adoptionRequest.type_adoption,
      sheltersId
    );

    const adoptionResponse = await tx.adoption.update({
      where: { ID: personRequest.ID },
      data: {
        date_of_adoption: adoptionRequest.date_of_adoption,
        description: adoptionRequest.description,
        introduced_employees_id: adoptionRequest.introduced_employees_id,
        accepted_employees_id: adoptionRequest.accepted_employees_id,
        type_adoption_id: typeAdoptionId,
        animals_id: adoptionRequest.animals_id,
        shelters_id: sheltersId,
        people_id: personRespnse.ID,
      },
    });

    return adoptionResponse;
  });
}

export async function getAdoptDataByAnimalId(
  animalId: string
): Promise<AdoptDataByAnimalIdResponse> {
  return await prisma.$transaction(async (tx) => {
    const dataPetOut = await tx.adoption.findUnique({
      where: { animals_id: animalId },
      include: {
        typeAdoption: true,
        introduced_employees: true,
        accepted_employees: true,
      },
    });

    if (dataPetOut === null) throw new Error('ADOPTION_OF_ANIMAL_DOESNT_EXIST');

    const dataPersonTakeAway = await tx.people.findUnique({
      where: { ID: dataPetOut.people_id },
      include: {
        city: true,
        commune: true,
        province: true,
      },
    });

    if (dataPersonTakeAway === null) throw new Error('PERSON_DOESNT_EXIST');

    return { dataPetOut, dataPersonTakeAway };
  });
}

export async function getAllAnimalsByQuery(
  query: AnimalQuery,
  animalStatus: AnimalStatus
): Promise<AnimalTableResponse[]> {
  const findResponse2 = await prisma.registration.findMany({
    where: {
      AND: [
        {
          animals: {
            AND: [
              {
                species_id: query.species_id,
                breed_id: query.breed_id,
                commune_id: query.commune_id,
                area_id: query.area_id,
                color_id: query.color_id,
                gender: query.gender,
                size: query.size,
                sterilization: query.sterilization,
                adopted: animalStatus === 'adopted',
                vaccination: !query.unvaccinated,
              },
              {
                OR: [
                  { name: { contains: query.search } },
                  { nr_chip: { contains: query.search } },
                  { id_number: { contains: query.search } },
                ],
              },
              {
                date_of_birth:
                  query.datePickerBirthFromTo !== undefined
                    ? {
                        gte: query.datePickerBirthFromTo?.from,
                        lte: query.datePickerBirthFromTo?.to,
                      }
                    : undefined,
              },
            ],
            archived: false,
          },
        },
        {
          quarantine: query.cuarantine ? { gte: new Date() } : undefined,
          date_of_registration: query.datePickerAccepted
            ? {
                gte: query.datePickerAccepted?.from,
                lte: query.datePickerAccepted?.to,
              }
            : undefined,
        },
      ],
    },
    select: {
      animals: {
        select: {
          ID: true,
          name: true,
          species: { select: { species: true } },
          breed: { select: { breed: true } },
          gender: true,
          commune: { select: { commune: true } },
          area: { select: { area: true } },
          id_number: true,
          nr_chip: true,
          shelters_id: true,
          adopted: true,
          date_vaccination: true,
        },
      },
    },
  });

  return findResponse2.map(({ animals }) => ({
    ID: animals?.ID as string,
    name: animals?.name ?? '',
    species: animals?.species?.species ?? '',
    breed: animals?.breed?.breed ?? '',
    gender: animals?.gender ?? Gender.male,
    commune: animals?.commune?.commune ?? '',
    area: animals?.area?.area ?? '',
    id_number: animals?.id_number ?? '',
    nr_chip: animals?.nr_chip ?? '',
    shelters_id: animals?.shelters_id ?? '',
    adopted: animals?.adopted ?? false,
  }));

  // const findResponse = await prisma.animals.findMany({
  //   where: {
  //     AND: [
  //       {
  //         species_id: query.species_id,
  //         breed_id: query.breed_id,
  //         commune_id: query.commune_id,
  //         area_id: query.area_id,
  //         color_id: query.color_id,
  //         gender: query.gender,
  //         size: query.size,
  //         sterilization: query.sterilization,
  //         adopted: animalStatus === 'adopted',
  //       },
  //       {
  //         OR: [
  //           { name: { contains: query.search } },
  //           { nr_chip: { contains: query.search } },
  //           { id_number: { contains: query.search } },
  //         ],
  //       },
  //       {
  //         date_of_birth:
  //           query.datePickerBirthFromTo !== undefined
  //             ? {
  //                 gte: query.datePickerBirthFromTo?.from,
  //                 lte: query.datePickerBirthFromTo?.to,
  //               }
  //             : undefined,
  //       },
  //     ],
  //     archived: false,
  //   },
  //   select: {
  //     ID: true,
  //     name: true,
  //     species: { select: { species: true } },
  //     breed: { select: { breed: true } },
  //     gender: true,
  //     commune: { select: { commune: true } },
  //     area: { select: { area: true } },
  //     id_number: true,
  //     nr_chip: true,
  //     shelters_id: true,
  //     adopted: true,
  //   },
  // });

  // return findResponse.map((response) => ({
  //   ...response,
  //   species: response.species?.species ?? '',
  //   breed: response.breed?.breed ?? '',
  //   commune: response.commune?.commune ?? '',
  //   area: response.area?.area ?? '',
  // }));
}

export async function archiveAnimal(animalId: string): Promise<AnimalData> {
  return await prisma.animals.update({
    where: { ID: animalId },
    data: { archived: true },
  });
}

export async function getNumberOfAnimalsReleaseControl(): Promise<number> {
  const adoption = await prisma.adoption.findMany({
    where: { animals: { archived: false, adopted: true } },
  });

  return getAnimalsListToReleaseControl(adoption).length;
}

export async function getAnimalsToReleaseControl(shelterId: string) {
  const response = await prisma.adoption.findMany({
    where: {
      animals: {
        shelters_id: shelterId,
        adopted: true,
        archived: false,
      },
    },
    select: {
      date_of_adoption: true,
      animals: {
        select: {
          ID: true,
          name: true,
          species: { select: { species: true } },
          breed: { select: { breed: true } },
          gender: true,
          commune: { select: { commune: true } },
          area: { select: { area: true } },
          id_number: true,
          nr_chip: true,
          shelters_id: true,
          adopted: true,
          date_vaccination: true,
        },
      },
    },
  });

  return getAnimalsListToReleaseControl(response).map((response) => ({
    ...response.animals,
    species: response.animals?.species?.species ?? '',
    breed: response.animals?.breed?.breed ?? '',
    commune: response.animals?.commune?.commune ?? '',
    area: response.animals?.area?.area ?? '',
  }));
}

function getAnimalsListToReleaseControl<
  TData extends { date_of_adoption: Date }
>(animals: TData[]): TData[] {
  return animals.filter(({ date_of_adoption }) => {
    const adoptionAlertDateFrom: Date = new Date(date_of_adoption);
    adoptionAlertDateFrom.setFullYear(adoptionAlertDateFrom.getFullYear() + 1);

    const actualDateTime: number = new Date().getTime();
    const adoptionAlertDateFromTime: number = adoptionAlertDateFrom.getTime();

    return actualDateTime >= adoptionAlertDateFromTime;
  });
}

export async function getNumberOfAnimalsVaccinationChecks(
  shelterId: string
): Promise<number> {
  const animals = await prisma.animals.findMany({
    where: {
      vaccination: true,
      archived: false,
      adopted: false,
      shelters_id: shelterId,
    },
  });

  return getAnimalsListToVaccinationChecks(animals).length;
}

export async function getAnimalsToVaccinationChecks(
  shelterId: string
): Promise<AnimalTableResponse[]> {
  const response = await prisma.animals.findMany({
    where: {
      shelters_id: shelterId,
      adopted: false,
      archived: false,
      vaccination: true,
    },
    select: {
      ID: true,
      name: true,
      species: { select: { species: true } },
      breed: { select: { breed: true } },
      gender: true,
      commune: { select: { commune: true } },
      area: { select: { area: true } },
      id_number: true,
      nr_chip: true,
      shelters_id: true,
      adopted: true,
      date_vaccination: true,
    },
  });

  return await getAnimalsListToVaccinationChecks(response).map((response) => ({
    ...response,
    species: response.species?.species ?? '',
    breed: response.breed?.breed ?? '',
    commune: response.commune?.commune ?? '',
    area: response.area?.area ?? '',
  }));
}

function getAnimalsListToVaccinationChecks<
  TData extends { date_vaccination: Date | null }
>(animals: TData[], alertBefore: number = 7): TData[] {
  return animals.filter(({ date_vaccination }: TData) => {
    const vaccinationAlertDateFrom: Date = new Date(date_vaccination as Date);
    vaccinationAlertDateFrom.setFullYear(
      vaccinationAlertDateFrom.getFullYear() + 1
    );
    vaccinationAlertDateFrom.setDate(
      vaccinationAlertDateFrom.getDate() - alertBefore
    );

    const actualDateTime: number = new Date().getTime();

    return actualDateTime >= vaccinationAlertDateFrom.getTime();
  });
}

export async function updateAnimalAvatar(animalId: string, avatar: any) {
  const response = await prisma.animals.update({
    where: { ID: animalId },
    data: { avatar },
    select: { avatar: true },
  });

  return response.avatar;
}

export async function getAnimalAvatar(
  animalId: string
): Promise<Buffer | null | undefined> {
  const response = await prisma.animals.findUnique({
    where: { ID: animalId },
    select: { avatar: true },
  });

  return response?.avatar;
}
