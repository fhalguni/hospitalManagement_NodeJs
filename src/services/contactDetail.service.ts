import { ContactDetails } from "../models/contactDetails.model";
import contactDetailsRepository from "../repository/contactDetails.repository";

class ContactDetailService {
  async insertNewEmergencyContact(
    patientId: number,
    contact: Partial<ContactDetails>
  ) {
    return await contactDetailsRepository.insertEmergencyDetail(
      patientId,
      contact
    );
  }
}

export default new ContactDetailService();
