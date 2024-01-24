import { ChangeEvent, useState } from 'react'
import CLOSEEYE from "../../assets/images/close-eye.jpg"
import OPENEYE from "../../assets/images/open-eye.png"
const PasswordField = ({placeHolder,name,style, handleChange}:{placeHolder:string,name:string,style:string, handleChange:(e:ChangeEvent<HTMLInputElement>) => void}) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    return (
        <div className='flex justify-center relative'>
            <input name={`${name}`} type={showPassword ? "text" : "password"} placeholder={`${placeHolder}`} className={`${style}`} onChange={handleChange} required />
            <img className='absolute hover:cursor-pointer top-1 right-1/4 w-6 h-8 pt-2  lg:right-auto ms-96 lg:left-auto' src={showPassword ? OPENEYE : CLOSEEYE} alt="" onClick={() => setShowPassword(!showPassword)} />
        </div>
    )
}

export default PasswordField
