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
exports.EnvironmentChecker = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = require("../../config/index");
dotenv_1.default.config();
class EnvironmentChecker {
    constructor() { }
    check() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.checkEnvVariable(`${index_1.PORT}`);
                this.checkEnvVariable(`${index_1.JWT_SECRET}`);
            }
            catch (error) { }
        });
    }
    checkEnvVariable(variable) {
        if (!variable) {
            console.log(`${variable} must be defined`);
            throw new Error(`Environment Variable ${variable} is not defined`);
        }
    }
}
exports.EnvironmentChecker = EnvironmentChecker;
