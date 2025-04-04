import express from "express";
import { AppDataSourse } from "./config/database.config";
import { patientRouter } from "./routes/patient.routes";
import { ContactRouter } from "./routes/contactDetail.routes";
import { DoctorRouter } from "./routes/doctor.routes";
import { appointmentRouter } from "./routes/appointment.routes";
import { AuthRouter } from "./routes/auth.routes";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { configureSocket } from "./socket/socket.handler";
import { adminRouter } from "./routes/admin.routes";
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
    allowedHeaders: "*",
  })
);

AppDataSourse.initialize()
  .then(() => {
    console.log("Database connected successfully...");
  })
  .catch((err) => console.log("Database connection issue...", err));

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

configureSocket(io);
app.use("/patient", patientRouter);
app.use("/contact", ContactRouter);
app.use("/doctor", DoctorRouter);
app.use("/book", appointmentRouter);
app.use("/auth", AuthRouter);
app.use("/admin", adminRouter);

const port = 8000;
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
