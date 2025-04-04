import adminRepository from "../repository/admin.repository";
import patientRepository from "../repository/patient.repository";

class AdminService {
  async createAdmin(name: string, speciality: string, email: string) {
    return await adminRepository.createDoctor(name, speciality, email);
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
}
export default new AdminService();
