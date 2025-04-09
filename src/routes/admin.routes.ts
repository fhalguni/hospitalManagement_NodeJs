import express from "express";
import adminController from "../controllers/admin.controller";
const router = express.Router();

router.post("/createDoctor", adminController.createDoctor);
router.get("/getAllDoctors", adminController.getAllDoctor);
router.get("/getAllPatients", adminController.getAllPatient);
router.put("/deletePatient/:id", adminController.deletePatient);
router.get(
  "/getAppointmentOfPatient/:id",
  adminController.displayAppointmentOfPatient
);
router.put("/deleteDoctor/:id", adminController.deleteDoctor);
router.get(
  "/getAppointmentOfDoctor/:id",
  adminController.getAllAppointmentOfDoctor
);

router.put("/activatePatient/:id", adminController.activePatient);
router.get("/getPatient/:id", adminController.getPatient);
router.put("/activeDoctor/:id", adminController.activeAdmin);
export { router as adminRouter };
