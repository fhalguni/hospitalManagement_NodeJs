import { AppDataSourse } from "../config/database.config";
import { ContactDetails } from "../models/contactDetails.model";

class ContactDetailsRepository {
  contactRepository = AppDataSourse.getRepository(ContactDetails);

  async insertEmergencyDetail(
    patientId: number,
    contact: Partial<ContactDetails>
  ) {
    const isPatientAvailabe = await this.contactRepository
      .createQueryBuilder("contactDetails")
      .where("patientId=:patientId", { patientId })
      .getOne();

    console.log(isPatientAvailabe);

    if (isPatientAvailabe) {
      const newContact = this.contactRepository.create({
        patient: { id: patientId },
        ...contact,
      });
      return await this.contactRepository.save(newContact);
    }
  }
}

export default new ContactDetailsRepository();
