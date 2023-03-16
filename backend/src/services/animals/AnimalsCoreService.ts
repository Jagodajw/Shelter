import { Gender, tableAnimals } from '@prisma/client';
import { prisma } from '../..';
import {
  AnimalData,
  AnimalQuery,
  AnimalStatus,
  AnimalTableResponse,
} from '../../views/AnimalsView';

export class AniamlsCoreSerivce {
  constructor() {}

  public static async getAll(
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

  public static async getById(animalId: string): Promise<tableAnimals | null> {
    return await prisma.tableAnimals.findUnique({ where: { ID: animalId } });
  }

  public static async getAllByQuery(
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

  public static async archiveAnimal(animalId: string): Promise<AnimalData> {
    return await prisma.animals.update({
      where: { ID: animalId },
      data: { archived: true },
    });
  }
}
