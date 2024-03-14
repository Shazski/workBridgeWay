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
exports.getAllUser = exports.setUserFmcToken = exports.setUserPreferredCategory = exports.findUserById_repo = exports.uploadResume = exports.blockOrUnblockUser = exports.getAllUsers = exports.removeUserSocialLinks_repo = exports.addUserSocialLinks_repo = exports.updateUserAbout_repo = exports.removeUserSkills_repo = exports.addUserSkills_repo = exports.editUser_repo = exports.SignUpUser_repo = exports.findUserByEmail_repo = void 0;
const userSchema_1 = __importDefault(require("../../schema/userSchema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const findUserByEmail_repo = (userCredentials) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userExists;
        if (userCredentials.phone) {
            userExists = yield userSchema_1.default.findOne({
                $or: [{ email: userCredentials.email }, { phone: userCredentials.phone }],
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
            }, { new: true }).select("-password");
        }
        else {
            const userData = yield userSchema_1.default.findOne({ email: userCredentials.email });
            if (!(userData === null || userData === void 0 ? void 0 : userData.dob) && (userCredentials === null || userCredentials === void 0 ? void 0 : userCredentials.dob)) {
                updatedUser = yield userSchema_1.default.findOneAndUpdate({ email: userCredentials.email }, {
                    $set: Object.assign({}, userCredentials),
                    $inc: { profileScore: 10 },
                }, { new: true }).select("-password");
            }
            else {
                updatedUser = yield userSchema_1.default.findOneAndUpdate({ email: userCredentials.email }, {
                    $set: Object.assign({}, userCredentials),
                }, { new: true }).select("-password");
            }
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
    var _a;
    try {
        const userData = yield userSchema_1.default.findOne({
            email: userCredentials.email,
        });
        let updatedUser;
        if ((userData === null || userData === void 0 ? void 0 : userData.skills) && ((_a = userData === null || userData === void 0 ? void 0 : userData.skills) === null || _a === void 0 ? void 0 : _a.length) == 2) {
            updatedUser = yield userSchema_1.default.findOneAndUpdate({ email: userCredentials.email }, {
                $addToSet: {
                    skills: userCredentials.skill,
                },
                $inc: { profileScore: 20 },
            }, { new: true }).select("-password");
        }
        else {
            updatedUser = yield userSchema_1.default.findOneAndUpdate({ email: userCredentials.email }, {
                $addToSet: {
                    skills: userCredentials.skill,
                },
            }, { new: true }).select("-password");
        }
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
    var _b;
    try {
        const userData = yield userSchema_1.default.findOne({
            email: userCredentials.email,
        });
        let updatedUser;
        if ((userData === null || userData === void 0 ? void 0 : userData.skills) && ((_b = userData === null || userData === void 0 ? void 0 : userData.skills) === null || _b === void 0 ? void 0 : _b.length) == 3) {
            updatedUser = yield userSchema_1.default.findOneAndUpdate({ email: userCredentials.email }, {
                $pull: {
                    skills: userCredentials.skill,
                },
                $inc: { profileScore: -20 },
            }, { new: true }).select("-password");
        }
        else {
            updatedUser = yield userSchema_1.default.findOneAndUpdate({ email: userCredentials.email }, {
                $pull: {
                    skills: userCredentials.skill,
                },
            }, { new: true }).select("-password");
        }
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
    var _c;
    try {
        const userData = yield userSchema_1.default.findOne({
            email: userCredentials.email,
        });
        let updatedUser;
        if ((_c = userData === null || userData === void 0 ? void 0 : userData.about) === null || _c === void 0 ? void 0 : _c.length) {
            updatedUser = yield userSchema_1.default.findOneAndUpdate({ email: userCredentials.email }, {
                $set: {
                    about: userCredentials.about,
                },
            }, { new: true }).select("-password");
        }
        else {
            updatedUser = yield userSchema_1.default.findOneAndUpdate({ email: userCredentials.email }, {
                $set: {
                    about: userCredentials.about,
                },
                $inc: { profileScore: 10 },
            }, { new: true }).select("-password");
        }
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
    var _d;
    try {
        let updatedUser;
        const userData = yield userSchema_1.default.findOne({ email: userCredentials.email });
        if ((userData === null || userData === void 0 ? void 0 : userData.socialLinks) && ((_d = userData === null || userData === void 0 ? void 0 : userData.socialLinks) === null || _d === void 0 ? void 0 : _d.length) === 1) {
            updatedUser = yield userSchema_1.default.findOneAndUpdate({ email: userCredentials.email }, {
                $push: {
                    socialLinks: userCredentials.socialLinks,
                },
                $inc: { profileScore: 20 },
            }, { new: true }).select("-password");
        }
        else {
            updatedUser = yield userSchema_1.default.findOneAndUpdate({ email: userCredentials.email }, {
                $push: {
                    socialLinks: userCredentials.socialLinks,
                },
            }, { new: true }).select("-password");
        }
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
    var _e;
    try {
        let updatedUser;
        const userData = yield userSchema_1.default.findOne({ email: userCredentials.email });
        if ((userData === null || userData === void 0 ? void 0 : userData.socialLinks) && ((_e = userData === null || userData === void 0 ? void 0 : userData.socialLinks) === null || _e === void 0 ? void 0 : _e.length) === 2) {
            updatedUser = yield userSchema_1.default.findOneAndUpdate({ email: userCredentials.email }, {
                $pull: {
                    socialLinks: userCredentials.socialLinks,
                },
                $inc: { profileScore: -20 },
            }, { new: true }).select("-password");
        }
        else {
            updatedUser = yield userSchema_1.default.findOneAndUpdate({ email: userCredentials.email }, {
                $pull: {
                    socialLinks: userCredentials.socialLinks,
                },
            }, { new: true }).select("-password");
        }
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
const getAllUsers = (page, search) => __awaiter(void 0, void 0, void 0, function* () {
    const skip = (page - 1) * 10;
    try {
        const users = yield userSchema_1.default.find({
            $or: [
                {
                    email: { $regex: `${search}`, $options: "i" },
                },
                {
                    userName: { $regex: `${search}`, $options: "i" },
                },
            ],
            role: "user",
        })
            .limit(10)
            .skip(skip)
            .select("-password");
        const count = yield userSchema_1.default.find({
            $or: [
                {
                    email: { $regex: `${search}`, $options: "i" },
                },
                {
                    userName: { $regex: `${search}`, $options: "i" },
                },
            ],
            role: "user",
        }).countDocuments();
        if (!users)
            return false;
        return [users, count];
    }
    catch (error) {
        console.log(error, "< Something went wrong on get all users repo >");
        return false;
    }
});
exports.getAllUsers = getAllUsers;
const blockOrUnblockUser = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield userSchema_1.default.findByIdAndUpdate(id, {
            status: status,
        }, { new: true });
        if (!updatedUser) {
            return false;
        }
        return true;
    }
    catch (error) {
        console.log(error, " << Something went wrong in blockorunblock user repo >> ");
        return false;
    }
});
exports.blockOrUnblockUser = blockOrUnblockUser;
const uploadResume = (id, resume) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield userSchema_1.default.findById(id);
        let updatedUser;
        if (!(userData === null || userData === void 0 ? void 0 : userData.resume)) {
            updatedUser = yield userSchema_1.default.findByIdAndUpdate(id, {
                resume: resume,
                $inc: { profileScore: 20 },
            }, { new: true }).select("-password");
        }
        else {
            updatedUser = yield userSchema_1.default.findByIdAndUpdate(id, {
                resume: resume,
            }, { new: true }).select("-password");
        }
        if (!updatedUser) {
            return false;
        }
        return updatedUser;
    }
    catch (error) {
        console.log(error, " << Something went wrong in update resume user repo >> ");
        return false;
    }
});
exports.uploadResume = uploadResume;
const findUserById_repo = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield userSchema_1.default.findById(userId);
        if (!userData)
            return false;
        return userData;
    }
    catch (error) {
        console.log(error, "< Something went wrong on FindUserByEmail_repo >");
        return false;
    }
});
exports.findUserById_repo = findUserById_repo;
const setUserPreferredCategory = (userId, category) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    try {
        const userData = yield userSchema_1.default.findById(userId);
        let updatedUser;
        if (!((_f = userData === null || userData === void 0 ? void 0 : userData.preferredCategory) === null || _f === void 0 ? void 0 : _f.length)) {
            updatedUser = yield userSchema_1.default.findByIdAndUpdate(userId, {
                preferredCategory: category,
                $inc: { profileScore: 10 },
            }, { new: true }).select("-password");
        }
        else {
            updatedUser = yield userSchema_1.default.findByIdAndUpdate(userId, {
                preferredCategory: category,
            }, { new: true }).select("-password");
        }
        if (!updatedUser)
            return false;
        return updatedUser;
    }
    catch (error) {
        console.log(error, "< Something went wrong on setUserPreferredCategory repo >");
        return false;
    }
});
exports.setUserPreferredCategory = setUserPreferredCategory;
const setUserFmcToken = (userId, fmcToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield userSchema_1.default.findByIdAndUpdate(userId, {
            fmcToken: fmcToken
        });
        if (!userData)
            return false;
        return userData;
    }
    catch (error) {
        console.log(error, "< Something went wrong on setUserFmcToken repo >");
        return false;
    }
});
exports.setUserFmcToken = setUserFmcToken;
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersData = yield userSchema_1.default.find({ role: "user" });
        if (!usersData)
            return false;
        return usersData;
    }
    catch (error) {
        console.log(error, "< Something went wrong on setUserFmcToken repo >");
        return false;
    }
});
exports.getAllUser = getAllUser;
