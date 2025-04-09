import adminRepository from "../repository/admin.repository";
import patientRepository from "../repository/patient.repository";
import { sendMail } from "../utils/sendEmail";

class AdminService {
  async createDoctor(
    name: string,
    speciality: string,
    email: string,
    gender: string,
    degree: string
  ) {
    const doctor = await adminRepository.createDoctor(
      name,
      speciality,
      email,
      gender,
      degree
    );
    if (doctor) {
      await sendMail(doctor.email, doctor.password);
    }
    return doctor;
  }

  async getAllDoctors() {
    return await adminRepository.getAllDoctor();
  }
  async getAllPatients() {
    return await adminRepository.getAllPatients();
  }

  async deletePatient(id: number) {
    return await adminRepository.deletePatient(id);
  }

  async displayAppointmentOfPatient(id: number) {
    return await adminRepository.displayAppointmentOfPatient(id);
  }

  async deleteDoctor(id: number) {
    return await adminRepository.deleteDoctor(id);
  }

  async getAllAppointmentOfDoctor(id: number) {
    return await adminRepository.displayAppointmentOfDoctor(id);
  }

  async activePatient(id: number) {
    return await adminRepository.activePatient(id);
  }

  async getPatient(id: number) {
    return await adminRepository.getPatient(id);
  }

  async activeDoctor(id: number) {
    return await adminRepository.activeDoctor(id);
  }
}
export default new AdminService();
