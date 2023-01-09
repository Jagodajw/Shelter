import { Prisma } from '@prisma/client';
import express from 'express';
import { authenticate } from '../middlewares/authentication';
import { shelterAuthenticate } from '../middlewares/shelterAuthentication';
import { City } from '../models/CityModel';
import {
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
  postArea,
  postCity,
  postColor,
  postCommune,
  postSpecies,
  postTypeAdoption,
  updateArea,
  updateBreed,
  updateCity,
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
router.get(
  '/settingsCity/:sheltersId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const sheltersId = req.params.sheltersId;

      const dictionaryCity = await getAllCity(sheltersId);
      res.json(dictionaryCity);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

router.get(
  '/settingsCommune/:sheltersId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const sheltersId = req.params.sheltersId;

      const dictionaryCommune = await getAllCommune(sheltersId);
      res.json(dictionaryCommune);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

router.get(
  '/settingsSpecies/:sheltersId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const sheltersId = req.params.sheltersId;

      const dictionarySpecies = await getAllSpecies(sheltersId);
      res.json(dictionarySpecies);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

router.get(
  '/settingsBreed/:sheltersId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const sheltersId = req.params.sheltersId;

      const dictionaryBreed = await getAllBreed(sheltersId);
      res.json(dictionaryBreed);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

router.get(
  '/settingsColor/:sheltersId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const sheltersId = req.params.sheltersId;

      const dictionaryColor = await getAllColor(sheltersId);
      res.json(dictionaryColor);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

router.get(
  '/settingsArea/:sheltersId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const sheltersId = req.params.sheltersId;

      const dictionaryArea = await getAllArea(sheltersId);
      res.json(dictionaryArea);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

router.get(
  '/settingsTypeAdoption/:sheltersId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const sheltersId = req.params.sheltersId;
      const dictionaryTypeAdoption = await getAllTypeAdoption(sheltersId);
      res.json(dictionaryTypeAdoption);
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
      const dictionaryCityIdUpdate = await updateCity(
        convertCityId,
        updateCityModel
      );
      res.json(dictionaryCityIdUpdate);
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

router.post(
  '/settingsAddCity/',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const shelters_id: string = req.headers['shelters_id'] as string;
      const updateCityModel = new City(req.body.city, req.body.zip_code);
      const dictionaryAddCity = await postCity(updateCityModel, shelters_id);
      res.json(dictionaryAddCity);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

router.post(
  '/settingsAddCommune/',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const shelters_id: string = req.headers['shelters_id'] as string;
      const addCommune = req.body.commune;
      const dictionaryAddCommune = await postCommune(addCommune, shelters_id);
      res.json(dictionaryAddCommune);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
);

router.post(
  '/settingsAddSpecies/',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const shelters_id: string = req.headers['shelters_id'] as string;
      const addSpecies = req.body.species;
      const dictionaryAddSpeciesd = await postSpecies(addSpecies, shelters_id);
      res.json(dictionaryAddSpeciesd);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

// router.post('/settingsAddBreed/', authenticate, async (req, res) => {
//   try {
//     const shelters_id: string = req.headers['shelters_id'] as string;
//     const updateBreedModel = new Breed(
//       req.body.breed,
//       parseInt(req.body.species_id)
//     );
//     const dictionaryAddBreed = await postBreed(updateBreedModel, shelters_id);
//     res.json(dictionaryAddBreed);
//   } catch (error) {
//     res.sendStatus(500);
//   }
// });

router.post(
  '/settingsAddColor/',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const shelters_id: string = req.headers['shelters_id'] as string;
      const addColor = req.body.color;
      const dictionaryAddColor = await postColor(addColor, shelters_id);
      res.json(dictionaryAddColor);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

router.post(
  '/settingsAddArea/',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const shelters_id: string = req.headers['shelters_id'] as string;
      const addArea = req.body.area;
      const dictionaryAddArea = await postArea(addArea, shelters_id);
      res.json(dictionaryAddArea);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

router.post(
  '/settingsTypeAdoption/',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const shelters_id: string = req.headers['shelters_id'] as string;
      const addTypeAdoption = req.body.type_adoption;
      const dictionaryTypeAdoptionUpdate = await postTypeAdoption(
        addTypeAdoption,
        shelters_id
      );
      res.json(dictionaryTypeAdoptionUpdate);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

export default router;
