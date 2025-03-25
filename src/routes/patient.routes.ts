import express from "express";
import patientController from "../controllers/patient.controller";
const router = express.Router();

router.post("/createPatient", patientController.createPatient);
router.put("/updatePatient/:id", patientController.updatePatient);
router.delete("/deletePatient/:id", patientController.deletePatient);

export { router as patientRouter };
