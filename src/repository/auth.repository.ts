import { AppDataSourse } from "../config/database.config";
import { Appointment } from "../models/appointment.model";
import { ContactDetails } from "../models/contactDetails.model";
import { Patient } from "../models/patient.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthRepository {
  contactRepository = AppDataSourse.getRepository(ContactDetails);
  patientRepository = AppDataSourse.getRepository(Patient);
  AppointmentRepository = AppDataSourse.getRepository(Appointment);

  async getPatientByEmail(email: string) {
    return await this.patientRepository.findOneBy({ email: email });
  }
}

export default new AuthRepository();
