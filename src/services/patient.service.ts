import { Appointment } from "../models/appointment.model";
import { Patient } from "../models/patient.model";
import patientRepository from "../repository/patient.repository";

class PatientService {
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

  async getAllAppointment(patientId: number) {
    return await patientRepository.getAllAppointment(patientId);
  }
  async rescheduleAppointment(
    id: number,
    patientId: number,
    data: { doctorId: number; day: Date; timeSlot: string }
  ) {
    console.log({
      id,
      patientId,
      data,
    });

    return await patientRepository.rescheduleAppointment(id, patientId, data);
  }

  async cancelAppoinyment(patientID: number, appointmentId: number) {
    return await patientRepository.cancelAppointment(patientID, appointmentId);
  }

  async getAppointment(id: number) {
    return await patientRepository.getAppointment(id);
  }

  async getPatientById(id: number) {
    return await patientRepository.getPatientById(id);
  }
}

export default new PatientService();
