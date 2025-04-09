import { Request, Response } from "express";
import adminService from "../services/admin.service";

class AdminController {
  async createDoctor(req: Request, res: Response) {
    try {
      const { name, speciality, email, gender, degree } = req.body;
      const result = await adminService.createDoctor(
        name,
        speciality,
        email,
        gender,
        degree
      );
      if (!result) {
        res.status(401).json({
          message: "No doctor created",
        });
      }
      res.status(200).json({
        message: "Email send successfully",
        data: result,
      });
    } catch (error) {
      res.status(401).json({
        err: (error as Error).message,
      });
    }
  }

  async getAllDoctor(req: Request, res: Response) {
    try {
      const result = await adminService.getAllDoctors();
      if (!result) {
        res.status(404).json({
          message: "No data found",
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
  async getAllPatient(req: Request, res: Response) {
    try {
      const result = await adminService.getAllPatients();
      if (!result) {
        res.status(404).json({
          message: "No data found",
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

  async deletePatient(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const result = await adminService.deletePatient(+id);
      if (!result) {
        res.status(404).json({
          message: "Something went wrong",
        });
      }
      res.status(200).json({
        message: "Patient deleted successfully",
      });
    } catch (error) {
      res.status(404).json({
        err: (error as Error).message,
      });
    }
  }

  async displayAppointmentOfPatient(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const result = await adminService.displayAppointmentOfPatient(+id);
      if (!result) {
        res.status(404).json({
          message: "Patient not found with this id",
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

  async deleteDoctor(req: Request, res: Response) {
    try {
      const id = req.params.id;
      console.log(id);

      const result = await adminService.deleteDoctor(+id);

      if (!result) {
        res.status(404).json({
          message: "Something went wrong",
        });
      }
      res.status(200).json({
        message: "doctor deleted successfully",
      });
    } catch (error) {
      res.status(404).json({
        err: (error as Error).message,
      });
    }
  }

  async getAllAppointmentOfDoctor(req: Request, res: Response) {
    try {
      const id = req.params.id;
      console.log();

      const result = await adminService.getAllAppointmentOfDoctor(+id);

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

  async activePatient(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const result = await adminService.activePatient(+id);
      if (!result) {
        res.status(404).json({
          message: "No id found with this id",
        });
      }
      res.status(200).json({
        message: "sucess",
        data: result,
      });
    } catch (error) {
      res.status(404).json({
        err: (error as Error).message,
      });
    }
  }

  async getPatient(req: Request, res: Response) {
    try {
      const id = req.params.id;
      console.log(id);

      const result = await adminService.getPatient(+id);
      if (!result) {
        res.status(404).json({
          message: "No patient with this id",
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

  async activeAdmin(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const result = await adminService.activeDoctor(+id);
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

export default new AdminController();
