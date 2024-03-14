"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userRepo_1 = require("./userRepo");
exports.default = {
    findUserByEmail_repo: userRepo_1.findUserByEmail_repo,
    SignUpUser_repo: userRepo_1.SignUpUser_repo,
    editUser_repo: userRepo_1.editUser_repo,
    addUserSkills_repo: userRepo_1.addUserSkills_repo,
    removeUserSkills_repo: userRepo_1.removeUserSkills_repo,
    updateUserAbout_repo: userRepo_1.updateUserAbout_repo,
    addUserSocialLinks_repo: userRepo_1.addUserSocialLinks_repo,
    removeUserSocialLinks_repo: userRepo_1.removeUserSocialLinks_repo,
    getAllUsers: userRepo_1.getAllUsers,
    blockOrUnblockUser: userRepo_1.blockOrUnblockUser,
    uploadResume: userRepo_1.uploadResume,
    findUserById_repo: userRepo_1.findUserById_repo,
    setUserPreferredCategory: userRepo_1.setUserPreferredCategory,
    setUserFmcToken: userRepo_1.setUserFmcToken,
    getAllUser: userRepo_1.getAllUser,
};
