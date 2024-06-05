"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BucketName = exports.AWS_REGION = exports.SECRET_KEY = exports.ACCESS_KEY = exports.JWT_SECRET = exports.port = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.port = process.env.PORT;
exports.JWT_SECRET = process.env.JWT_SECRET || "242342";
exports.ACCESS_KEY = process.env.ACCESS_KEY;
exports.SECRET_KEY = process.env.SECRET_KEY;
exports.AWS_REGION = process.env.AWS_REGION;
exports.BucketName = process.env.BucketName;
