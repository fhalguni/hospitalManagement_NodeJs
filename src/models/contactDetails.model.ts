import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Patient } from "./patient.model";
import { IsString, Length, Matches, IsOptional } from "class-validator";

@Entity("table_of_EmergencyContacts5")
export class ContactDetails {
  @PrimaryGeneratedColumn("uuid")
  id: string; // Changed to string for UUID type consistency

  @Column({ type: "varchar" })
  @IsString({ message: "Name must be a string." })
  @Length(2, 50, { message: "Name must be between 2 and 50 characters long." })
  name: string;

  @Column({ type: "varchar", length: 10 })
  @Matches(/^\d{10}$/, {
    message: "Phone number must be exactly 10 digits.",
  })
  phoneNumber: string;

  @Column({ type: "varchar", nullable: true })
  @IsOptional()
  @IsString({ message: "Relationship must be a string if provided." })
  @Length(2, 30, {
    message: "Relationship must be between 2 and 30 characters long.",
  })
  relationship?: string; // Optional field for specifying relation to the patient

  @ManyToOne(() => Patient, (patient) => patient.contactDetails)
  patient: Patient;
}
