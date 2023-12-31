"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    buyer: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    cow: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Cow",
    },
}, { timestamps: true });
exports.Order = (0, mongoose_1.model)("Order", orderSchema);
