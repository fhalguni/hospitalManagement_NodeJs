import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./appointment.model";
import {
  IsString,
  Length,
  IsEmail,
  IsOptional,
  IsBoolean,
} from "class-validator";

@Entity("table_of_doctor5")
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  @IsString({ message: "Name must be a string." })
  @Length(2, 50, { message: "Name must be between 2 and 50 characters long." })
  name: string;

  @Column({ type: "varchar" })
  @IsString({ message: "Speciality must be a string." })
  @Length(2, 50, {
    message: "Speciality must be between 2 and 50 characters long.",
  })
  speciality: string;

  @Column({ type: "varchar", unique: true })
  @IsEmail({}, { message: "Please provide a valid email address." })
  email: string;

  @Column({ type: "varchar" })
  gender: string;

  @Column({ type: "varchar" })
  @IsString({ message: "Password must be a string." })
  @Length(6, 20, { message: "Password must be between 6 and 20 characters." })
  password: string;

  @Column({ type: "varchar", nullable: true })
  degree: string;

  @Column({ type: "bit" })
  @IsBoolean({ message: "isActive must be a boolean value (true/false)." })
  isActive: Boolean;

  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointments: Appointment[];
}
