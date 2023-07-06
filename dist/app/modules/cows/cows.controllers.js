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
exports.CowController = void 0;
const cows_services_1 = require("./cows.services");
const pick_1 = __importDefault(require("../../../shared/pick"));
const pagination_1 = require("../../../constnts/pagination");
const createCowController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const result = yield cows_services_1.CowsService.createCowsService(body);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "New cow created",
            data: result,
        });
    }
    catch (error) {
        // res.status(400).json({
        //   error:error
        // });
        // console.log(error)
        next(error);
    }
});
const getAllCowController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paginationOption = (0, pick_1.default)(req.query, pagination_1.paginationFields);
        const cows = yield cows_services_1.CowsService.getCowService(paginationOption);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Cows found",
            data: cows,
        });
    }
    catch (error) {
        next(error);
    }
});
const getSingleCowController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cow = yield cows_services_1.CowsService.getSingleCowService(req.params.id);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Cow found",
            data: cow,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateCowrController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const cow = yield cows_services_1.CowsService.updateCowService(req.params.id, req.body, (_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "cow upadated successfully",
            data: "cow",
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteCowController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const cow = yield cows_services_1.CowsService.deleteCowService(req.params.id, (_b = req.user) === null || _b === void 0 ? void 0 : _b.id);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Cow deleted successfully",
            data: cow,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.CowController = {
    createCowController,
    getAllCowController,
    getSingleCowController,
    updateCowrController,
    deleteCowController,
};
