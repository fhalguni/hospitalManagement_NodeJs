import express from "express";
import contactDetailsController from "../controllers/contactDetails.controller";
import { authenticateUser } from "../middleware/auth.middleware";

const router = express.Router();
router.post(
  "/addNewContact/:id",
  authenticateUser,
  contactDetailsController.insertEmergencyContact
);
router.get(
  "/getContact/:id",
  authenticateUser,
  contactDetailsController.displayEmergencyContact
);
router.delete(
  "/deleteContact/:id",
  authenticateUser,
  contactDetailsController.deleteContactDetail
);
export { router as ContactRouter };
