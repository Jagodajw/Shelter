import { City } from '@prisma/client';
import { prisma } from '..';
import {
  AreaRequest,
  AreaResponse,
  BreedRequest,
  BreedResponse,
  CityRequest,
  CityResponse,
  ColorRequest,
  ColorResponse,
  CommuneRequest,
  CommuneResponse,
  SpeciesRequest,
  SpeciesResponse,
  TypeAdoptionRequest,
  TypeAdoptionResponse,
} from '../models/DictionaryModel';

//GET
export async function getAllCity(sheltersId: string): Promise<CityResponse[]> {
  return await prisma.city.findMany({
    where: {
      shelters_id: sheltersId,
    },
  });
}

export async function getAllCommune(
  sheltersId: string
): Promise<CommuneResponse[]> {
  return await prisma.commune.findMany({
    where: {
      shelters_id: sheltersId,
    },
  });
}

export async function getAllSpecies(
  sheltersId: string
): Promise<SpeciesResponse[]> {
  return await prisma.species.findMany({
    where: {
      shelters_id: sheltersId,
    },
  });
}

export async function getAllBreed(
  sheltersId: string
): Promise<BreedResponse[]> {
  return await prisma.breed.findMany({
    where: {
      shelters_id: sheltersId,
    },
  });
}

export async function getAllColor(
  sheltersId: string
): Promise<ColorResponse[]> {
  return await prisma.color.findMany({
    where: {
      shelters_id: sheltersId,
    },
  });
}

export async function getAllArea(sheltersId: string): Promise<AreaResponse[]> {
  return await prisma.area.findMany({
    where: {
      shelters_id: sheltersId,
    },
  });
}

export async function getAllTypeAdoption(
  sheltersId: string
): Promise<TypeAdoptionResponse[]> {
  return await prisma.typeAdoption.findMany({
    where: {
      shelters_id: sheltersId,
    },
  });
}
//DELETE
export async function deleteAllCity(cityId: number) {
  return await prisma.city.delete({
    where: {
      ID: cityId,
    },
  });
}

export async function deleteAllCommune(communeId: number) {
  return await prisma.commune.delete({
    where: {
      ID: communeId,
    },
  });
}

export async function deleteAllSpecies(speciesId: number) {
  return await prisma.species.delete({
    where: {
      ID: speciesId,
    },
  });
}

export async function deleteAllBreed(breedId: number) {
  return await prisma.breed.delete({
    where: {
      ID: breedId,
    },
  });
}

export async function deleteAllColor(colorId: number) {
  return await prisma.color.delete({
    where: {
      ID: colorId,
    },
  });
}

export async function deleteAllArea(areaId: number) {
  return await prisma.area.delete({
    where: {
      ID: areaId,
    },
  });
}

export async function deleteTypeAdoption(typeAdoptionId: number) {
  return await prisma.typeAdoption.delete({
    where: {
      ID: typeAdoptionId,
    },
  });
}
//UPDATE

export async function updateCity(cityId: number, updateCityModel: City) {
  return await prisma.city.update({
    where: {
      ID: cityId,
    },
    data: {
      city: updateCityModel.city,
      zip_code: updateCityModel.zip_code,
    },
  });
}

export async function updateCommune(communeId: number, updateCommune: string) {
  return await prisma.commune.update({
    where: {
      ID: communeId,
    },
    data: {
      commune: updateCommune,
    },
  });
}

export async function updateSpecies(speciesId: number, updateSpecies: string) {
  return await prisma.species.update({
    where: {
      ID: speciesId,
    },
    data: {
      species: updateSpecies,
    },
  });
}

export async function updateBreed(breedId: number, updateBreed: string) {
  return await prisma.breed.update({
    where: {
      ID: breedId,
    },
    data: {
      breed: updateBreed,
    },
  });
}

export async function updateColor(colorId: number, updateColor: string) {
  return await prisma.color.update({
    where: {
      ID: colorId,
    },
    data: {
      color: updateColor,
    },
  });
}

export async function updateArea(areaId: number, updateArea: string) {
  return await prisma.area.update({
    where: {
      ID: areaId,
    },
    data: {
      area: updateArea,
    },
  });
}

export async function updateTypeAdoption(
  typeAdoptionId: number,
  updateTypeAdoption: string
) {
  return await prisma.typeAdoption.update({
    where: {
      ID: typeAdoptionId,
    },
    data: {
      type_adoption: updateTypeAdoption,
    },
  });
}

//POST

export async function addCity(
  cityModel: CityRequest,
  shelters_id: string
): Promise<CityResponse> {
  return await prisma.city.create({
    data: {
      ...cityModel,
      shelters_id,
    },
  });
}

export async function addComune(
  communeModel: CommuneRequest,
  shelters_id: string
): Promise<CommuneResponse> {
  return await prisma.commune.create({
    data: {
      ...communeModel,
      shelters_id,
    },
  });
}

export async function addSpecies(
  speciesModel: SpeciesRequest,
  shelters_id: string
): Promise<SpeciesResponse> {
  return await prisma.species.create({
    data: {
      ...speciesModel,
      shelters_id,
    },
  });
}

export async function addBreed(
  breedModel: BreedRequest,
  shelters_id: string
): Promise<BreedResponse> {
  return await prisma.breed.create({
    data: {
      breed: breedModel.breed,
      species_id: breedModel.species_id,
      shelters_id: shelters_id,
    },
  });
}

export async function addColor(
  colorModel: ColorRequest,
  shelters_id: string
): Promise<ColorResponse> {
  return await prisma.color.create({
    data: {
      ...colorModel,
      shelters_id,
    },
  });
}

export async function addArea(
  areaModel: AreaRequest,
  shelters_id: string
): Promise<AreaResponse> {
  return await prisma.area.create({
    data: {
      ...areaModel,
      shelters_id,
    },
  });
}

export async function addTypeAdoption(
  typeAdoptionModel: TypeAdoptionRequest,
  shelters_id: string
): Promise<TypeAdoptionResponse> {
  return await prisma.typeAdoption.create({
    data: {
      ...typeAdoptionModel,
      shelters_id,
    },
  });
}
