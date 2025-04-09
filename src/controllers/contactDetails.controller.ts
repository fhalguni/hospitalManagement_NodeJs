import { Request, Response } from "express";
import contactDetailService from "../services/contactDetail.service";

class ContactDetailController {
  async insertEmergencyContact(req: Request, res: Response) {
    try {
      const patientId = req.params.id;
      const { name, phoneNumber } = req.body;
      const result = await contactDetailService.insertNewEmergencyContact(
        name,
        phoneNumber,
        +patientId
      );
      res.status(200).json({
        message: "Emergency contact created successfully",
        data: result,
      });
    } catch (err) {
      res.status(404).json({
        error: (err as Error).message,
      });
    }
  }

  async displayEmergencyContact(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const result = await contactDetailService.displayEmergencyContact(+id);
      if (!result) {
        res.status(404).json({
          message: "No contact found by this id",
        });
      }
      res.status(200).json({
        message: "success",
        data: result,
      });
    } catch (err) {
      res.status(404).json({
        error: (err as Error).message,
      });
    }
  }

  async deleteContactDetail(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const { contactId } = req.body;

      const result = await contactDetailService.deleteContactDetails(
        +id,
        contactId
      );

      if (!result) {
        res.status(404).json({
          message: "Contact not deleted",
        });
      }
      res.status(200).json({
        message: "Contact deleted successfully",
      });
    } catch (error) {
      res.status(404).json({
        err: (error as Error).message,
      });
    }
  }
}
export default new ContactDetailController();
