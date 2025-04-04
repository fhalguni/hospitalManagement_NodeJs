import express from "express";
import contactDetailsController from "../controllers/contactDetails.controller";

const router = express.Router();
router.post(
  "/addNewContact/:id",
  contactDetailsController.insertEmergencyContact
);
router.get("/getContact/:id", contactDetailsController.displayEmergencyContact);
router.delete(
  "/deleteContact/:id",
  contactDetailsController.deleteContactDetail
);
export { router as ContactRouter };
