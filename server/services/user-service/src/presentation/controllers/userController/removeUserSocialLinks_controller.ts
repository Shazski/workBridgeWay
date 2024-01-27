import { NextFunction, Request, Response } from "express";
import { IDependenciesData } from "../../../application/interfaces/IDependenciesData";
import { ErrorResponse } from "../../../utils";

export = (dependencies: IDependenciesData) => {
    const {user_useCase:{removeUserSocialLinks_useCase}} = dependencies

    const removeUserSocialLinks = async(req:Request, res:Response, next:NextFunction) => {
        const userCredentials = req.body
        try {
            const user = await removeUserSocialLinks_useCase(dependencies).execute(userCredentials)

            if(!user) return next(ErrorResponse.internalError("Not able to remove social links"))

            res.status(201).json(user)
        } catch (error) {
            console.log("<< Somthing went wrong inadd user social links controller >>")
            next(error)
        }
    }
    return removeUserSocialLinks
}