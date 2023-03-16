import { Employees } from '@prisma/client';
import { prisma } from '../..';
import { EmployeeRequest, EmployeeResponse } from '../../views/EmployeeView';

export class EmployeeService {
  constructor() {}

  public static async get(shelterId: string): Promise<EmployeeResponse[]> {
    return await prisma.employees.findMany({
      where: { shelters_id: shelterId },
    });
  }

  public static async add(
    shelterId: string,
    employeeRequest: EmployeeRequest
  ): Promise<EmployeeResponse> {
    return await prisma.employees.create({
      data: { ...employeeRequest, shelters_id: shelterId },
    });
  }

  public static async edit(
    employeeId: number,
    employeeRequest: EmployeeRequest
  ): Promise<Employees> {
    return await prisma.employees.update({
      where: { ID: employeeId },
      data: { ...employeeRequest },
    });
  }

  public static async delete(employeeId: number): Promise<Employees> {
    return await prisma.employees.delete({ where: { ID: employeeId } });
  }
}
