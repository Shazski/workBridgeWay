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
exports.getCategoryByCompany = exports.addCategory = void 0;
const categorySchema_1 = __importDefault(require("../../schema/categorySchema"));
const addCategory = (credentials) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield categorySchema_1.default.create(Object.assign({}, credentials));
        if (!category)
            return false;
        const categoryData = category;
        return categoryData;
    }
    catch (error) {
        console.log(error, " << Something went wrong in add  category repo >> ");
        return false;
    }
});
exports.addCategory = addCategory;
const getCategoryByCompany = (companyId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield categorySchema_1.default.find().select('category');
        const categoryStrings = categories
            .filter((category) => category !== null)
            .map((category) => category === null || category === void 0 ? void 0 : category.category);
        console.log(categoryStrings, "category data");
        if (!categoryStrings)
            return false;
        return categoryStrings;
    }
    catch (error) {
        console.log(error, "<< Something went wrong in getcategory repo >>");
        return false;
    }
});
exports.getCategoryByCompany = getCategoryByCompany;
