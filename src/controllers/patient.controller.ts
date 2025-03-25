import { Request, Response } from "express";
import patientService from "../services/patient.service";

class PatientController {
  async createPatient(req: Request, res: Response) {
    try {
      const { EmergencyName, phoneNumber } = req.body;
      const isPatientAlreadyPresent = await patientService.isPatientAvailable(
        req.body.id,
        req.body.name
      );

      if (!isPatientAlreadyPresent) {
        const result = await patientService.createPatient(
          { ...req.body },
          EmergencyName,
          phoneNumber
        );
        res.status(201).json({
          message: "Patient created",
          data: result,
        });
      } else {
        res.status(401).json({
          message: "Patient not created",
        });
      }
    } catch (err) {
      res.status(404).json({
        error: err as Error,
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
}

export default new PatientController();
