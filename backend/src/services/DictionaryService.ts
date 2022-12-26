import { Breed } from '@prisma/client';
import { prisma } from '..';
import { City } from '../models/CityModel';

//GET
export async function getAllCity(sheltersId: string) {
  return await prisma.city.findMany({
    where: {
      shelters_id: sheltersId,
    },
  });
}

export async function getAllCommune(sheltersId: string) {
  return await prisma.commune.findMany({
    where: {
      shelters_id: sheltersId,
    },
  });
}

export async function getAllSpecies(sheltersId: string) {
  return await prisma.species.findMany({
    where: {
      shelters_id: sheltersId,
    },
  });
}

export async function getAllBreed(sheltersId: string) {
  return await prisma.breed.findMany({
    where: {
      shelters_id: sheltersId,
    },
  });
}

export async function getAllColor(sheltersId: string) {
  return await prisma.color.findMany({
    where: {
      shelters_id: sheltersId,
    },
  });
}

export async function getAllArea(sheltersId: string) {
  return await prisma.area.findMany({
    where: {
      shelters_id: sheltersId,
    },
  });
}

export async function getAllTypeAdoption(sheltersId: string) {
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
      zip_code: updateCityModel.zipCode,
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

export async function postCity(updateCityModel: City, shelters_id: string) {
  return await prisma.city.create({
    data: {
      city: updateCityModel.city,
      zip_code: updateCityModel.zipCode,
      shelters_id: shelters_id,
    },
  });
}

export async function postCommune(addCommune: string, shelters_id: string) {
  return await prisma.commune.create({
    data: {
      commune: addCommune,
      shelters_id: shelters_id,
    },
  });
}

export async function postSpecies(addSpecies: string, shelters_id: string) {
  return await prisma.species.create({
    data: {
      species: addSpecies,
      shelters_id: shelters_id,
    },
  });
}

export async function postBreed(updateBreedModel: Breed, shelters_id: string) {
  return await prisma.breed.create({
    data: {
      breed: updateBreedModel.breed,
      species_id: updateBreedModel.species_id,
      shelters_id: shelters_id,
    },
  });
}

export async function postColor(addColor: string, shelters_id: string) {
  return await prisma.color.create({
    data: {
      color: addColor,
      shelters_id: shelters_id,
    },
  });
}

export async function postArea(addArea: string, shelters_id: string) {
  return await prisma.area.create({
    data: {
      area: addArea,
      shelters_id: shelters_id,
    },
  });
}

export async function postTypeAdoption(
  addTypeAdoption: string,
  shelters_id: string
) {
  return await prisma.typeAdoption.create({
    data: {
      type_adoption: addTypeAdoption,
      shelters_id: shelters_id,
    },
  });
}
