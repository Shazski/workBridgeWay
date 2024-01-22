import { DependenciesData } from "../../../application/interfaces/IDependencies";
import logoutUser from "./logoutUser";
import signUpUser from "./signUpUser";

export = (dependencies: DependenciesData) => {
    return {
        signUpUser:signUpUser(dependencies),
        logoutUser:logoutUser()
    }
}