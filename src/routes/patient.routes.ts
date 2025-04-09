import express, { Request, Response } from "express";
import patientController from "../controllers/patient.controller";
import { authenticateUser } from "../middleware/auth.middleware";
const router = express.Router();

router.put(
  "/updatePatient/:id",
  authenticateUser,
  patientController.updatePatient
);
router.delete(
  "/deletePatient/:id",
  authenticateUser,
  patientController.deletePatient
);
router.put(
  "/rescheduleAppointment/:id",
  authenticateUser,
  patientController.rescheduleAppointment
);
router.delete(
  "/cancelAppointment/:id",
  authenticateUser,
  patientController.cancelAppointment
);
router.get(
  "/getAllAppointment/:id",
  authenticateUser,
  patientController.getAllAppointments
);
router.get(
  "/getAppointment/:id",
  authenticateUser,
  patientController.getAppointment
);

router.get(
  "/getPatientById/:id",
  authenticateUser,
  patientController.getPatientById
);

export { router as patientRouter };
