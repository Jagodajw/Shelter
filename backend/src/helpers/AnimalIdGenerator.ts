import { prisma } from '..';

interface DateCreator {
  day: number;
  month: number;
  year: number;
}

export class AnimalIdGenerator {
  private static actualYear: number;
  constructor() {
    AnimalIdGenerator.actualYear = new Date().getFullYear();
  }

  public static async getGeneratedAnimalId(speciesId: number): Promise<string> {
    const speciesSign: string = await this.getSpeciesSign(speciesId);
    const numberOfPets: number = await this.getNumberOfPetsInActualYear(
      speciesId
    );
    const newNumberForPet: number = numberOfPets + 1;

    return `${speciesSign}/${newNumberForPet}/${this.actualYear}`;
  }

  private static async getNumberOfPetsInActualYear(
    speciesId: number
  ): Promise<number> {
    const { firstDate, lastDate } = this.getFirstAndLastDate();
    const {
      _count: { ID: numberOfPets },
    } = await prisma.registration.aggregate({
      _count: { ID: true },
      where: {
        date_of_registration: { gte: firstDate, lte: lastDate },
        animals: { species_id: speciesId },
      },
    });

    return numberOfPets;
  }

  private static getFirstAndLastDate(): {
    firstDate: Date;
    lastDate: Date;
  } {
    const firstDate = this.getDate({ day: 1, month: 1, year: this.actualYear });
    const lastDate = this.getDate({
      day: 31,
      month: 12,
      year: this.actualYear,
    });

    return { firstDate, lastDate };
  }

  private static getDate({ day, month, year }: DateCreator): Date {
    const date = new Date();
    date.setDate(day);
    date.setMonth(month - 1);
    date.setFullYear(year);

    return date;
  }

  private static async getSpeciesSign(speciesId: number): Promise<string> {
    const speciesSign = {
      dog: 'P',
      cat: 'K',
      other: 'I',
    };
    const speciesList = [
      { phrase: 'kot', sign: speciesSign.cat },
      { phrase: 'pies', sign: speciesSign.dog },
    ];

    const species = await prisma.species.findUnique({
      where: { ID: speciesId },
    });
    if (species === null) return speciesSign.other;
    const formatedSpeciesName: string = species.species.toLocaleLowerCase();

    return (
      speciesList.find(({ phrase }) => phrase === formatedSpeciesName)?.sign ??
      speciesSign.other
    );
  }
}
