import { Request } from "express";

export interface DoctorRequest extends Request {
  doctor: any;
}
