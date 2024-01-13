import { FC} from 'react'
import SignUpNavbar from '../../components/user/SignUpNavbar'
// import { Link } from 'react-router-dom'
import { Formik, Form } from "formik"
import SignUpInputField from "../../components/user/SignUpInputField" 
import { validationSchemaSignUp } from '../../validations/ValidationSchema'
import LOGO from "../../assets/images/Logo.png"
const CompanyRegister: FC = () => {
    return (
        <div className='flex'>
            <div className='hidden md:flex w-5/12'>
                <SignUpNavbar />
            </div>
            <div className='w-11/12 md:w-6/12'>

                <div className='flex flex-col items-center'>
                    <div className='text-center mt-12'>
                        <h1 className='text-3xl font-bold'>Company Registration Form</h1>
                        <h1 className='text-xs text-gray-600'>Become a part of us</h1>
                    </div>
                    <div className="flex items-center justify-center text-center">
                    <img src={LOGO} alt="" className='w-36'/>
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

export default CompanyRegister
