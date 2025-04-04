import doctorRepository from "../repository/doctor.repository";
import jwt from "jsonwebtoken";
const secret_key = "sbdasbduasbcsacbbjhbiu";

class DoctorService {
  async createDoctor(name: string, speciality: string) {
    return await doctorRepository.createDoctor(name, speciality);
  }

  async getAllAppointments(id: number) {
    return await doctorRepository.getAllAppointments(id);
  }

  async logInDoctor(email: string, password: string) {
    const doctors = await doctorRepository.getDoctorByEmail(email); // Returns an array of doctors
    const doctor = doctors.find((d) => d.email === email);
    if (!doctor) throw new Error("No user found, Invalid Credentials");

    // const isValidDoctor = doctor.find((d) => d.password === password);

    if (doctor.password !== password) throw new Error("Invalid Credentials");

    // Sign the token using the doctor's ID
    const token = jwt.sign({ id: doctor.id }, secret_key, {
      expiresIn: "1hr",
    });

    return { doctor, token };
  }

  async getAllDoctor() {
    return await doctorRepository.getAllDoctors();
  }

  async confirmAppointment(doctorId: number, appointmentId: number) {
    return await doctorRepository.confirmAppointment(doctorId, appointmentId);
  }

  async rejectAppointments(doctorId: number, appointmentId: number) {
    return await doctorRepository.rejectAppointment(doctorId, appointmentId);
  }
}

export default new DoctorService();
