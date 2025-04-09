import express from "express";
import doctorController from "../controllers/doctor.controller";
import {
  authenticateDoctor,
  authenticateUser,
} from "../middleware/auth.middleware";
const router = express.Router();
// router.post("/createDoctor", authenticateDoctor, doctorController.createDoctor);
router.get("/getAllDoctor", authenticateDoctor, doctorController.getAllDoctors);
router.put(
  "/confirmAppointment/:id",
  authenticateDoctor,
  doctorController.confirmAppointment
);
router.put(
  "/rejectAppointment/:id",
  authenticateDoctor,
  doctorController.rejectAppointment
);

router.post("/login-doctor", doctorController.logInDoctor);
router.get(
  "/AllAppointments/:id",
  authenticateDoctor,
  doctorController.getAllAppointments
);
router.get("/getDoctor/:id", doctorController.getDoctor);
router.put("/updatePassword/:id", doctorController.updatePassword);
export { router as DoctorRouter };
