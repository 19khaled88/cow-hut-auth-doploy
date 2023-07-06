import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/users";
import auth from "../../../middleware/auth";
import { CowController } from "./cows.controllers";
const router = express.Router();

router.post(
  "/cows",
  auth(ENUM_USER_ROLE.SELLER),
  CowController.createCowController
); // only accessible by seller
router.get(
  "/cows",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER),
  CowController.getAllCowController
); // accessible by buyer, seller & admin
router.get(
  "/cows/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  CowController.getSingleCowController
); // accessible by buyer, seller & admin

router.patch("/cows/:id",auth(ENUM_USER_ROLE.SELLER), CowController.updateCowrController); // only accessible by seller
router.delete("/cows/:id",auth(ENUM_USER_ROLE.SELLER), CowController.deleteCowController); // only accessible by seller

export const CowRoutes = router;
