import { FC} from 'react'
import SignUpNavbar from '../../components/user/SignUpNavbar'
import { Link } from 'react-router-dom'
import { Formik, Form } from "formik"
import SignUpInputField from "../../components/user/SignUpInputField" 
import { validationSchemaSignUp } from '../../validations/ValidationSchema'

const SignUp: FC = () => {
    return (
        <div className='flex '>
            <div className='hidden md:flex w-5/12'>
                <SignUpNavbar />
            </div>
            <div className='w-11/12 md:w-6/12'>
                    <div>
                        <h1 className='text-end mt-5 font-semibold'>Have an account?<Link to='/login' className='text-green-500 font-bold ps-2'>Sign in!</Link></h1>
                    </div>
                <div className='flex flex-col items-center'>
                    <div className='text-center mt-12'>
                        <h1 className='text-3xl font-bold'>Get Started With WorkBridgeWay</h1>
                        <h1 className='text-xs text-gray-600'>Getting started is Easy</h1>
                    </div>
                    <div className='w-28 mt-3 flex justify-center'>
                        <div className='flex border-green-500 border hover:cursor-pointer px-2 py-1 rounded-sm'>
                            <img className='w-8' src="http://pngimg.com/uploads/google/google_PNG19635.png" alt="" />
                            <h1 className='pt-1'>Google</h1>
                        </div>
                    </div>
                    <div className="flex items-center justify-center text-center">
                        <div className="pt-5 border-b border-gray-500 w-8 mx-2"></div>
                        <h1 className='text-center pt-5 text-xs'>Or continue with</h1>
                        <div className="pt-5 border-b border-gray-500 w-8 mx-2"></div>
                    </div>
                </div>

                <Formik
                    initialValues={{ userName: "", email: "", password: "", phone: "", confirmPassword: "", }}
                    validationSchema={validationSchemaSignUp}
                    onSubmit={(values, { resetForm }) => {
                        console.log(values)
                        resetForm()
                    }}>
                    <Form>
                        <SignUpInputField />
                        <div className='flex flex-col items-center'>
                            <div>
                                <button className='border font-bold px-24 py-2.5 rounded-md border-gray-400 mt-5 text-white hover:white hover:border-green-500 hover:scale-95 hover:font-semibold bg-green-500'>
                                    Create Account
                                </button>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default SignUp
