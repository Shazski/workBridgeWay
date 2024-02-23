import { NextFunction, Request, Response } from "express";
import { IDependenciesData } from "../../../application/interfaces/IDependenciesData";
import { ErrorResponse } from "work-bridge-way-common";

export = (dependencies: IDependenciesData) => {
    const {user_useCase:{removeUserSkill_useCase}} = dependencies
    const removeUserSkill = async(req: Request, res:Response, next:NextFunction) => {
        const userCredentials:{email:string, skill:string} = req.body
        try {
            const user = await removeUserSkill_useCase(dependencies).execute(userCredentials)

            if(!user) return next(ErrorResponse.internalError("Not able to remove Skill"))

            return res.status(201).json(user)
            
        } catch (error) {
            console.log("<<Something went wrong in remove user controller>>")
            next(error)
        }
    }
    return removeUserSkill 
}