import express from "express";
import {
  alerts,
  getTour,
  getLoginForm,
  getOverview,
  getAccount,
  getMyTours,
  updateUserData,
} from "@/controllers/viewsController";
import { isLoggedIn, protect } from "@/controllers/authController";

const router = express.Router();

router.use(alerts);

router.get("/", isLoggedIn, getOverview);
router.get("/tour/:slug", isLoggedIn, getTour);
router.get("/login", isLoggedIn, getLoginForm);

router.use(protect);

router.get("/me", getAccount);
router.get("/my-tours", getMyTours);
router.post("/submit-user-data", updateUserData);

export default router;
