"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cow = void 0;
const mongoose_1 = require("mongoose");
const cows_constants_1 = require("../../../constnts/cows.constants");
const cowSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
        enum: cows_constants_1.location,
    },
    breed: {
        type: String,
        required: true,
        enum: cows_constants_1.breed,
    },
    weight: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
        enum: cows_constants_1.label,
    },
    category: {
        type: String,
        required: true,
        enum: cows_constants_1.category,
    },
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
}, { timestamps: true });
exports.Cow = (0, mongoose_1.model)("Cow", cowSchema);
