import jobApply from "./jobApply"
export = (dependencies: any) => {
    return {
        apply:jobApply(dependencies)
    }
}