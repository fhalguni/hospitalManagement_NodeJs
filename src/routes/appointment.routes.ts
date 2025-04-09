import express from "express";
import appointmentController from "../controllers/appointment.controller";
import { authenticateUser } from "../middleware/auth.middleware";

const router = express.Router();
router.post(
  "/bookAppointment/:id",
  authenticateUser,
  appointmentController.bookAppointment
);

export { router as appointmentRouter };
