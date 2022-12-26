import { prisma } from '..';
import { Animals, People, Registration } from '../models/DataRegister';

export async function getAllAnimals() {
  return await prisma.tableAnimals.findMany();
}

export async function getAnimalDataRegister(animalId: string) {
  const dataRegisterAnimal = await prisma.dataRegisterAnimal.findMany({
    where: {
      animals_id: animalId,
    },
  });
  const dataRegisterPeople = await prisma.dataRegisterPeople.findUnique({
    where: {
      animals_id: animalId,
    },
  });
  const dataRegistration = await prisma.dataRegistration.findUnique({
    where: {
      animals_id: animalId,
    },
  });

  return { dataRegisterAnimal, dataRegisterPeople, dataRegistration };
}

export async function postAnimalDataRegister(
  updateDataRegisterAnimal: Animals,
  updateDataRegisterPeople: People,
  updateDataRegistration: Registration
) {
  const registerAnimal = await prisma.animals.create({
    data: {
      name: updateDataRegisterAnimal.name,
      species_id: updateDataRegisterAnimal.species_id,
      breed_id: updateDataRegisterAnimal.breed_id,
      id_number: updateDataRegisterAnimal.id_number,
      commune_id: updateDataRegisterAnimal.commune_id,
      area_id: updateDataRegisterAnimal.area_id,
      color_id: updateDataRegisterAnimal.color_id,
      size: updateDataRegisterAnimal.size,
      gender: updateDataRegisterAnimal.gender,
      nr_chip: updateDataRegisterAnimal.nr_chip,
      date_of_birth: updateDataRegisterAnimal.date_of_birth,
      description_animal: updateDataRegisterAnimal.description_animal,
      date_vaccination: updateDataRegisterAnimal.date_vaccination,
      vaccination: updateDataRegisterAnimal.vaccination,
      sterilization: updateDataRegisterAnimal.sterilization,
      date_sterilization: updateDataRegisterAnimal.date_sterilization,
      shelters_id: updateDataRegisterAnimal.shelters_id,
    },
  });
  const registerPeople = await prisma.people.create({
    data: {
      name: updateDataRegisterPeople.name,
      id_number: updateDataRegisterPeople.id_number,
      pesel: updateDataRegisterPeople.pesel,
      nip: updateDataRegisterPeople.nip,
      telephone: updateDataRegisterPeople.telephone,
      email: updateDataRegisterPeople.email,
      adress: updateDataRegisterPeople.adress,
      city_id: updateDataRegisterPeople.city_id,
      province_id: updateDataRegisterPeople.province_id,
      commune_id: updateDataRegisterPeople.commune_id,
      description: updateDataRegisterPeople.description,
      type_of_person: updateDataRegisterPeople.type_of_person,
      shelters_id: updateDataRegisterPeople.shelters_id,
    },
  });
  const register = await prisma.registration.create({
    data: {
      date_of_registration: updateDataRegistration.date_of_registration,
      quarantine: updateDataRegistration.quarantine,
      accepted_employees_id: updateDataRegistration.accepted_employees_id,
      introduced_employees_id: updateDataRegistration.introduced_employees_id,
      decription_registration: updateDataRegistration.decription_registration,
      type_of_acceptance: updateDataRegistration.type_of_acceptance,
      animals_id: registerAnimal.ID,
      people_id: registerPeople.ID,
      shelters_id: updateDataRegistration.shelters_id,
    },
  });

  return { register, registerPeople, registerAnimal };
}

export async function getAnimalDataAdoption(animalId: string) {
  const dataAdoptionAnimal = await prisma.dataAdoptionAnimal.findMany({
    where: {
      animals_id: animalId,
    },
  });
  const dataRegisterPeople = await prisma.dataRegisterPeople.findUnique({
    where: {
      animals_id: animalId,
    },
  });

  return { dataAdoptionAnimal, dataRegisterPeople };
}
