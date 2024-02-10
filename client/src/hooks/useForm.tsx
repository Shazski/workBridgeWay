import { useState, ChangeEvent } from "react"
import { IUserLoginData } from "../interface/IuserLogin"
const useForm = (initialState: IUserLoginData) => {
    const [values, setValues] = useState<IUserLoginData>(initialState)

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.currentTarget
        setValues({
            ...values, [name]: value
        })
    }

    return {
        values, handleChange, setValues
    }

}


export default useForm