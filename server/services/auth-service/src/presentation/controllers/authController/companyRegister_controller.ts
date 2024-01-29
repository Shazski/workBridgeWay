import { NextFunction, Request, Response } from "express"
import {DependenciesData} from "../../../application/interfaces/IDependencies"
import { ICompanyData } from "../../../application/interfaces/ICompanyLogin"
import { ErrorResponse } from "../../../utils"
export = (dependencies:DependenciesData) => {
    const {user_useCase:{findUserByEmail_useCase, signUpUser_useCase, registerCompany_useCase}} = dependencies
    const registerCompany =  async(req:Request, res:Response, next:NextFunction) =>{
        const companyCredentials:ICompanyData = req.body
        try {
            const companyExists = await findUserByEmail_useCase(dependencies).execute(companyCredentials)
            if(companyExists) return next(ErrorResponse.conflict("email or phone is already registered"))

            const userCredentials = {
                userName:req.body.name,
                email:req.body.email,
                password:req.body.password,
                phone:req.body.phone,
                role:"company",
            }
            const user = await signUpUser_useCase(dependencies).execute(userCredentials)

            if(!user) return next(ErrorResponse.internalError("Something went wrong"))

            const company = await registerCompany_useCase(dependencies).execute(companyCredentials)
            
            if(!company) {
                return next(ErrorResponse.internalError("Something went wrong in registering company"))
            }
            res.status(201).json({success:true,message:"Company registered successfully"})

        } catch (error) {
            console.log(error,"something went wrong in register user controller")
            next(error)
        }
    }
    return registerCompany
}