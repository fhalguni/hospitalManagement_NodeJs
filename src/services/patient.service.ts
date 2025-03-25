import { Patient } from "../models/patient.model";
import patientRepository from "../repository/patient.repository";

class PatientService {
  async createPatient(
    patient: Partial<Patient>,
    name: string,
    phoneNumber: string
  ) {
    return await patientRepository.createPatient(patient, name, phoneNumber);
  }

  async updatePatient(id: number, data: Partial<Patient>) {
    return await patientRepository.updatePatient(id, data);
  }

  async deletePatient(id: number) {
    return await patientRepository.deletePatient(id);
  }

  async findPatientById(id: number) {
    return await patientRepository.patientFindById(id);
  }

  async isPatientAvailable(id: number, name: string) {
    return await patientRepository.isPatientAvailable(id, name);
  }
}

export default new PatientService();
