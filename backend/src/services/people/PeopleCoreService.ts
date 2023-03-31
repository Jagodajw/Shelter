import { prisma } from '../..';
import { MissingDictionaryAdder } from '../../helpers/MissingDictionaryAdder';
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
          type_of_person: personModel.type_of_person,
          name: personModel.name,
          id_number: personModel.id_number,
          pesel: personModel.pesel,
          nip: personModel.nip,
          email: personModel.email,
          telephone: personModel.telephone,
          adress: personModel.adress,
          province_id: personModel.province_id,
          description: personModel.description,
          city_id: cityId,
          commune_id: peopleCommuneId,
          shelters_id: shelterId,
        },
      });
    });
  }
}
