import { AppDataSourse } from "../config/database.config";
import { Appointment } from "../models/appointment.model";
import { ContactDetails } from "../models/contactDetails.model";
import { Doctor } from "../models/doctor.model";
import { Patient } from "../models/patient.model";
import bcrypt from "bcrypt";
class PatientRepo {
  patientRepository = AppDataSourse.getRepository(Patient);
  contactRepository = AppDataSourse.getRepository(ContactDetails);
  appointmentRepository = AppDataSourse.getRepository(Appointment);

  async updatePatient(id: number, data: Partial<Patient>) {
    return await this.patientRepository.update(id, { ...data });
  }

  async deletePatient(id: number) {
    return await this.patientRepository.delete(id);
  }

  async patientFindById(id: number) {
    return await this.patientRepository.findOne({ where: { id: id } });
  }

  async isPatientAvailable(id: number, name: string) {
    return await this.patientRepository.findOneBy({ id: id, name: name });
  }

  async rescheduleAppointment(
    appointmentId: number,
    patientId: number,

    data: { doctorId: number; day: Date; timeSlot: string }
  ) {
    const appointment = await this.appointmentRepository.find({
      where: { patient: { id: patientId } },
    });

    const isAppointmentPresent = appointment.find(
      (appointments) => appointments.id === appointmentId
    );

    if (!isAppointmentPresent) {
      throw new Error("No appointment found with this id");
    }
    const result = await this.appointmentRepository.update(
      { id: isAppointmentPresent?.id },
      {
        doctor: { id: data.doctorId },
        status: "Pending",
        day: data.day,
        timeSlot: data.timeSlot,
      }
    );

    return result;
  }

  async getPatientById(id: number) {
    const patient = await this.patientRepository.findOne({
      where: { id: id },
      relations: ["contactDetails"],
    });
    console.log("patient:", patient);
    return patient;
  }

  async getAllAppointment(patientId: number) {
    const appointment = await this.appointmentRepository.find({
      where: { patient: { id: patientId } },
      relations: ["doctor"],
    });

    return appointment;
  }

  async cancelAppointment(patientId: number, appointmentId: number) {
    const appointment = await this.appointmentRepository.find({
      where: { patient: { id: patientId } },
    });

    const isAppointmentPresent = appointment.find(
      (appointments) => appointments.id === appointmentId
    );

    if (!isAppointmentPresent) {
      throw new Error("No appointment found with this id");
    }

    return await this.appointmentRepository.delete({
      id: isAppointmentPresent?.id,
    });
  }

  async getAppointment(id: number) {
    return await this.appointmentRepository.find({ where: { id: id } });
  }
}
export default new PatientRepo();
