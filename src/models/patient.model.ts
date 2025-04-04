import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ContactDetails } from "./contactDetails.model";
import { Appointment } from "./appointment.model";
// import { IsPasswordMatching } from "./validators/passwordMatch.validator";
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Matches,
  Min,
  Validate,
} from "class-validator";

@Entity("table_of_patients2")
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  @IsString()
  @Length(2, 50)
  name: string;

  @Column({ type: "varchar" })
  @IsEmail()
  email: string;

  @Column({ type: "varchar" })
  @IsString()
  @Length(6, 20)
  password: string;

  @Column({ type: "varchar" })
  @IsString()
  @Length(6, 20)
  // @Validate(IsPasswordMatching, ["password", "confirmPassword"], {
  //   message: "Passwords do not match.",
  // })
  confirmPassword: string;

  @Column({ type: "int" })
  @IsInt()
  @Min(0)
  age: number;

  @Column({ type: "varchar" })
  @Matches(/^(Male|Female|Other)$/)
  gender: string;

  @Column({ type: "varchar", nullable: true })
  @IsOptional()
  @IsString()
  @Length(0, 100)
  address: string;

  @Column({ type: "varchar", nullable: true })
  @IsOptional()
  @IsString()
  medicalHistory: string;

  @Column({ type: "varchar", nullable: true })
  @IsOptional()
  @IsString()
  currentMedication: string;

  @Column({ type: "varchar", nullable: true })
  @IsOptional()
  @IsString()
  allergies: string;

  @Column({ type: "bit" })
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
