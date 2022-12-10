import express from 'express';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/city', async (req, res) => {
  const city = await prisma.city.findMany();
  res.json(city);
});

app.get('/registration', async (req, res) => {
  const registration = await prisma.registration;
  res.json(registration);
});

const server = app.listen(3000);
