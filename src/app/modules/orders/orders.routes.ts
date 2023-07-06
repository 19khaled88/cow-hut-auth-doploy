import express from "express";
import { OrderController } from "./orders.controller";
import checkEligibleOrder from "../../../middleware/checkEligibleOrder";
import auth from "../../../middleware/auth";
import { ENUM_USER_ROLE } from "../../../enums/users";
const router = express.Router();

router.get(
  "/orders",
  auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.BUYER,ENUM_USER_ROLE.SELLER),
  OrderController.getAllOrderController
); // only accissble by buyer
router.post(
  "/orders",
  checkEligibleOrder(),
  auth(ENUM_USER_ROLE.BUYER),
  OrderController.createOrderController
); // accessible by only admin, specific buyer, specific seller
router.get("/orders/:id"); // accessible by admin, specific buyer and specific seller
export const OrderRoutes = router;
