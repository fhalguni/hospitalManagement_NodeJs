import { AppDataSourse } from "../config/database.config";
import { Appointment } from "../models/appointment.model";
import { Doctor } from "../models/doctor.model";
import { Patient } from "../models/patient.model";
import { getSocketIO } from "../socket/socket.handler";

class AppointmentRepository {
  doctorRepository = AppDataSourse.getRepository(Doctor);
  appointmentRepository = AppDataSourse.getRepository(Appointment);
  patientRepository = AppDataSourse.getRepository(Patient);
  async bookAppointment(
    patientId: number,
    doctorId: number,
    date: Date,
    timeSlot: string
  ) {
    const io = getSocketIO();

    // Fetch the Patient entity
    const patient = await this.patientRepository.findOneBy({ id: patientId });
    if (!patient) {
      throw new Error("Patient not found");
    }

    // Fetch the Doctor entity
    const doctor = await this.doctorRepository.findOneBy({ id: doctorId });
    if (!doctor) {
      throw new Error("Doctor not found");
    }

    // Create a new appointment
    const appointment = await this.appointmentRepository
      .createQueryBuilder()
      .insert()
      .into("table_of_appointment5")
      .values({
        day: date, // Explicitly include the 'day' field
        timeSlot: timeSlot,
        status: "Pending",
        patient: patient,
        doctor: doctor,
      })
      .execute();

    // Fetch the saved appointment with doctor details
    const savedAppointment = await this.appointmentRepository.findOne({
      where: { id: appointment.identifiers[0].id },
      relations: ["doctor"], // Include the doctor entity
    });

    // Notify the doctor about the updated patient count
    const patients = await this.getpatientAppointmentsBySlots(
      date,
      timeSlot,
      doctorId
    );

    io.to(doctorId.toString()).emit("patientCountUpdate", {
      count: patients.length,
    });

    return savedAppointment; // Return the appointment including doctor details
  }

  async getpatientAppointmentsBySlots(
    date: Date,
    timeSlot: string,
    doctorId: number
  ) {
    return this.appointmentRepository.find({
      where: {
        doctor: { id: doctorId },
        day: date,
        timeSlot: timeSlot,
      },
    });
  }
}
export default new AppointmentRepository();
