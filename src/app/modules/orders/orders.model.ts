import { model, Schema } from "mongoose";
import {
  IOrder,
  // IOrders,
  OrderModel,
} from "./roders.interface";

const orderSchema = new Schema<IOrder, OrderModel>(
  {
    buyer: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    cow: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Cow",
    },
  },
  { timestamps: true }
);

export const Order = model<IOrder, OrderModel>("Order", orderSchema);
