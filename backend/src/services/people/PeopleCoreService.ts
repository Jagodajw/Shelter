import { prisma } from '../..';
import { MissingDictionaryAdder } from '../../helpers/MissingDictionaryAdder';
import { PeopleUpdateParser } from '../../helpers/PeopleUpdateParser';
import {
  PeopleRawResponse,
  RegisterPersonEditRequest,
} from '../../views/AnimalsView';

export class PeopleCoreSerivce {
  constructor() {}

  public static async toggleBlacklistState(
    state: boolean,
    personId: number
  ): Promise<boolean> {
    await prisma.people.update({
      where: { ID: personId },
      data: { black_list: state },
    });

    return state;
  }

  public static async update(
    personId: number,
    shelterId: string,
    personModel: RegisterPersonEditRequest
  ): Promise<PeopleRawResponse> {
    return await prisma.$transaction(async (tx) => {
      const dictionaryAdder = new MissingDictionaryAdder(tx);

      const cityId = await dictionaryAdder.getDictonaryField(
        'city',
        personModel.city,
        shelterId,
        { zip_code: personModel.zip_code }
      );

      const peopleCommuneId = await dictionaryAdder.getDictonaryField(
        'commune',
        personModel.commune,
        shelterId
      );

      return await prisma.people.update({
        where: { ID: personId },
        data: {
          ...PeopleUpdateParser.parse(personModel, {
            cityId,
            peopleCommuneId,
            shelterId,
          }),
        },
      });
    });
  }
}
