import express from 'express';
import { authenticate } from '../../middlewares/authentication';
import { shelterAuthenticate } from '../../middlewares/shelterAuthentication';
import { EmployeeService } from '../../services/dictionary/EmployeeService';
import { EmployeeRequest, EmployeeResponse } from '../../views/EmployeeView';

const router = express.Router();

router.use((req, res, next) => {
  // #swagger.tags = ['Employee']
  next();
});

router.get('/employee', authenticate, shelterAuthenticate, async (req, res) => {
  try {
    const shelterId: string = req.headers['shelters_id'] as string;
    const employeeList = await EmployeeService.get(shelterId);
    res.status(200).json(employeeList as EmployeeResponse[]);
  } catch {
    res.sendStatus(500);
  }
});

router.post(
  '/employee',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const shelterId: string = req.headers['shelters_id'] as string;
      const employeeRequest: EmployeeRequest = req.body as EmployeeRequest;
      const employeeModel: EmployeeResponse = await EmployeeService.add(
        shelterId,
        employeeRequest
      );

      res.status(200).json(employeeModel);
    } catch {
      res.sendStatus(500);
    }
  }
);

router.put(
  '/employee/:employeeId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const employeeId: string = req.params.employeeId;
      const employeeRequest: EmployeeRequest = req.body as EmployeeRequest;
      const employeeModel: EmployeeRequest = await EmployeeService.edit(
        Number.parseInt(employeeId),
        employeeRequest
      );

      res.status(200).json(employeeModel);
    } catch {
      res.sendStatus(500);
    }
  }
);

router.delete(
  '/employee/:employeeId',
  authenticate,
  shelterAuthenticate,
  async (req, res) => {
    try {
      const employeeId: string = req.params.employeeId;
      const deleteEmployeeModel: EmployeeResponse =
        await EmployeeService.delete(Number.parseInt(employeeId));

      res.status(200).json(deleteEmployeeModel);
    } catch {
      res.sendStatus(500);
    }
  }
);

export { router as EmployeeController };
