import express from "express";
import { AppDataSourse } from "./config/database.config";
import { patientRouter } from "./routes/patient.routes";
import { ContactRouter } from "./routes/contactDetail.routes";
const app = express();

app.use(express.json());

AppDataSourse.initialize()
  .then(() => {
    console.log("Database connected successfully...");
  })
  .catch((err) => console.log("Database connection issue...", err));

app.use("/patient", patientRouter);
app.use("/contact", ContactRouter);

const port = 8000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
