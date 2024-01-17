"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorResponse_1 = __importDefault(require("./errorResponse"));
const errorHandler = (err, req, res, next) => {
    console.log(err);
    if (err instanceof errorResponse_1.default) {
        return res.status(err.status).json({
            success: false,
            status: err.status,
            message: err.message,
        });
    }
    return res.status(500).json({
        success: false,
        status: 500,
        message: "Something went wrong",
    });
};
exports.default = errorHandler;
