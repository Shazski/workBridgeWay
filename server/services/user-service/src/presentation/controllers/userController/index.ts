import { IDependenciesData } from "../../../application/interfaces/IDependenciesData"
import editUser_controller from "./editUser_controller"
import updatePassword_controller from "./updatePassword_controller"
import updateEmail_controller from "./updateEmail_controller"
import addUserSkills_controller from "./addUserSkills_controller"
import removeUserSkill_controller from "./removeUserSkill_controller"
import updateUserAbout_controller from "./updateUserAbout_controller"
import addUserSocialLinks_controller from "./addUserSocialLinks_controller"
import removeUserSocialLinks_controller from "./removeUserSocialLinks_controller"
export = (dependencies: IDependenciesData) => {
    return {
        editUser:editUser_controller(dependencies),
        updatePassword:updatePassword_controller(dependencies),
        updateEmail:updateEmail_controller(dependencies),
        addUserSkills:addUserSkills_controller(dependencies),
        removeSkill:removeUserSkill_controller(dependencies),
        updateUserAbout:updateUserAbout_controller(dependencies),
        addUserSocialLinks: addUserSocialLinks_controller(dependencies),
        removeUserSocialLinks:removeUserSocialLinks_controller(dependencies)
    }
}