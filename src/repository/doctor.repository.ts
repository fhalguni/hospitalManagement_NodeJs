import { AppDataSourse } from "../config/database.config";
import { Appointment } from "../models/appointment.model";
import { Doctor } from "../models/doctor.model";
import { sendConfirmationMail } from "../utils/SendConfirmationEmail";

class DoctorRepository {
  doctorRepository = AppDataSourse.getRepository(Doctor);
  appointmentRepository = AppDataSourse.getRepository(Appointment);
  async createDoctor(name: string, speciality: string) {
    const newDoctor = this.doctorRepository.create({ name, speciality });
    return await this.doctorRepository.save(newDoctor);
  }

  async getDoctor(id: number) {
    return await this.doctorRepository.findOneBy({ id });
  }
  async getAllAppointments(id: number) {
    const appointment = await this.appointmentRepository.find({
      where: { doctor: { id: id } },
      relations: ["patient"],
    });

    return appointment;
  }

  async updatePassword(id: number, password: string) {
    return await this.doctorRepository.update(id, { password: password });
  }
  async getAllDoctors() {
    return await this.doctorRepository.find({ where: { isActive: true } });
  }

  async getPatientById(patientId: number, doctorId: number) {
    const patientData = await this.appointmentRepository.find({
      where: {
        patient: { id: patientId },
        doctor: { id: doctorId },
      },
      relations: ["patient", "doctor"], // To fetch associated patient and doctor data
    });

    return patientData.map((appointment) => appointment.patient);
  }

  async getDoctorByEmail(email: string) {
    return await this.doctorRepository.find({ where: { email: email } });
  }

  async confirmAppointment(doctorId: number, appointmentId: number) {
    const appointments = await this.appointmentRepository.find({
      where: { doctor: { id: doctorId } },
      relations: ["patient", "doctor"], // Include patient and doctor relations
    });
    console.log("Doctor appointments:", appointments);

    // Find the specific appointment
    const selectedAppointment = appointments.find(
      (appointment) => appointment.id === appointmentId
    );

    if (!selectedAppointment) {
      throw new Error("No appointment with this id");
    }
    // console.log("Selected appointment:", selectedAppointment);

    const updateResult = await this.appointmentRepository.update(
      { id: selectedAppointment.id },
      { status: "Confirmed" }
    );

    // If update was successful and we have patient email
    if (updateResult.affected! > 0 && selectedAppointment.patient?.email) {
      // Send confirmation email to patient
      await sendConfirmationMail(
        selectedAppointment.patient.email,
        "Confirmed",
        selectedAppointment.day,
        selectedAppointment.timeSlot
      );
    }
    return updateResult;
  }

  async rejectAppointment(doctorId: number, appointmentId: number) {
    const appointments = await this.appointmentRepository.find({
      where: { doctor: { id: doctorId } },
      relations: ["patient", "doctor"],
    });

    const selectedAppointment = appointments.find(
      (appointment) => appointment.id === appointmentId
    );
    if (!selectedAppointment) {
      throw new Error("No appointment with this id");
    }

    const updateResult = await this.appointmentRepository.update(
      { id: selectedAppointment.id },
      { status: "Cancelled" }
    );
    if (updateResult.affected! > 0 && selectedAppointment.patient?.email) {
      // Send confirmation email to patient
      await sendConfirmationMail(
        selectedAppointment.patient.email,
        "Cancelled",
        selectedAppointment.day,
        selectedAppointment.timeSlot
      );
    }
    return updateResult;
  }
}
export default new DoctorRepository();
