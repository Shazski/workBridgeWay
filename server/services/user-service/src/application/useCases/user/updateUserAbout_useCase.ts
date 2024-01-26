import { IDependenciesData } from "../../interfaces/IDependenciesData";

export const updateUserAbout_useCase = (dependencies: IDependenciesData) => {
    const {userRepo:{updateUserAbout_repo}} = dependencies
    const execute = async (userCredentials: {email: string, about: string}) => {
        try {
          return await updateUserAbout_repo(userCredentials)
        } catch (error) {
            console.log("<<Something went wrong in updateUserAbout useCase>>")
            return false
        }
    }
    return {
        execute
    }
}