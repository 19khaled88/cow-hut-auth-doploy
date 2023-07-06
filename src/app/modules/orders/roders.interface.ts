import { Model,Types,Document } from "mongoose";
import { ICow } from "../cows/cows.interface";
import { IUser } from "../users/users.interface";

export type IOrder = {
	// buyer: string;
	// cow: string;
	buyer :Types.ObjectId | IUser
	cow :Types.ObjectId | ICow 
	
	createdAt: Date;
	updatedAt: Date;
};

export type IOrderResponse ={
	
}

export interface IOrders extends Document{
	buyer :Types.ObjectId | IUser
	cow :Types.ObjectId | ICow 
	createdAt: Date;
	updatedAt: Date;
}
export type IOrderService=  IOrder & {
	balance:number;
	price:number;
}

export type OrderModel = Model<IOrder>;
