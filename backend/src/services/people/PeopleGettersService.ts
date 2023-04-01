import { prisma } from '../..';
import { dataToBeExtractedWhenPeopleAreTaken } from '../../data/PeopleData';
import { AnimalMapper } from '../../helpers/AnimalMapper';
import { PersonTableModel } from '../../models/PeopleModel';
import { RegisterPeopleResponse } from '../../views/AnimalsView';
import { PeopleResponse, PeopleStatus } from '../../views/PeopleView';

export class PeopleGettersService {
  constructor() {}

  public static async getById(
    peresonId: number
  ): Promise<RegisterPeopleResponse | null> {
    return (await prisma.people.findUnique({
      where: { ID: peresonId },
      include: {
        city: true,
        commune: true,
        province: true,
      },
    })) as RegisterPeopleResponse | null;
  }

  public static async getList(
    sheltersId: string,
    status: PeopleStatus,
    areBlockedUsers: boolean
  ): Promise<PeopleResponse[]> {
    if (status === 'moving')
      return await this.getBringingPersons(sheltersId, areBlockedUsers);
    return this.getReceivingPersons(sheltersId, areBlockedUsers);
  }

  private static async getBringingPersons(
    sheltersId: string,
    areBlockedUsers: boolean
  ): Promise<PeopleResponse[]> {
    const people: PersonTableModel[] = await prisma.registration.findMany({
      select: {
        ...dataToBeExtractedWhenPeopleAreTaken,
      },
      where: {
        shelters_id: sheltersId,
        people: {
          black_list: areBlockedUsers,
        },
      },
    });

    return this.mappingPeople(await people);
  }

  private static async getReceivingPersons(
    sheltersId: string,
    areBlockedUsers: boolean
  ): Promise<PeopleResponse[]> {
    const people: PersonTableModel[] = await prisma.adoption.findMany({
      distinct: ['people_id'],
      select: {
        ...dataToBeExtractedWhenPeopleAreTaken,
      },
      where: {
        shelters_id: sheltersId,
        people: {
          black_list: areBlockedUsers,
        },
      },
    });

    return this.mappingPeople(await people);
  }

  private static mappingPeople(data: PersonTableModel[]): PeopleResponse[] {
    return data.reduce((result: PeopleResponse[], data: PersonTableModel) => {
      const personId: number | undefined = result.findIndex(
        ({ ID }) => ID === data.people?.ID
      );
      if (data.people?.ID == null || data.animals?.ID == null) return result;

      if (personId !== -1) {
        result[personId].animals.push(
          ...AnimalMapper.mapToAnimalView([data.animals])
        );
      } else {
        const [name, surname] = data.people.name.split(' ');

        result.push({
          ...data.people,
          name,
          surname,
          animals: [...AnimalMapper.mapToAnimalView([data.animals])],
          city: data.people.city?.city ?? null,
          zip_code: data.people.city?.zip_code ?? null,
          commune: data.people.commune?.commune ?? null,
          province: data.people.province?.province ?? null,
        });
      }

      return result;
    }, []);
  }
}
