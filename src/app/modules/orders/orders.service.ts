import { User } from "../users/users.model";
import { Order } from "./orders.model";
import { IOrder, IOrderService } from "./roders.interface";

const createOrderService = async (
  payload: IOrderService
): Promise<IOrder | null> => {
  const orderCreated = await Order.create(payload);

  if (!orderCreated) {
    throw new Error("Failed to create this order");
  } else {
    const data = payload?.balance - payload?.price;
    const updated = await User.findByIdAndUpdate(payload.buyer, {
      budget: data,
    });
    return orderCreated;
  }
};

const getOrderService = async (
  id: string,
  role: string
): Promise<IOrder[] | null> => {
  const orders = await Order.find().populate(["buyer", "cow"]);
  let response: IOrder[] = [];
  if (!orders) {
    throw new Error("No data found");
  }

  orders.map((data) => {
    if (role === "Admin") {
      response.push(data);
    } else if (
      role === "Buyer" &&
      "_id" in data.buyer &&
      data.buyer._id.toString() === id
    ) {
      response.push(data);
    } else if (
      role === "Seller" &&
      "seller" in data.cow &&
      data.cow.seller.toString() === id
    ) {
      response.push(data);
    }
  });
  return response;
};

export const OrderService = {
  createOrderService,
  getOrderService,
};
