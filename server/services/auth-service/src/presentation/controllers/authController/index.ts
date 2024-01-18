import { DependenciesData } from "../../../application/interfaces/IDependencies";
import signUpUser from "./signUpUser";

export = (dependencies: DependenciesData) => {
    return {
        signUpUser:signUpUser(dependencies)
    }
}