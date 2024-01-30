import { IDependenciesData } from "../../application/interfaces/IDependenciesData";
import express from "express"
import adminController from "../../presentation/controllers/adminController";
export = (dependencies: IDependenciesData) => {

    const {getAllCompany, updateRequest} = adminController(dependencies)
    const router = express.Router();
    router.get('/get-requests', getAllCompany)
    router.post('/approve-or-reject-request', updateRequest)
    return router;
}