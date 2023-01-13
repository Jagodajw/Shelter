import { prisma } from '..';
import { EmployeeResponse } from '../models/EmployeeModel';

export async function getEmployee(
  shelterId: string
): Promise<EmployeeResponse[]> {
  return await prisma.employees.findMany({ where: { shelters_id: shelterId } });
}
