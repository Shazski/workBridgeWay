import { useState } from 'react'
import { Field, ErrorMessage } from 'formik';
import CLOSEEYE from "../../assets/images/close-eye.jpg"
import OPENEYE from "../../assets/images/open-eye.png"
const SignUpInputField = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
    return (
        <div>
            <div className='text-center pt-12'>

                <div>
                    <Field type="text" placeholder='User Name' name="userName" className='border ps-2 rounded-md h-12 w-64' required />
                    <ErrorMessage name="userName" component="div" className="text-red-600" />
                </div>
                <div>
                    <Field type="email" placeholder='Email' name="email" className='border ps-2 rounded-md h-12 w-64 mt-3' required/>
                    <ErrorMessage name="email" component="div" className="text-red-600" />
                </div>
                <div>
                    <Field type="number" placeholder='Phone' name="phone" className='border ps-2 rounded-md h-12 w-64 mt-3' required/>
                    <ErrorMessage name="phone" component="div" className="text-red-600" />
                </div>
                <div className='flex justify-center relative'>
                    <Field name="password" type={showPassword ? "text" : "password"} placeholder='Password' className='border  ps-2 rounded-md h-12 w-64 mt-3' required />
                    <img className='absolute hover:cursor-pointer top-4 right-1/4 w-6 h-8 pt-2 lg:right-auto ms-56 lg:left-auto' src={showPassword ? OPENEYE : CLOSEEYE} alt="" onClick={() => setShowPassword(!showPassword)} />
                </div>
                <ErrorMessage name="password" component="div" className="text-red-600" />
                <div className='flex justify-center relative'>
                    <Field name="confirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder='Confirm Password' className='border  ps-2 rounded-md h-12 w-64 mt-3' required />
                    <img className='absolute hover:cursor-pointer top-4 right-1/4 w-6 h-8 pt-2 lg:right-auto ms-56 lg:left-auto' src={showConfirmPassword ? OPENEYE : CLOSEEYE} alt="" onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                </div>
                <ErrorMessage name="confirmPassword" component="div" className="text-red-600" />
            </div>
        </div>
    )
}

export default SignUpInputField
