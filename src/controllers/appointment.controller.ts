import { Request, Response } from "express";
import appointmentService from "../services/appointment.service";

class AppointmentController {
  async bookAppointment(req: Request, res: Response) {
    try {
      const patientId = req.params.id;

      const { doctorId, day, timeSlot } = req.body;

      const result = await appointmentService.bookAppointment(
        +patientId,
        doctorId,
        day,
        timeSlot
      );

      if (!result) {
        res.status(404).json({
          message: "not found",
        });
      }
      res.status(200).json({
        message: "Appointment booked",
        data: result,
      });
    } catch (err) {
      res.status(404).json({
        error: (err as Error).stack,
      });
    }
  }
}

export default new AppointmentController();
