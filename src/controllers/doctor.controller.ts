import { Request, Response } from "express";
import doctorService from "../services/doctor.service";

class DoctorController {
  // async createDoctor(req: Request, res: Response) {
  //   try {
  //     const { name, speciality } = req.body;
  //     const result = await doctorService.createDoctor(name, speciality);
  //     if (!result) {
  //       res.status(401).json({
  //         message: "Doctor not created",
  //       });
  //     }
  //     res.status(200).json({
  //       message: "Doctor created",
  //       data: result,
  //     });
  //   } catch (err) {
  //     res.status(401).json({
  //       error: (err as Error).message,
  //     });
  //   }
  // }

  async getAllAppointments(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const result = await doctorService.getAllAppointments(+id);

      if (!result) {
        res.status(404).json({
          message: "No appointment found with this id",
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

  async getAllDoctors(req: Request, res: Response) {
    try {
      const result = await doctorService.getAllDoctor();
      if (!result) {
        res.status(404).json({
          message: "No data found",
        });
      }
      res.status(200).json({
        message: "success",
        data: result,
      });
    } catch (err) {
      res.status(401).json({
        error: (err as Error).message,
      });
    }
  }

  async logInDoctor(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { doctor, token } = await doctorService.logInDoctor(
        email,
        password
      );
      if (!doctor) {
        res.status(404).json({
          message: "Doctor not loggined",
        });
      }
      res.status(200).json({
        message: "Doctor LogIned",
        data: doctor,
        token,
      });
    } catch (error) {
      res.status(404).json({
        err: (error as Error).message,
      });
    }
  }

  async confirmAppointment(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const { appointmentId } = req.body;
      const result = await doctorService.confirmAppointment(+id, appointmentId);
      if (!result) {
        res.status(404).json({
          message: "not confirmed appointment",
        });
      }
      res.status(200).json({
        message: "Appointment confirmed successfully",
        data: result,
      });
    } catch (error) {
      res.status(404).json({
        err: (error as Error).message,
      });
    }
  }

  async rejectAppointment(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const { appointmentId } = req.body;
      const result = await doctorService.rejectAppointments(+id, appointmentId);
      if (!result) {
        res.status(404).json({
          message: "not deleted appointment",
        });
      }
      res.status(200).json({
        message: "Appointment deleted successfully",
        data: result,
      });
    } catch (error) {
      res.status(404).json({
        err: (error as Error).message,
      });
    }
  }

  async getDoctor(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const result = await doctorService.getDoctor(+id);
      if (!result) {
        res.status(404).json({
          message: "No doctor found with this id",
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

  async updatePassword(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const { password } = req.body;
     

      const result = await doctorService.updatePassword(+id, password);
      if (!result) {
        res.status(404).json({
          message: "No doctor found with this id",
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
}
export default new DoctorController();
