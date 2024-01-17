"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const utils_1 = require("../utils");
const utils_2 = require("../utils");
dotenv_1.default.config();
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use((0, cors_1.default)(utils_1.corsOptions));
exports.app.use("/api/v1", (req, res) => {
    res.send("its working");
});
exports.app.use((req, res) => {
    res.status(404).json({ success: false, status: 404, message: "Not found" });
});
exports.app.use(utils_2.errorHandler);
