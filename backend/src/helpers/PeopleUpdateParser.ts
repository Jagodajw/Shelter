import { RegisterPersonEditRequest } from '../views/AnimalsView';

interface SecondaryParams {
  cityId: number;
  peopleCommuneId: number;
  shelterId: string;
}

export class PeopleUpdateParser {
  constructor() {}

  public static parse(
    model: RegisterPersonEditRequest,
    { cityId, peopleCommuneId, shelterId }: SecondaryParams
  ) {
    return {
      type_of_person: model.type_of_person,
      name: model.name,
      id_number: model.id_number,
      pesel: model.pesel,
      nip: model.nip,
      email: model.email,
      telephone: model.telephone,
      adress: model.adress,
      province_id: model.province_id,
      description: model.description,
      city_id: cityId,
      commune_id: peopleCommuneId,
      shelters_id: shelterId,
    };
  }
}
