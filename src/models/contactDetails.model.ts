import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Patient } from "./patient.model";
import { IsString, Length, Matches } from "class-validator";

@Entity("table_of_EmergencyContacts2")
export class ContactDetails {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ type: "varchar" })
  @IsString()
  @Length(2, 50)
  name: string;

  @Column({ type: "varchar", length: 10 })
  @Matches(/^\d{10}$/, {
    message: "Phone number must be exactly 10 digits.",
  })
  phoneNumber: string;

  @ManyToOne(() => Patient, (patient) => patient.contactDetails)
  patient: Patient;
}
