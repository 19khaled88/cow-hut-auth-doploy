import { RequestHandler } from "express";
import { Cow } from "../cows/cows.model";
import { User } from "../users/users.model";
import { OrderService } from "./orders.service";

const createOrderController: RequestHandler = async (req, res, next) => {
  try {
    const result = await OrderService.createOrderService(req.body);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "This order created",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllOrderController: RequestHandler = async (req, res, next) => {
  const {id,role} = req.user
  try {
    const orders = await OrderService.getOrderService(id,role);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

export const OrderController = {
  createOrderController,
  getAllOrderController,
};
