import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ContactDetails } from "./contactDetails.model";
import { Appointment } from "./appointment.model";
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Matches,
  Min,
  Max,
  IsBoolean,
  Validate,
} from "class-validator";

@Entity("table_of_patients5")
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  @IsString({ message: "Name must be a string." })
  @Length(2, 50, { message: "Name must be between 2 and 50 characters long." })
  name: string;

  @Column({ type: "varchar", unique: true })
  @IsEmail({}, { message: "Please provide a valid email address." })
  email: string;

  @Column({ type: "varchar" })
  @IsString({ message: "Password must be a string." })
  @Length(6, 20, { message: "Password must be between 6 and 20 characters." })
  password: string;

  @Column({ type: "varchar" })
  @IsString({ message: "Confirm Password must be a string." })
  @Length(6, 20, {
    message: "Confirm Password must be between 6 and 20 characters.",
  })
  // Uncomment the below line if you implement a custom password match validator
  // @Validate(IsPasswordMatching, ["password", "confirmPassword"], { message: "Passwords do not match." })
  confirmPassword: string;

  @Column({ type: "int" })
  @IsInt({ message: "Age must be an integer." })
  @Min(0, { message: "Age cannot be less than 0." })
  @Max(120, { message: "Age cannot exceed 120." })
  age: number;

  @Column({ type: "varchar" })
  @Matches(/^(Male|Female|Other)$/, {
    message: "Gender must be 'Male', 'Female', or 'Other'.",
  })
  gender: string;

  @Column({ type: "varchar", nullable: true })
  @IsOptional()
  @IsString({ message: "Address must be a string." })
  @Length(0, 100, { message: "Address cannot exceed 100 characters." })
  address: string;

  @Column({ type: "varchar", nullable: true })
  @IsOptional()
  @IsString({ message: "Medical History must be a string." })
  medicalHistory: string;

  @Column({ type: "varchar", nullable: true })
  @IsOptional()
  @IsString({ message: "Current Medication must be a string." })
  currentMedication: string;

  @Column({ type: "varchar", nullable: true })
  @IsOptional()
  @IsString({ message: "Allergies must be a string." })
  allergies: string;

  @Column({ type: "bit" })
  @IsBoolean({ message: "isActive must be a boolean value (true/false)." })
  isActive: Boolean;

  @OneToMany(() => ContactDetails, (contact) => contact.patient, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "ContactId" })
  contactDetails: ContactDetails[];

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment[];
}
