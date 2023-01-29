import { Prisma } from '@prisma/client';
import express from 'express';
import { authenticate } from '../middlewares/authentication';
import { shelterAuthenticate } from '../middlewares/shelterAuthentication';
import { City } from '../models/CityModel';
import {
  AreaResponse,
  BreedRequest,
  BreedResponse,
  CityRequest,
  CityResponse,
  ColorResponse,
  CommuneResponse,
  SpeciesResponse,
  TypeAcceptanceResponse,
  TypeAdoptionResponse,
} from '../models/DictionaryModel';
import {
  addArea,
  addBreed,
  addCity,
  addColor,
  addComune,
  addSpecies,
  addTypeAdoption,
  deleteAllArea,
  deleteAllBreed,
  deleteAllCity,
  deleteAllColor,
  deleteAllSpecies,
  deleteTypeAdoption,
  getAllArea,
  getAllBreed,
  getAllCity,
  getAllColor,
  getAllCommune,
  getAllSpecies,
  getAllTypeAdoption,
  getProvince,
  getTypeAcceptance,
  updateArea,
  updateBreed,
  updateColor,
  updateCommune,
  updateSpecies,
  updateTypeAdoption,
} from '../services/DictionaryService';

const router = express.Router();

router.use((req, res, next) => {
  // #swagger.tags = ['Dictonary']
  next();
});

