import authRepository from "../repository/auth.repository";
import patientRepository from "../repository/patient.repository";
import { Request, Response } from "express";
import authService from "../services/auth.service";
class AuthController {
  async registerUser(req: Request, res: Response) {
    try {
      const {
        EmergencyContactName: EmergencyName,
        EmergencyContactNumber: phoneNumber,
      } = req.body;
      const isPatientAlreadyPresent =
        await patientRepository.isPatientAvailable(req.body.id, req.body.name);

      if (!isPatientAlreadyPresent) {
        const result = await authService.registerUser(
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
          message: "Patient Already present please logIn",
        });
      }
    } catch (err) {
      res.status(404).json({
        message: "Patient Already present please logIn",
        error: err as Error,
      });
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const { user, token, role } = await authService.logIn(email, password);

      if (!user) {
        res.status(404).json({
          message: "Not logged In",
        });
      }

      res.status(200).json({
        message: "Logged in successfully",
        data: user,
        token: token,
        role: role,
      });
    } catch (err) {
      res.status(404).json({
        error: err as Error,
      });
    }
  }

  async changePassword(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const { password, confirmPassword } = req.body;
      console.log(req.body);

      const result = await authService.changePassword(
        +id,
        password,
        confirmPassword
      );
      if (!result) {
        res.status(404).json({
          message: "No patient found with this id",
        });
      }
      res.status(200).json({
        message: "success",
        data: { result },
      });
    } catch (error) {
      res.status(404).json({
        err: (error as Error).message,
      });
    }
  }
}

export default new AuthController();
