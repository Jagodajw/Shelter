import { prisma } from '../..';
import { AnimalTableResponse } from '../../views/AnimalsView';

export class AnimalsControlsService {
  constructor() {}

  public static async getNumberOfAnimalsVaccinationChecks(
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

    return this.getAnimalsListToVaccinationChecks(animals).length;
  }

  public static async getAnimalsToVaccinationChecks(
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
        species: true,
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

    return this.getAnimalsListToVaccinationChecks(response).map((response) => ({
      ...response,
      species: response.species?.species ?? '',
      species_object: response.species ?? null,
      breed: response.breed?.breed ?? '',
      commune: response.commune?.commune ?? '',
      area: response.area?.area ?? '',
    }));
  }

  private static getAnimalsListToVaccinationChecks<
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

  public static async getNumberOfAnimalsReleaseControl(
    shelterId: string
  ): Promise<number> {
    const adoption = await prisma.adoption.findMany({
      where: {
        animals: { archived: false, adopted: true, shelters_id: shelterId },
      },
    });

    return (await this.getAnimalsListToReleaseControl(adoption)).length;
  }

  public static async getAnimalsToReleaseControl(shelterId: string) {
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
            species: true,
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

    return (await this.getAnimalsListToReleaseControl(response)).map(
      (response: any) => ({
        ...response.animals,
        species: response.animals?.species?.species ?? '',
        species_object: response.species ?? null,
        breed: response.animals?.breed?.breed ?? '',
        commune: response.animals?.commune?.commune ?? '',
        area: response.animals?.area?.area ?? '',
      })
    );
  }

  private static async getAnimalsListToReleaseControl<
    TData extends { date_of_adoption: Date }
  >(animals: TData[]): Promise<TData[]> {
    return animals.filter(({ date_of_adoption }) => {
      const adoptionAlertDateFrom: Date = new Date(date_of_adoption);
      adoptionAlertDateFrom.setFullYear(
        adoptionAlertDateFrom.getFullYear() + 1
      );

      const actualDateTime: number = new Date().getTime();
      const adoptionAlertDateFromTime: number = adoptionAlertDateFrom.getTime();

      return actualDateTime >= adoptionAlertDateFromTime;
    });
  }
}
