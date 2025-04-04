import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Patient } from "./patient.model";
import { Doctor } from "./doctor.model";
import { IsDate, IsString, Matches, Length } from "class-validator";

@Entity("table_of_appointment2")
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date" })
  @IsDate()
  day: Date;

  @Column({ type: "varchar", length: 10 })
  @IsString()
  @Matches(/^(8-10|11-1|2-4)$/, { message: "Invalid time slot." })
  timeSlot: string;

  @Column({ type: "varchar", length: 20 })
  @IsString()
  @Length(2, 20)
  status: string;

  @ManyToOne(() => Patient, (patient) => patient.appointments)
  patient: Patient;

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments)
  doctor: Doctor;
}
