import { AppDataSourse } from "../config/database.config";
import { Appointment } from "../models/appointment.model";
import { ContactDetails } from "../models/contactDetails.model";
import { Patient } from "../models/patient.model";
import authRepository from "../repository/auth.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const secret_key = "abcdefghijklmnopqrstuvwxyz";
class AuthService {
  contactRepository = AppDataSourse.getRepository(ContactDetails);
  patientRepository = AppDataSourse.getRepository(Patient);
  AppointmentRepository = AppDataSourse.getRepository(Appointment);
  async registerUser(
    patient: Partial<Patient>,
    name: string,
    phoneNumber: string
  ) {
    const { password, ...rest } = patient;
    const contactDetails = this.contactRepository.create({ name, phoneNumber });
    const newContact = await this.contactRepository.save(contactDetails);

    if (patient.password === patient.confirmPassword) {
      const hashedPassword = await bcrypt.hash(patient.password!, 10);
      console.log(hashedPassword);

      const newPatient = this.patientRepository.create({
        password: hashedPassword,
        isActive: true,
        ...rest,
        contactDetails: [newContact],
      });
      return await this.patientRepository.save(newPatient);
    } else {
      throw new Error("Password not matched");
    }
  }

  async loginUser(email: string, password: string) {
    const user = await authRepository.getPatientByEmail(email);
    if (!user) throw new Error("No data found, Invalid Credentials");

    if (user.isActive === false) {
      throw new Error("You are no longer exist");
    }

    const isValidUser = await bcrypt.compare(password, user.password);

    if (!isValidUser) throw new Error("Invalid Credentials");

    const token = jwt.sign({ id: user.id, email: user.email }, secret_key, {
      expiresIn: "1hr",
    });

    return { user, token };
  }

  async logIn(email: string, password: string) {
    const doctor = await authRepository.getDoctorByEmail(email);

    const patient = await authRepository.getPatientByEmail(email);
    if (doctor) {
      if (doctor.isActive === false) {
        throw new Error("You are no longer exist");
      }

      if (password != doctor.password) throw new Error("Invalid Credentials");
      const role = "doctor";
      const token = jwt.sign(
        { id: doctor.id, email: doctor.email },
        secret_key,
        {
          expiresIn: "1hr",
        }
      );

      return { user: doctor, token, role };
    } else if (patient) {
      if (patient.isActive === false) {
        throw new Error("You are no longer exist");
      }

      const isValidUser = await bcrypt.compare(password, patient.password);

      if (!isValidUser) throw new Error("Invalid Credentials");
      const role = "patient";
      const token = jwt.sign(
        { id: patient.id, email: patient.email },
        secret_key,
        {
          expiresIn: "1hr",
        }
      );

      return { user: patient, token, role };
    } else if (email === "admin123@gmail.com" && password === "admin1234") {
      const admin = { email: "admin123@gmail.com", password: "admin1234" };
      const role = "admin";
      const token = jwt.sign({ email: email }, secret_key, {
        expiresIn: "1hr",
      });
      return { user: admin, token, role };
    } else {
      throw new Error("Invalid Credentials");
    }
  }
  async getUserByEmail(email: string) {
    return await authRepository.getPatientByEmail(email);
  }

  async changePassword(id: number, password: string, confirmPassword: string) {
    if (password != confirmPassword) {
      throw new Error("Password not matched");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.patientRepository.update(id, {
      password: hashedPassword,
      confirmPassword,
    });
  }
}
export default new AuthService();
