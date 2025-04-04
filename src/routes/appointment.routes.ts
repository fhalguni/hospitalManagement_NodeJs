import express from "express";
import appointmentController from "../controllers/appointment.controller";

const router = express.Router();
router.post("/bookAppointment/:id", appointmentController.bookAppointment);

export { router as appointmentRouter };
