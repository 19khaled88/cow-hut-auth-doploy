"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const users_model_1 = require("../users/users.model");
const orders_model_1 = require("./orders.model");
const createOrderService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const orderCreated = yield orders_model_1.Order.create(payload);
    if (!orderCreated) {
        throw new Error("Failed to create this order");
    }
    else {
        const data = (payload === null || payload === void 0 ? void 0 : payload.balance) - (payload === null || payload === void 0 ? void 0 : payload.price);
        const updated = yield users_model_1.User.findByIdAndUpdate(payload.buyer, {
            budget: data,
        });
        return orderCreated;
    }
});
const getOrderService = (id, role) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield orders_model_1.Order.find().populate(["buyer", "cow"]);
    let response = [];
    if (!orders) {
        throw new Error("No data found");
    }
    orders.map((data) => {
        if (role === "Admin") {
            response.push(data);
        }
        else if (role === "Buyer" &&
            "_id" in data.buyer &&
            data.buyer._id.toString() === id) {
            response.push(data);
        }
        else if (role === "Seller" &&
            "seller" in data.cow &&
            data.cow.seller.toString() === id) {
            response.push(data);
        }
    });
    return response;
});
exports.OrderService = {
    createOrderService,
    getOrderService,
};
