import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Patient } from "./patient.model";
import { Doctor } from "./doctor.model";
import { IsDate, IsString, Matches, Length, IsOptional } from "class-validator";

@Entity("table_of_appointment5")
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date" })
  @IsDate({ message: "Please provide a valid date for the appointment." })
  day: Date;

  @Column({ type: "varchar", length: 10 })
  @IsString({ message: "Time slot must be a string." })
  @Matches(/^(8-10|11-1|2-4)$/, {
    message: "Time slot must be one of the following: 8-10, 11-1, or 2-4.",
  })
  timeSlot: string;

  @Column({ type: "varchar", length: 20 })
  @IsString({ message: "Status must be a string." })
  @Length(2, 20, {
    message: "Status must be between 2 and 20 characters long.",
  })
  status: string;

  @Column({ type: "varchar", length: 200, nullable: true })
  @IsOptional()
  @IsString({ message: "Remarks must be a string if provided." })
  @Length(0, 200, {
    message: "Remarks cannot exceed 200 characters.",
  })
  remarks?: string; // Optional field for additional information about the appointment

  @ManyToOne(() => Patient, (patient) => patient.appointments)
  patient: Patient;

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments)
  doctor: Doctor;
}
