import express from "express";
import contactDetailsController from "../controllers/contactDetails.controller";

const router = express.Router();
router.post(
  "/addNewContact/:id",
  contactDetailsController.insertEmergencyContact
);
export { router as ContactRouter };
