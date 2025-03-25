import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ContactDetails } from "./contactDetails.model";
@Entity("patient_tbl11")
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "varchar" })
  name: string;
  @Column({ type: "int" })
  age: number;
  @Column({ type: "varchar" })
  gender: string;

  @Column({ type: "varchar" })
  address: string;

  @Column({ type: "varchar" })
  medicalHistory: string;

  @Column({ type: "varchar" })
  currentMedication: string;

  @Column({ type: "varchar" })
  allergies: string;
  @OneToMany(() => ContactDetails, (contact) => contact.patient)
  @JoinColumn({ name: "ContactId" })
  contactDetails: ContactDetails[];
}
