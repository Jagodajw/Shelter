import express from 'express';
import { authenticate } from '../middlewares/authentication';
import { shelterAuthenticate } from '../middlewares/shelterAuthentication';
import { EmployeeResponse } from '../models/EmployeeModel';
import { getEmployee } from '../services/EmployeeService';

const router = express.Router();

router.use((req, res, next) => {
  // #swagger.tags = ['Employee']
  next();
});

router.get('/employee', authenticate, shelterAuthenticate, async (req, res) => {
  try {
    const shelterId: string = req.headers['shelters_id'] as string;
    const employeeList = await getEmployee(shelterId);
    res.status(200).json(employeeList as EmployeeResponse[]);
  } catch {
    res.sendStatus(500);
  }
});

export default router;
