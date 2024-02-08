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
exports.removeUserSocialLinks_repo = exports.addUserSocialLinks_repo = exports.updateUserAbout_repo = exports.removeUserSkills_repo = exports.addUserSkills_repo = exports.editUser_repo = exports.SignUpUser_repo = exports.findUserByEmail_repo = void 0;
const userSchema_1 = __importDefault(require("../../schema/userSchema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const findUserByEmail_repo = (userCredentials) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userExists;
        if (userCredentials.phone) {
            userExists = yield userSchema_1.default.findOne({
                $or: [
                    { email: userCredentials.email },
                    { phone: userCredentials.phone },
                ],
            });
        }
        else {
            userExists = yield userSchema_1.default.findOne({ email: userCredentials.email });
        }
        if (!userExists)
            return false;
        return userExists;
    }
    catch (error) {
        console.log(error, "< Something went wrong on FindUserByEmail_repo >");
        return false;
    }
});
exports.findUserByEmail_repo = findUserByEmail_repo;
const SignUpUser_repo = (userCredentials) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield userSchema_1.default.create(Object.assign({}, userCredentials));
        if (newUser)
            return newUser;
        else
            throw new Error("something went wrong during creating new user");
    }
    catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.code) === 11000) {
            console.log("unique code error", error);
            return false;
        }
        console.log(error, "<Something went wrong in signUpUser_repo>");
        return false;
    }
});
exports.SignUpUser_repo = SignUpUser_repo;
const editUser_repo = (userCredentials) => __awaiter(void 0, void 0, void 0, function* () {
    let updatedUser;
    try {
        if (userCredentials.password) {
            const hashedPassword = yield bcrypt_1.default.hash(userCredentials.password, 10);
            userCredentials.password = hashedPassword;
        }
        if (userCredentials.oldEmail) {
            updatedUser = yield userSchema_1.default.findOneAndUpdate({ email: userCredentials.oldEmail }, {
                $set: { email: userCredentials.email },
            }, { new: true });
        }
        else {
            updatedUser = yield userSchema_1.default.findOneAndUpdate({ email: userCredentials.email }, {
                $set: Object.assign({}, userCredentials),
            }, { new: true });
        }
        if (!updatedUser)
            return false;
        return updatedUser;
    }
    catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.code) === 11000) {
            return false;
        }
        console.error("Error", error);
        return false;
    }
});
exports.editUser_repo = editUser_repo;
const addUserSkills_repo = (userCredentials) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield userSchema_1.default.findOneAndUpdate({ email: userCredentials.email }, {
            $addToSet: {
                skills: userCredentials.skill,
            },
        }, { new: true });
        if (!updatedUser)
            return false;
        return updatedUser;
    }
    catch (error) {
        console.log("<Something went wrong in add skill repo>");
        return false;
    }
});
exports.addUserSkills_repo = addUserSkills_repo;
const removeUserSkills_repo = (userCredentials) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield userSchema_1.default.findOneAndUpdate({ email: userCredentials.email }, {
            $pull: {
                skills: userCredentials.skill,
            },
        }, { new: true });
        if (!updatedUser)
            return false;
        return updatedUser;
    }
    catch (error) {
        console.log("<Something went wrong in remove user skill repo>");
        return false;
    }
});
exports.removeUserSkills_repo = removeUserSkills_repo;
const updateUserAbout_repo = (userCredentials) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield userSchema_1.default.findOneAndUpdate({ email: userCredentials.email }, {
            $set: {
                about: userCredentials.about,
            },
        }, { new: true });
        if (!updatedUser)
            return false;
        return updatedUser;
    }
    catch (error) {
        console.log("<Something went wrong in updateUserAbout repo>");
        return false;
    }
});
exports.updateUserAbout_repo = updateUserAbout_repo;
const addUserSocialLinks_repo = (userCredentials) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield userSchema_1.default.findOneAndUpdate({ email: userCredentials.email }, {
            $push: {
                socialLinks: userCredentials.socialLinks,
            },
        }, { new: true });
        if (!updatedUser)
            return false;
        return updatedUser;
    }
    catch (error) {
        console.log("<Something went wrong in add social link repo>");
        return false;
    }
});
exports.addUserSocialLinks_repo = addUserSocialLinks_repo;
const removeUserSocialLinks_repo = (userCredentials) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield userSchema_1.default.findOneAndUpdate({ email: userCredentials.email }, {
            $pull: {
                socialLinks: userCredentials.socialLinks,
            },
        }, { new: true });
        if (!updatedUser)
            return false;
        return updatedUser;
    }
    catch (error) {
        console.log("<Something went wrong in remove user socialLinks repo>");
        return false;
    }
});
exports.removeUserSocialLinks_repo = removeUserSocialLinks_repo;
