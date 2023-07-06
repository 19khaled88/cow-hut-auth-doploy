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
const users_model_1 = require("../app/modules/users/users.model");
const cows_model_1 = require("../app/modules/cows/cows.model");
const checkEligibleOrder = () => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isBuyerEligible = yield users_model_1.User.findById(req.body.buyer);
        const isCowAvailable = yield cows_model_1.Cow.findById(req.body.cow);
        req.body.balance = isBuyerEligible === null || isBuyerEligible === void 0 ? void 0 : isBuyerEligible.budget;
        req.body.price = isCowAvailable === null || isCowAvailable === void 0 ? void 0 : isCowAvailable.price;
        if (isBuyerEligible && isCowAvailable && (isBuyerEligible === null || isBuyerEligible === void 0 ? void 0 : isBuyerEligible.budget) >= (isCowAvailable === null || isCowAvailable === void 0 ? void 0 : isCowAvailable.price) && (isBuyerEligible === null || isBuyerEligible === void 0 ? void 0 : isBuyerEligible.role) === 'Buyer') {
            const balance = isBuyerEligible === null || isBuyerEligible === void 0 ? void 0 : isBuyerEligible.budget;
            const price = isCowAvailable === null || isCowAvailable === void 0 ? void 0 : isCowAvailable.price;
            next();
        }
        else {
            throw new Error("You do not have enough fund or not valid buyer");
        }
    }
    catch (error) {
        next(error);
    }
});
exports.default = checkEligibleOrder;
