"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRepo = exports.userRepo = void 0;
const user_1 = __importDefault(require("./user"));
exports.userRepo = user_1.default;
const category_1 = __importDefault(require("./category"));
exports.categoryRepo = category_1.default;
