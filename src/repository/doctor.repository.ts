import { AppDataSourse } from "../config/database.config";
import { Appointment } from "../models/appointment.model";
import { Doctor } from "../models/doctor.model";

class DoctorRepository {
  doctorRepository = AppDataSourse.getRepository(Doctor);
  appointmentRepository = AppDataSourse.getRepository(Appointment);
  async createDoctor(name: string, speciality: string) {
    const newDoctor = this.doctorRepository.create({ name, speciality });
    return await this.doctorRepository.save(newDoctor);
  }

  async getAllAppointments(id: number) {
    const appointment = await this.appointmentRepository.find({
      where: { doctor: { id: id } },
      relations: ["patient"],
    });

    return appointment;
  }

  async getAllDoctors() {
    return await this.doctorRepository.find();
  }

  async getDoctorByEmail(email: string) {
    return await this.doctorRepository.find({ where: { email: email } });
  }

  async confirmAppointment(doctorId: number, appointmentId: number) {
    const appointments = await this.appointmentRepository.find({
      where: { doctor: { id: doctorId } },
    });

    const selectedAppointment = appointments.find(
      (appointment) => appointment.id === appointmentId
    );
    if (!selectedAppointment) {
      throw new Error("No appointment with this id");
    }

    return await this.appointmentRepository.update(
      { id: selectedAppointment?.id },
      {
        status: "Confirmed",
      }
    );
  }

  async rejectAppointment(doctorId: number, appointmentId: number) {
    const appointments = await this.appointmentRepository.find({
      where: { doctor: { id: doctorId } },
    });

    const selectedAppointment = appointments.find(
      (appointment) => appointment.id === appointmentId
    );
    if (!selectedAppointment) {
      throw new Error("No appointment with this id");
    }

    return await this.appointmentRepository.update(
      { id: selectedAppointment.id },
      { status: "Cancelled" }
    );
  }
}
export default new DoctorRepository();
