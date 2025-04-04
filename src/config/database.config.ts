import express from "express";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Patient } from "../models/patient.model";
import { ContactDetails } from "../models/contactDetails.model";
import { Appointment } from "../models/appointment.model";

dotenv.config({ path: "config.env" });
export const AppDataSourse = new DataSource({
  type: "mssql",
  port: 1982,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  entities: ["./src/models/*.ts"],
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
  authentication: {
    type: "default",
    options: {
      userName: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
    },
  },
});
