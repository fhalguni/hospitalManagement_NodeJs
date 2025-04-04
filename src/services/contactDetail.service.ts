import { ContactDetails } from "../models/contactDetails.model";
import contactDetailsRepository from "../repository/contactDetails.repository";

class ContactDetailService {
  async insertNewEmergencyContact(
    name: string,
    phoneNumber: string,
    patientId: number
  ) {
    return await contactDetailsRepository.insertEmergencyDetail(
      name,
      phoneNumber,
      patientId
    );
  }

  async displayEmergencyContact(id: number) {
    return await contactDetailsRepository.displayEmergencyContact(id);
  }

  async deleteContactDetails(id: number, contactId: number) {
    return await contactDetailsRepository.deleteEmergencyContact(id, contactId);
  }
}

export default new ContactDetailService();
