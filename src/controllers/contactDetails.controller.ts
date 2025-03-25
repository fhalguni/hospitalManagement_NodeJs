import { Request, Response } from "express";
import contactDetailService from "../services/contactDetail.service";

class ContactDetailController {
  async insertEmergencyContact(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const result = await contactDetailService.insertNewEmergencyContact(+id, {
        ...req.body,
      });
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
}
export default new ContactDetailController();
