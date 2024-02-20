"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.job_repo = exports.category_repo = exports.company_repo = void 0;
const company_1 = __importDefault(require("./company"));
exports.company_repo = company_1.default;
const category_1 = __importDefault(require("./category"));
exports.category_repo = category_1.default;
const job_1 = __importDefault(require("./job"));
exports.job_repo = job_1.default;
