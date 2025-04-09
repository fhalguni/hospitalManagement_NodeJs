import { AppDataSourse } from "../config/database.config";
import { Appointment } from "../models/appointment.model";
import { ContactDetails } from "../models/contactDetails.model";
import { Patient } from "../models/patient.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Doctor } from "../models/doctor.model";

class AuthRepository {
  contactRepository = AppDataSourse.getRepository(ContactDetails);
  patientRepository = AppDataSourse.getRepository(Patient);
  AppointmentRepository = AppDataSourse.getRepository(Appointment);
  doctorRepository = AppDataSourse.getRepository(Doctor);

  async getPatientByEmail(email: string) {
    return await this.patientRepository.findOneBy({ email: email });
  }

  async getDoctorByEmail(email: string) {
    return await this.doctorRepository.findOneBy({ email: email });
  }

  // async changePasswrd(id: number, password: string, confirmPassword: string) {
  //   return await this.patientRepository.update(id, {
  //     password,
  //     confirmPassword,
  //   });
  // }
}

export default new AuthRepository();
