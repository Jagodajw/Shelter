import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger-output.json';
import routes from './routes';

const prisma = new PrismaClient();
const app = express();

dotenv.config();

const options = {
  swaggerOptions: {
    url: '/api-docs/swagger.json',
  }, 
};
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));
app.get('/api-docs/swagger.json', (req, res) => res.json(swaggerDocument));

app.listen(3000, () => console.log('Server is running'));
export { prisma };
