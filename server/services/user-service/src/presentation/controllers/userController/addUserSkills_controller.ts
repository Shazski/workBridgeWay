import { NextFunction, Request, Response } from "express";
import { IDependenciesData } from "../../../application/interfaces/IDependenciesData";
import { ErrorResponse } from "../../../utils";

export default (dependencies: IDependenciesData) => {
    const {user_useCase:{addUserSkills_useCase}} = dependencies
    const addUserSkills = async (req: Request, res:Response, next:NextFunction) => {
        const userCredentials = req.body
        try {
            const user = await addUserSkills_useCase(dependencies).execute(userCredentials)

            if(!user) return next(ErrorResponse.internalError("Not able to add Skill"))

            return res.status(201).json(user)
        } catch (error) {
            console.log("<< Somthing went wrong in editUserSkills controller>>")
            return next(error)
        }
    }
    return addUserSkills
}
