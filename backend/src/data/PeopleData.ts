export const dataToBeExtractedWhenPeopleAreTaken = {
  people: {
    select: {
      ID: true,
      name: true,
      adress: true,
      pesel: true,
      telephone: true,
      email: true,
      description: true,
      black_list: true,
      type_of_person: true,
      city: {
        select: {
          city: true,
          zip_code: true,
        },
      },
      commune: {
        select: {
          commune: true,
        },
      },
      province: {
        select: {
          province: true,
        },
      },
    },
  },
  animals: {
    select: {
      ID: true,
      name: true,
      species: true,
      breed: { select: { breed: true } },
      gender: true,
      commune: { select: { commune: true } },
      area: { select: { area: true } },
      id_number: true,
      nr_chip: true,
      shelters_id: true,
      adopted: true,
    },
  },
};
