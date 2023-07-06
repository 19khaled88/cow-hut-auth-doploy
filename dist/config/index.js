"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
exports.default = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    databasr_url: process.env.DB_URL,
    user_pass: process.env.USER_PASS,
    hash_pass_salt_round: process.env.SALT_ROUND,
    accessToken: process.env.JWT_SECRET,
    accessTokenExpire: process.env.JWT_EXPIRE_IN,
    refreshTokenExpire: process.env.JWT_REFRESH_EXPIRE_IN,
    refreshToken: process.env.JWT_REFRESH_SECRET,
};
