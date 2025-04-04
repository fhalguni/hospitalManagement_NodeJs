import { Appointment } from "../models/appointment.model";
import appointmentRepository from "../repository/appointment.repository";

class AppointmentService {
  async bookAppointment(
    patientId: number,
    doctorId: number,
    date: Date,
    timeSlot: string
  ) {
    return await appointmentRepository.bookAppointment(
      patientId,
      doctorId,
      date,
      timeSlot
    );
  }

  async getPatientAppointmentBySlot(
    date: Date,
    timeSlot: string,
    doctorId: number
  ) {
    return appointmentRepository.getpatientAppointmentsBySlots(
      date,
      timeSlot,
      doctorId
    );
  }
}

export default new AppointmentService();
