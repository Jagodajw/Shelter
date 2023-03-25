import { Prisma } from '@prisma/client';

interface PrismaErrorHandlerReturn {
  status: number;
  code: object;
}
export function prismaErrorHandler(error: any): PrismaErrorHandlerReturn {
  let status = 500;
  let code = {};

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2003') {
      status = 406;
      code = { ERROR_CODE: 'RESORCE_IN_USE' };
    }
  }

  return { status, code };
}
