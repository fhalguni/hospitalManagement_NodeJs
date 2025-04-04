import { Request, Response } from "express";
import patientService from "../services/patient.service";
import appointmentService from "../services/appointment.service";

class PatientController {
  async getAllAppointments(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const result = await patientService.getAllAppointment(+id);
      if (!result) {
        res.status(404).json({
          message: "No appointment booked by this patient",
        });
      }
      res.status(200).json({
        message: "success",
        data: result,
      });
    } catch (error) {
      res.status(404).json({
        err: (error as Error).message,
      });
    }
  }

  async updatePatient(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const result = await patientService.updatePatient(+id, { ...req.body });
      if (!result) {
        res.status(404).json({
          error: "Patient not found with this id",
        });
      }
      res.status(200).json({
        message: "Patient updated successfully",
      });
    } catch (err) {
      res.status(400).json({
        error: (err as Error).message,
      });
    }
  }

  async deletePatient(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const result = await patientService.deletePatient(+id);
      if (!result) {
        res.status(404).json({
          error: "Patient not found with this id",
        });
      }
      res.status(200).json({
        message: "Patient deleted successfully",
      });
    } catch (err) {
      res.status(400).json({
        error: err as Error,
      });
    }
  }
  async rescheduleAppointment(req: Request, res: Response) {
    try {
      const patientId = req.params.id;

      const { appointmentId, doctorId, day, timeSlot } = req.body;

      const result = await patientService.rescheduleAppointment(
        appointmentId,
        +patientId,

        { doctorId: +doctorId, day, timeSlot }
      );

      if (!result) {
        res.status(404).json({
          error: "Patient not found with this id",
        });
      }
      res.status(200).json({
        message: "Patient rescheduled successfully",
        data: result,
      });
    } catch (err) {
      res.status(400).json({
        error: (err as Error).message,
      });
    }
  }

  async cancelAppointment(req: Request, res: Response) {
    try {
      const patientId = req.params.id;
      const { appointmentId } = req.body;
      const result = patientService.cancelAppoinyment(
        +patientId,
        appointmentId
      );
      if (!result) {
        res.status(404).json({
          message: "Appointment not cancelled",
        });
      }
      res.status(200).json({
        message: "Appointment successfully cancelled",
      });
    } catch (err) {
      res.status(404).json({
        err: (err as Error).message,
      });
    }
  }

  async getAppointment(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const result = await patientService.getAppointment(+id);
      if (!result) {
        res.status(404).json({
          message: "Can not find appointment with this id",
        });
      }
      res.status(200).json({
        message: "success",
        data: result,
      });
    } catch (error) {
      res.status(404).json({
        message: "",
        err: (error as Error).message,
      });
    }
  }

  async getPatientById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const result = await patientService.getPatientById(+id);
      if (!result) {
        res.status(404).json({
          message: "Patient not found with this id",
        });
      }

      res.status(200).json({
        message: "Success",
        data: result,
      });
    } catch (error) {
      res.status(404).json({
        err: (error as Error).message,
      });
    }
  }
}

export default new PatientController();
