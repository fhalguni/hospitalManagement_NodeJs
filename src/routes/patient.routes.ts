import express, { Request, Response } from "express";
import patientController from "../controllers/patient.controller";
const router = express.Router();

router.put("/updatePatient/:id", patientController.updatePatient);
router.delete("/deletePatient/:id", patientController.deletePatient);
router.put(
  "/rescheduleAppointment/:id",
  patientController.rescheduleAppointment
);
router.delete("/cancelAppointment/:id", patientController.cancelAppointment);
router.get("/getAllAppointment/:id", patientController.getAllAppointments);
router.get("/getAppointment/:id", patientController.getAppointment);
router.get("/getPatientById/:id", patientController.getPatientById);

export { router as patientRouter };
