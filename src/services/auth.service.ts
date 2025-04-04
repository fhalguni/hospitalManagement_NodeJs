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

  async getUserByEmail(email: string) {
    return await authRepository.getPatientByEmail(email);
  }
}
export default new AuthService();
