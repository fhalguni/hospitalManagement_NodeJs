import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Patient } from "./patient.model";

@Entity("contact_details11")
export class ContactDetails {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "varchar" })
  name: string;
  @Column({ type: "varchar", length: 10 })
  phoneNumber: string;

  @ManyToOne(() => Patient, (patient) => patient.contactDetails)
  patient: Patient;
}
