import { Server, Socket } from "socket.io";
import appointmentRepository from "../repository/appointment.repository";
import appointmentService from "../services/appointment.service";
let io: Server;
export const configureSocket = (socketIo: Server) => {
  io = socketIo;
  io.on("connection", (socket: Socket) => {
    console.log("user connected with :", socket.id);

    socket.on(
      "slotBook",
      async (data: { doctorId: number; day: Date; timeSlot: string }) => {
        try {
          socket.join(data.doctorId + "");
          console.log("User joined to docter room " + data.doctorId);

          console.log(data);

          console.log(`patient has booked appointment `);
          const patients = await appointmentService.getPatientAppointmentBySlot(
            data.day,
            data.timeSlot,
            data.doctorId
          );

          if (patients.length >= 5) {
            // Notify client that slot is unavailable
            console.log("Patient length is greater than 5");

            socket
              .to(data.doctorId + "")
              .emit("slotUnavailable", { message: "Slot is full" });
            return;
          }
          console.log("Emiting patient count to frontend");

          // Notify doctor of new patient count
          socket.to(data.doctorId + "").emit("patientCountUpdate", {
            count: patients.length,
          });
        } catch (error) {
          console.error("Error handling slotBook event:", error);
        }
      }
    );
  });
};

export const getSocketIO = () => io;
