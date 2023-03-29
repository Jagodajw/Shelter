import express from 'express';
import multer from 'multer';
import { DocumentModel } from '../models/DocumentModel';
import { DocumentService } from '../services/DocumentService';
import { stringToNull } from '../utils/converters';
import { middlewares } from '../utils/middlewares';
import { DocumentResponse } from '../views/DocumentView';

const router = express.Router();

router.use((req, res, next) => {
  // #swagger.tags = ['Documents']
  next();
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  '/document',
  ...middlewares,
  upload.single('file'),
  async (req, res) => {
    try {
      const file: Buffer | undefined = req.file?.buffer;
      if (file === undefined) throw new Error('ERROR_WHILE_UPLOADING_THE_FILE');

      const shelterId: string = req.headers['shelters_id'] as string;
      const documentBody: Omit<DocumentModel, 'file'> = {
        ...req.body,
        animals_id: stringToNull(req.body.animals_id),
        shelters_id: shelterId,
      };
      const documentRequest: DocumentModel = { ...documentBody, file };
      const document: DocumentResponse = await DocumentService.add(
        documentRequest
      );

      res.send(document);
    } catch (error: any) {
      console.log(error);
      res.status(500).json(error.message ? { ERROR_CODE: error.message } : {});
    }
  }
);

router.get('/document', ...middlewares, async (req, res) => {
  try {
    const shelterId: string = req.headers['shelters_id'] as string;
    const documents: DocumentResponse[] = await DocumentService.getList(
      shelterId
    );

    res.send(documents as DocumentResponse[]);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error.message ? { ERROR_CODE: error.message } : {});
  }
});

router.get('/document/:animalId', ...middlewares, async (req, res) => {
  try {
    const animalId: string = req.params.animalId;
    const documents: DocumentResponse[] =
      await DocumentService.getListByAnimalId(animalId);

    res.send(documents as DocumentResponse[]);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error.message ? { ERROR_CODE: error.message } : {});
  }
});

router.delete('/document/:documentId', ...middlewares, async (req, res) => {
  try {
    const documentId: string = req.params.documentId;
    await DocumentService.delete(documentId);
    console.log(documentId);
    res.sendStatus(200);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error.message ? { ERROR_CODE: error.message } : {});
  }
});

router.get('/documentFile/:documentId', ...middlewares, async (req, res) => {
  try {
    const documentId: string = req.params.documentId;

    const file = await DocumentService.getFile(documentId);
    if (file?.file === undefined)
      throw new Error('ERROR_WHILE_DOWNLOADING_THE_FILE');

    res.send(file.file);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error.message ? { ERROR_CODE: error.message } : {});
  }
});

export { router as DocumentsController };
