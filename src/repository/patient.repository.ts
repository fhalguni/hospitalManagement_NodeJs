import { AppDataSourse } from "../config/database.config";
import { ContactDetails } from "../models/contactDetails.model";
import { Patient } from "../models/patient.model";

class PatientRepo {
  patientRepository = AppDataSourse.getRepository(Patient);
  contactRepository = AppDataSourse.getRepository(ContactDetails);
  async createPatient(
    patient: Partial<Patient>,
    name: string,
    phoneNumber: string
  ) {
    const contactDetails = this.contactRepository.create({ name, phoneNumber });
    const newContact = await this.contactRepository.save(contactDetails);
    const newPatient = this.patientRepository.create({
      ...patient,
      contactDetails: [newContact],
    });
    return await this.patientRepository.save(newPatient);
  }

  async updatePatient(id: number, data: Partial<Patient>) {
    return await this.patientRepository.update(id, { ...data });
  }

  async deletePatient(id: number) {
    return await this.patientRepository.delete(id);
  }

  async patientFindById(id: number) {
    return await this.patientRepository.findOne({ where: { id: id } });
  }

  async isPatientAvailable(id: number, name: string) {
    return await this.patientRepository.findOneBy({ id: id, name: name });
  }
}
export default new PatientRepo();
