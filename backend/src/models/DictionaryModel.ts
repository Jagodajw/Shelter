import {
  Area,
  Breed,
  City,
  Color,
  Commune,
  Province,
  Species,
  TypeAdoption,
} from '@prisma/client';

export type CityResponse = City;
export type CityRequest = Omit<City, 'ID' | 'shelters_id'>;

export type CommuneResponse = Commune;
export type CommuneRequest = Omit<Commune, 'ID' | 'shelters_id'>;

export type SpeciesResponse = Species;
export type SpeciesRequest = Omit<Species, 'ID' | 'shelters_id'>;

export type BreedResponse = Breed;
export type BreedRequest = Omit<Breed, 'ID' | 'shelters_id'>;

export type ColorResponse = Color;
export type ColorRequest = Omit<Color, 'ID' | 'shelters_id'>;

export type AreaResponse = Area;
export type AreaRequest = Omit<Area, 'ID' | 'shelters_id'>;

export type TypeAdoptionResponse = TypeAdoption;
export type TypeAdoptionRequest = Omit<TypeAdoption, 'ID' | 'shelters_id'>;

export type ProvinceResponse = Province;
