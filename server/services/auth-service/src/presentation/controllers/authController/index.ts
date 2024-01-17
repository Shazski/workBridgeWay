import signUpUser from "./signUpUser";

export = (dependencies: any) => {
    return {
        signUpUser:signUpUser(dependencies)
    }
}