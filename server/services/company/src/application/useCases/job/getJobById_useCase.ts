import { ObjectId } from "mongoose";
import { IDependencies } from "../../interface/IDependencies";

export const getJobById_useCase = (dependencies:IDependencies) => {
    const {job_repo:{getJobById}} = dependencies

    const execute = async (id: ObjectId) => {
        try {
            return await getJobById(id);
        } catch (error) {
            console.log(error, "<< Something went wrong in getJobById useCase >>")
            return false
        }

    }
    return {
        execute
    }
}