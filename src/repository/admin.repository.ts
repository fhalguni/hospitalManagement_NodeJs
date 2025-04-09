import { AppDataSourse } from "../config/database.config";
import { Appointment } from "../models/appointment.model";
import { Doctor } from "../models/doctor.model";
import { Patient } from "../models/patient.model";

class AdminRepo {
  doctorRepository = AppDataSourse.getRepository(Doctor);
  patientRepository = AppDataSourse.getRepository(Patient);
  appointmentRepository = AppDataSourse.getRepository(Appointment);
  async createDoctor(
    name: string,
    speciality: string,
    email: string,
    gender: string,
    degree: string
  ) {
    const password = email.split("@")[0] + Math.random().toString(36).slice(-6);
    const isActive = true;
    const newDoctor = this.doctorRepository.create({
      name,
      speciality,
      email,
      password,
      isActive,
      gender,
      degree,
    });
    return await this.doctorRepository.save(newDoctor);
  }

  async getAllDoctor() {
    return await this.doctorRepository.find();
  }

  async getAllPatients() {
    return await this.patientRepository.find();
  }

  async deletePatient(id: number) {
    return await this.patientRepository.update(id, { isActive: false });
  }

  async displayAppointmentOfPatient(id: number) {
    return await this.appointmentRepository.find({
      where: { patient: { id: id } },
      relations: ["doctor"],
    });
  }

  async displayAppointmentOfDoctor(id: number) {
    return await this.appointmentRepository.find({
      where: { doctor: { id: id } },
      relations: ["patient"],
    });
  }
  async deleteDoctor(id: number) {
    return await this.doctorRepository.update(id, {
      isActive: false,
    });
  }

  async activePatient(id: number) {
    return await this.patientRepository.update(id, { isActive: true });
  }

  async getPatient(id: number) {
    return await this.patientRepository.find({
      where: {
        id: id,
      },
    });
  }

  async activeDoctor(id: number) {
    return await this.doctorRepository.update(id, { isActive: true });
  }
}

export default new AdminRepo();
