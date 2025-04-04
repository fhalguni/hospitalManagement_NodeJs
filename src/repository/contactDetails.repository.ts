import { AppDataSourse } from "../config/database.config";
import { ContactDetails } from "../models/contactDetails.model";
import { Patient } from "../models/patient.model";
import patientRepository from "./patient.repository";

class ContactDetailsRepository {
  contactRepository = AppDataSourse.getRepository(ContactDetails);
  patientRepository = AppDataSourse.getRepository(Patient);
  async insertEmergencyDetail(
    name: string,
    phoneNumber: string,
    patientId: number
  ) {
    const newContact = await this.contactRepository
      .createQueryBuilder()
      .insert()
      .into(ContactDetails)
      .values({ name, phoneNumber, patient: { id: patientId } })
      .execute();
    return newContact;
  }

  async deleteEmergencyContact(id: number, contactId: number) {
    const contactDetails = await this.contactRepository.find({
      where: { patient: { id: id } },
    });

    const isContactPresent = contactDetails.find(
      (contact: any) => contactId === contact.id
    );
    console.log(isContactPresent);

    console.log(contactId);

    if (!isContactPresent) {
      throw new Error("contact not found with this id");
    }

    return await this.contactRepository.delete({ id: isContactPresent.id });
  }

  async displayEmergencyContact(id: number) {
    return await this.contactRepository
      .createQueryBuilder()
      .where("patientId=:id", { id: id })
      .execute();
  }
}

export default new ContactDetailsRepository();
