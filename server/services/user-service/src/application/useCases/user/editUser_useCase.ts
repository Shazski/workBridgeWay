import { IUser } from "../../../domain/entities/user.entity"
import { IDependenciesData } from "../../interfaces/IDependenciesData"

export const editUser_useCase = (dependencies: IDependenciesData) => {
    const {userRepo: {editUser_repo}} = dependencies
    try {
        const execute = async (userCredentials: IUser) => {
            return await editUser_repo(userCredentials)
       }
       return {
        execute
       }     
    } catch (error) {
        console.log(error,"<< Something went wrong in edit user usecase >>")
        return false
    }
   
}