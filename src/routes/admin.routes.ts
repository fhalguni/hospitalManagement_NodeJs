import express from "express";
import adminController from "../controllers/admin.controller";
const router = express.Router();

router.post("/createDoctor", adminController.createAdmin);
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

export { router as adminRouter };
