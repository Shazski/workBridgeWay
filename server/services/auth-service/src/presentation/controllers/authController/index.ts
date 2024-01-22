import { DependenciesData } from "../../../application/interfaces/IDependencies";
import googleAuth from "./googleAuth";
import logoutUser from "./logoutUser";
import signUpUser from "./signUpUser";

export = (dependencies: DependenciesData) => {
    return {
        signUpUser:signUpUser(dependencies),
        logoutUser:logoutUser(),
        googleAuth:googleAuth(dependencies)
    }
}