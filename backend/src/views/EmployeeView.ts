import { Employees } from '@prisma/client';

export type EmployeeResponse = Employees;

export type EmployeeRequest = Omit<Employees, 'ID' | 'shelters_id'>;
