import { Prisma, PrismaClient } from '@prisma/client';

export type PrismaClientType = PrismaClient | Prisma.TransactionClient;