//GET
router.get('/cities', authenticate, shelterAuthenticate, async (req, res) => {
  try {
    const shelterId: string = req.headers['shelters_id'] as string;

    const dictionaryCity = await getAllCity(shelterId);
    res.json(dictionaryCity as CityResponse[]);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get('/commune', authenticate, shelterAuthenticate, async (req, res) => {
  try {
    const shelterId: string = req.headers['shelters_id'] as string;

    const dictionaryCommune = await getAllCommune(shelterId);
    res.json(dictionaryCommune as CommuneResponse[]);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get('/species', authenticate, shelterAuthenticate, async (req, res) => {
  try {
    const shelterId: string = req.headers['shelters_id'] as string;

    const dictionarySpecies = await getAllSpecies(shelterId);
    res.json(dictionarySpecies as SpeciesResponse[]);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get('/breed', authenticate, shelterAuthenticate, async (req, res) => {
  try {
    const shelterId: string = req.headers['shelters_id'] as string;

    const dictionaryBreed = await getAllBreed(shelterId);
    res.json(dictionaryBreed as BreedResponse[]);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get('/colors', authenticate, shelterAuthenticate, async (req, res) => {
  try {
    const shelterId: string = req.headers['shelters_id'] as string;

    const dictionaryColor = await getAllColor(shelterId);
    res.json(dictionaryColor as ColorResponse[]);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get('/area', authenticate, shelterAuthenticate, async (req, res) => {
  try {
    const shelterId: string = req.headers['shelters_id'] as string;

    const dictionaryArea = await getAllArea(shelterId);
    res.json(dictionaryArea as AreaResponse[]);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get(
  '/typeAdoption',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const shelterId: string = req.headers['shelters_id'] as string;

      const dictionaryTypeAdoption = await getAllTypeAdoption(shelterId);
      res.json(dictionaryTypeAdoption as TypeAdoptionResponse[]);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);
//DELETE
router.delete(
  '/settingsCity/:cityId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const cityId = req.params.cityId;
      const convertCityId = parseInt(cityId);
      const dictionaryCityDelete = await deleteAllCity(convertCityId);
      res.json(dictionaryCityDelete);
    } catch (error) {
      let errorStatus = 500;
      let errorCode = {};
      if (!(error instanceof Prisma.PrismaClientKnownRequestError)) return;
      if (error.code === 'P2003') {
        errorStatus = 406;
        errorCode = { ERROR_CODE: 'RESORCE_IN_USE' };
      }

      res.status(errorStatus).json(errorCode);
    }
  }
);

router.delete(
  '/settingsCommune/:communeId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const communeId = req.params.communeId;
      const convertCommuneId = parseInt(communeId);
      const dictionaryCommuneDelete = await deleteAllSpecies(convertCommuneId);
      res.json(dictionaryCommuneDelete);
    } catch (error) {
      let errorStatus = 500;
      let errorCode = {};
      if (!(error instanceof Prisma.PrismaClientKnownRequestError)) return;
      if (error.code === 'P2003') {
        errorStatus = 406;
        errorCode = { ERROR_CODE: 'RESORCE_IN_USE' };
      }

      res.status(errorStatus).json(errorCode);
    }
  }
);

router.delete(
  '/settingsSpecies/:speciesId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const speciesId = req.params.speciesId;
      const convertSpeciesId = parseInt(speciesId);
      const dictionarySpeciesDelete = await deleteAllSpecies(convertSpeciesId);
      res.json(dictionarySpeciesDelete);
    } catch (error) {
      let errorStatus = 500;
      let errorCode = {};
      if (!(error instanceof Prisma.PrismaClientKnownRequestError)) return;
      if (error.code === 'P2003') {
        errorStatus = 406;
        errorCode = { ERROR_CODE: 'RESORCE_IN_USE' };
      }

      res.status(errorStatus).json(errorCode);
    }
  }
);

router.delete(
  '/settingsBreed/:breedId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const breedId = req.params.breedId;
      const convertBreedId = parseInt(breedId);
      const dictionaryBreedDelete = await deleteAllBreed(convertBreedId);
      res.json(dictionaryBreedDelete);
    } catch (error) {
      let errorStatus = 500;
      let errorCode = {};
      if (!(error instanceof Prisma.PrismaClientKnownRequestError)) return;
      if (error.code === 'P2003') {
        errorStatus = 406;
        errorCode = { ERROR_CODE: 'RESORCE_IN_USE' };
      }

      res.status(errorStatus).json(errorCode);
    }
  }
);

router.delete(
  '/settingsColor/:colorId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const colorId = req.params.colorId;
      const convertColorId = parseInt(colorId);
      const dictionaryColorDelete = await deleteAllColor(convertColorId);
      res.json(dictionaryColorDelete);
    } catch (error) {
      let errorStatus = 500;
      let errorCode = {};
      if (!(error instanceof Prisma.PrismaClientKnownRequestError)) return;
      if (error.code === 'P2003') {
        errorStatus = 406;
        errorCode = { ERROR_CODE: 'RESORCE_IN_USE' };
      }

      res.status(errorStatus).json(errorCode);
    }
  }
);

router.delete(
  '/settingsArea/:areaId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const areaId = req.params.areaId;
      const convertAreaId = parseInt(areaId);
      const dictionaryAreaDelete = await deleteAllArea(convertAreaId);
      res.json(dictionaryAreaDelete);
    } catch (error) {
      let errorStatus = 500;
      let errorCode = {};
      if (!(error instanceof Prisma.PrismaClientKnownRequestError)) return;
      if (error.code === 'P2003') {
        errorStatus = 406;
        errorCode = { ERROR_CODE: 'RESORCE_IN_USE' };
      }

      res.status(errorStatus).json(errorCode);
    }
  }
);

router.delete(
  '/settingsTypeAdoption/:typeAdoptionId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const typeAdoptionId = req.params.typeAdoptionId;
      const convertAdoptionId = parseInt(typeAdoptionId);
      const dictionaryTypeAdoptionDelete = await deleteTypeAdoption(
        convertAdoptionId
      );
      res.json(dictionaryTypeAdoptionDelete);
    } catch (error) {
      let errorStatus = 500;
      let errorCode = {};
      if (!(error instanceof Prisma.PrismaClientKnownRequestError)) return;
      if (error.code === 'P2003') {
        errorStatus = 406;
        errorCode = { ERROR_CODE: 'RESORCE_IN_USE' };
      }

      res.status(errorStatus).json(errorCode);
    }
  }
);

//UPDATE

router.put(
  '/settingsCityId/:cityId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const cityId = req.params.cityId;
      const updateCityModel = new City(req.body.city, req.body.zip_code);
      const convertCityId = parseInt(cityId);
      //to debug
      // const dictionaryCityIdUpdate = await updateCity(
      //   convertCityId,
      //   updateCityModel
      // );
      res.json([]);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

router.put(
  '/settingsCommuneId/:communeId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const updatedCommune = req.body.commune;
      const communeId = req.params.communeId;

      const convertCommuneId = parseInt(communeId);
      const dictionaryCommuneIdUpdate = await updateCommune(
        convertCommuneId,
        updatedCommune
      );
      res.json(dictionaryCommuneIdUpdate);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
);

router.put(
  '/settingsSpeciesId/:speciesId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const updatedSpecies = req.body.species;
      const speciesId = req.params.speciesId;

      const convertSpeciesId = parseInt(speciesId);
      const dictionarySpeciesIdUpdate = await updateSpecies(
        convertSpeciesId,
        updatedSpecies
      );
      res.json(dictionarySpeciesIdUpdate);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

router.put(
  '/settingsBreedId/:breedId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const updatedBreed = req.body.breed;
      const breedId = req.params.breedId;

      const convertBreedId = parseInt(breedId);
      const dictionaryBreedIdUpdate = await updateBreed(
        convertBreedId,
        updatedBreed
      );
      res.json(dictionaryBreedIdUpdate);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

router.put(
  '/settingsColorId/:colorId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const updatedColor = req.body.color;
      const colorId = req.params.colorId;

      const convertColorId = parseInt(colorId);
      const dictionaryColorIdUpdate = await updateColor(
        convertColorId,
        updatedColor
      );
      res.json(dictionaryColorIdUpdate);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

router.put(
  '/settingsAreaId/:areaId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const updatedArea = req.body.area;
      const areaId = req.params.areaId;

      const convertAreaId = parseInt(areaId);
      const dictionaryAreaIdUpdate = await updateArea(
        convertAreaId,
        updatedArea
      );
      res.json(dictionaryAreaIdUpdate);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

router.put(
  '/settingsTypeAdoption/:typeAdoptionId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const updatedTypeAdoption = req.body.type_adoption;
      const typeAdoptionId = req.params.typeAdoptionId;

      const convertAdoptionId = parseInt(typeAdoptionId);
      const dictionaryTypeAdoptionUpdate = await updateTypeAdoption(
        convertAdoptionId,
        updatedTypeAdoption
      );
      res.json(dictionaryTypeAdoptionUpdate);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

//POST

router.post('/city', authenticate, shelterAuthenticate, async (req, res) => {
  try {
    const shelters_id: string = req.headers['shelters_id'] as string;
    const cityModel: CityRequest = {
      city: req.body.city,
      zip_code: req.body.zip_code,
    };
    const newCity = await addCity(cityModel, shelters_id);
    res.json(newCity as CityResponse);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post('/commune', authenticate, shelterAuthenticate, async (req, res) => {
  try {
    const shelterId: string = req.headers['shelters_id'] as string;
    const commune: string = req.body.commune;
    const dictionaryAddCommune = await addComune({ commune }, shelterId);
    res.json(dictionaryAddCommune as CommuneResponse);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.post('/species', authenticate, shelterAuthenticate, async (req, res) => {
  try {
    const shelterId: string = req.headers['shelters_id'] as string;
    const species: string = req.body.species;
    const dictionaryAddSpeciesd = await addSpecies({ species }, shelterId);
    res.json(dictionaryAddSpeciesd as SpeciesResponse);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post('/breed', authenticate, async (req, res) => {
  try {
    const shelterId: string = req.headers['shelters_id'] as string;
    const breedModel: BreedRequest = {
      breed: req.body.breed,
      species_id: req.body.species_id,
    };
    const dictionaryAddBreed = await addBreed(breedModel, shelterId);
    res.json(dictionaryAddBreed as BreedResponse);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post('/color', authenticate, shelterAuthenticate, async (req, res) => {
  try {
    const shelterId: string = req.headers['shelters_id'] as string;
    const color: string = req.body.color;
    const dictionaryAddColor = await addColor({ color }, shelterId);
    res.json(dictionaryAddColor as ColorResponse);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post('/area', authenticate, shelterAuthenticate, async (req, res) => {
  try {
    const shelterId: string = req.headers['shelters_id'] as string;
    const area: string = req.body.area;
    const dictionaryAddArea = await addArea({ area }, shelterId);
    res.json(dictionaryAddArea as AreaResponse);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post(
  '/typeAdoption',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const shelterId: string = req.headers['shelters_id'] as string;
      const typeAdoption: string = req.body.type_adoption;
      const dictionaryTypeAdoptionUpdate = await addTypeAdoption(
        { type_adoption: typeAdoption },
        shelterId
      );
      res.json(dictionaryTypeAdoptionUpdate as TypeAdoptionResponse);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

router.get('/province', authenticate, async (req, res) => {
  try {
    const provinces = await getProvince();
    res.json(provinces);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get(
  '/typeAcceptance',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const shelterId: string = req.headers['shelters_id'] as string;

      const typeAcceptance = await getTypeAcceptance(shelterId);
      res.json(typeAcceptance as TypeAcceptanceResponse[]);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);

export default router;
