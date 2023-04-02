import { prisma } from '../..';
import { MissingDictionaryAdder } from '../../helpers/MissingDictionaryAdder';
import {
  AdoptDataByAnimalIdResponse,
  AdoptionResponse,
  AnimalAdoptionRequest,
  EditAnimalAdoptionRequest,
  RegisterPersonAddRequest,
  RegisterPersonEditRequest,
} from '../../views/AnimalsView';

export class AnimalsAdoptionService {
  constructor() {}

  public static async get(animalId: string) {
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

  public static async adopt(
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

  public static async update(
    animalId: string,
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
        where: { ID: personRequest.ID },
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
        where: { animals_id: animalId },
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

      return adoptionResponse;
    });
  }

  public static async getByAnimalId(
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

      if (dataPetOut === null)
        throw new Error('ADOPTION_OF_ANIMAL_DOESNT_EXIST');

      const dataPersonTakeAway = await tx.people.findUnique({
        where: { ID: dataPetOut.people_id },
        include: {
          city: true,
          commune: true,
          province: true,
        },
      });

      if (dataPersonTakeAway === null) throw new Error('PERSON_DOESNT_EXIST');

      return {
        dataPetOut: { ...dataPetOut, type_adoption: dataPetOut.typeAdoption },
        dataPersonTakeAway,
      };
    });
  }
}
