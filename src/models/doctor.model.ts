import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./appointment.model";
import { IsString, Length } from "class-validator";

@Entity("table_of_doctor2")
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  @IsString()
  @Length(2, 50)
  name: string;

  @Column({ type: "varchar" })
  @IsString()
  @Length(2, 50)
  speciality: string;

  @Column({ type: "varchar" })
  email: string;

  @Column({ type: "varchar" })
  password: string;

  @Column({ type: "bit" })
  isActive: Boolean;

  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointments: Appointment[];
}
