import { AnimalModel } from '../models/AnimalsModel';
import { AnimalTableResponse } from '../views/AnimalsView';

export class AnimalMapper {
  constructor() {}

  public static mapToAnimalView(
    rawAnimal: AnimalModel[]
  ): AnimalTableResponse[] {
    return rawAnimal.map((response: AnimalModel) => ({
      ...response,
      species: response.species?.species ?? '',
      breed: response.breed?.breed ?? '',
      commune: response.commune?.commune ?? '',
      area: response.area?.area ?? '',
    }));
  }
}
