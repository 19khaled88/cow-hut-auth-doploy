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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowsService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helper/paginationHelper");
const cows_model_1 = require("./cows.model");
const createCowsService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // try {
    //     const userCreated = await User.create(payload)
    //     return userCreated
    // } catch (error) {
    //     return null
    // }
    const cowCreated = yield cows_model_1.Cow.create(payload);
    if (!cowCreated) {
        throw new Error("Failed to create new cow profile");
    }
    return cowCreated;
});
const getCowService = (paginationOption) => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield cows_model_1.Cow.countDocuments();
    const { page, limit, skip } = paginationHelper_1.PaginationHelper.calculatePagination(paginationOption);
    const cows = yield cows_model_1.Cow.find()
        .sort()
        .skip(skip)
        .limit(limit)
        .populate("seller");
    if (!cows) {
        throw new Error("No data found");
    }
    return {
        meta: {
            page,
            limit,
            count,
        },
        data: cows,
    };
});
const getSingleCowService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const singleCow = yield cows_model_1.Cow.findById(id).exec();
    if (!singleCow) {
        throw new Error("Cow id is invalid");
    }
    return singleCow;
});
const updateCowService = (id, payload, sellerId) => __awaiter(void 0, void 0, void 0, function* () {
    const isValidSeller = yield cows_model_1.Cow.findById(id);
    if ((isValidSeller === null || isValidSeller === void 0 ? void 0 : isValidSeller.seller.toString()) !== sellerId) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Not valid seller");
    }
    const updatedCow = yield cows_model_1.Cow.findByIdAndUpdate(id, payload, { new: true });
    if (!updatedCow) {
        throw new Error("Cow id is invalid");
    }
    return updatedCow;
});
const deleteCowService = (id, sellerId) => __awaiter(void 0, void 0, void 0, function* () {
    const isValidSeller = yield cows_model_1.Cow.findById(id);
    if ((isValidSeller === null || isValidSeller === void 0 ? void 0 : isValidSeller.seller.toString()) !== sellerId) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Not valid seller");
    }
    const deletedCow = yield cows_model_1.Cow.findByIdAndDelete(id);
    if (!deletedCow) {
        throw new Error("User id is invalid");
    }
    return deletedCow;
});
exports.CowsService = {
    createCowsService,
    getCowService,
    getSingleCowService,
    updateCowService,
    deleteCowService,
};
