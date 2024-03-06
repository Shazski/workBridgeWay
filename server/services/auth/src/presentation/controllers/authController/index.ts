import { DependenciesData } from "../../../application/interfaces/IDependencies";
import googleAuth from "./googleAuth";
import logoutUser from "./logoutUser";
import signUpUser from "./signUpUser";
import companyRegister_controller from "./companyRegister_controller";
import login_controller from "./login_controller";

export = (dependencies: DependenciesData) => {
    return {
        signUpUser:signUpUser(dependencies),
        logoutUser:logoutUser(dependencies),
        googleAuth:googleAuth(dependencies),
        companyRegister:companyRegister_controller(dependencies),
        login:login_controller(dependencies)
    }
}