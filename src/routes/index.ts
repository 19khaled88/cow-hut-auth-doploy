import express from "express";
import { CowRoutes } from "../app/modules/cows/cows.routes";
import { UserRoutes } from "../app/modules/users/users.routes";
import { OrderRoutes } from "../app/modules/orders/orders.routes";
const router = express.Router();

router.use(UserRoutes);
router.use(CowRoutes);
router.use(OrderRoutes)

export default router;
