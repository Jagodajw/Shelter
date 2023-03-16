import { prisma } from '../..';
import { AnimalIdGenerator } from '../../helpers/AnimalIdGenerator';
import { MissingDictionaryAdder } from '../../helpers/MissingDictionaryAdder';
import {
  AnimalDetailResponse,
  RegisterAddAnimalRequest,
  RegisterAddAnimalResponse,
  RegisterAnimalResponse,
  RegisterEditAnimalRequest,
  RegisterPeopleResponse,
  RegistrationResponse,
} from '../../views/AnimalsView';

export class AnimalsRegistrationService {
  constructor() {}

  public static async get(animalId: string): Promise<AnimalDetailResponse> {
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

  public static async add(
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
          introduced_employees_id:
            updateDataRegistration.introduced_employees_id,
          decription_registration:
            updateDataRegistration.decription_registration,
          type_of_acceptance_id: typeOfAcceptanceId,
          animals_id: registerAnimal.ID,
          people_id: registerPeople.ID,
          shelters_id: shelterId,
        },
      });

      return { registerAnimal, registerPeople, register };
    });
  }

  public static async update(
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
          introduced_employees_id:
            updateDataRegistration.introduced_employees_id,
          decription_registration:
            updateDataRegistration.decription_registration,
          type_of_acceptance_id: typeOfAcceptanceId,
          animals_id: registerAnimal.ID,
          people_id: registerPeople.ID,
          shelters_id: shelterId,
        },
      });

      return { registerAnimal, registerPeople, register };
    });
  }

  public static isAuthorized(
    shelterId: string,
    { register, registerAnimal, registerPeople }: RegisterAddAnimalResponse
  ): boolean {
    return (
      shelterId === register.shelters_id &&
      shelterId === registerAnimal.shelters_id &&
      shelterId === registerPeople.shelters_id
    );
  }
}
