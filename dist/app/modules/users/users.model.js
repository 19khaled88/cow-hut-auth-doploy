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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const users_constants_1 = require("../../../constnts/users.constants");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const userSchema = new mongoose_1.Schema({
    phoneNumber: {
        type: String,
        unique: true,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: users_constants_1.role,
        default: "User",
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
    },
    budget: {
        type: Number,
        default: 0
    },
    income: {
        type: Number,
        default: 0
    },
    address: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        //hasing password
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.hash_pass_salt_round));
        next();
    });
});
// userSchema.methods.toJSON = function () {
// 	const userObject = this.toObject();
// 	delete userObject.password;
// 	return userObject;
// };
exports.User = (0, mongoose_1.model)("User", userSchema);
