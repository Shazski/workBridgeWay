"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UsersSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    profilePic: { type: String },
    resume: { type: String },
    password: { type: String, required: true },
    role: {
        type: String,
        required: true,
        enum: ["user", "company", "employee", "admin"],
        default: "user",
    },
    skills: [{ type: String }],
    socialLinks: [
        {
            link: { type: String },
            socialMedia: { type: String },
        },
    ],
    dob: { type: String },
    status: { type: Boolean, default: true },
    preferredCategory: { type: String },
    profileScore: { type: Number, default: 0 },
    userName: { type: String, required: true },
    chatStatus: { type: String, enum: ["online", "offline"] },
    jobStatus: { type: String },
    fmcToken: { type: String },
    about: { type: String },
    languages: [{ type: String }],
    phone: { type: Number, unique: true, sparse: true },
    education: { type: String },
}, {
    timestamps: true,
});
UsersSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password") || !user.password)
        return next();
    bcrypt_1.default.hash(user === null || user === void 0 ? void 0 : user.password, 10, (err, hash) => {
        if (err)
            return next(err);
        user.password = hash;
        next();
    });
});
const Users = mongoose_1.default.model("Users", UsersSchema);
exports.default = Users;
