import LOGO from "../../assets/images/defaultProfile.jpg"
import PICBTN from '../../assets/images/PicButton.png'
import CLOSEEYE from "../../assets/images/close-eye.jpg"
import OPENEYE from "../../assets/images/open-eye.png"
import { FC, useState, useRef, ChangeEvent } from 'react'
import SignUpNavbar from '../../components/user/SignUpNavbar'
// import { Link } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage, isObject } from "formik"
import { validationSchemaCompanyRegister } from '../../validations/ValidationSchema'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CompanyRegister: FC = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
    const imgRef = useRef<HTMLInputElement>(null)
    const [imgPreview, setImgPreview] = useState<string | null>(null)
    const imageUpload = async (image: File) => {
        setLoading(true)
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'drtyu0yv');
        try {
            const res = await fetch('https://api.cloudinary.com/v1_1/dvjggxcc1/image/upload', {
                method: 'post',
                body: formData,
            })
            const urlData = await res.json()
            setLoading(false)
            return urlData.url
        } catch (err) {
            setLoading(false)
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

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
                    <div className="flex items-center mt-9 justify-center text-center cursor-pointer" onClick={() => imgRef?.current?.click()}>
                        <img src={imgPreview || LOGO} alt="" className='w-16' />
                        <img src={PICBTN} alt="" className='w-5 absolute ms-16 mt-14' />
                    </div>
                </div>

                <Formik
                    initialValues={{ name: "", email: "", password: "", location: "", linkedIn: "", companyLogo: null, confirmPassword: "", }}
                    validationSchema={validationSchemaCompanyRegister}
                    onSubmit={async (values, { resetForm }) => {
                        if (!isObject(values.companyLogo)) {
                            toast.error("Logo is required")
                        } else {
                            console.log(typeof values.companyLogo)
                            const companyLogo = await imageUpload(values.companyLogo)
                            values.companyLogo = companyLogo
                            console.log(values, "logocompan")
                            setImgPreview("")
                            toast.success("Register success you will get an email after admin verification")
                            resetForm()
                        }
                    }}>
                    {({ setFieldValue }) => (
                        <Form>
                            <div className='text-center pt-12'>
                                <div>
                                    <Field type="text" placeholder='Company Name' name="name" className='border ps-2 rounded-md h-12 w-64' required />
                                    <input ref={imgRef} type="file" placeholder='Company Name' className='border ps-2 rounded-md h-12 w-64 hidden' onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        const selectedFile = e.target.files && e.target.files[0];
                                        if (selectedFile) {
                                            setFieldValue("companyLogo", selectedFile);
                                            setImgPreview(URL.createObjectURL(selectedFile));
                                        }
                                    }} />
                                    <ErrorMessage name="name" component="div" className="text-red-600" />
                                    <ErrorMessage name="companyLogo" component="div" className="text-red-600" />
                                </div>
                                <div>
                                    <Field type="email" placeholder='Company Email' name="email" className='border ps-2 rounded-md h-12 w-64 mt-3' required />
                                    <ErrorMessage name="email" component="div" className="text-red-600" />
                                </div>
                                <div>
                                    <Field type="text" placeholder='Company Location' name="location" className='border ps-2 rounded-md h-12 w-64 mt-3' required />
                                    <ErrorMessage name="location" component="div" className="text-red-600" />
                                </div>
                                <div>
                                    <Field type="text" placeholder='Company LinkedIn Link' name="linkedIn" className='border ps-2 rounded-md h-12 w-64 mt-3' required />
                                    <ErrorMessage name="linkedIn" component="div" className="text-red-600" />
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
                            <div className='flex flex-col items-center'>
                                <div>
                                    <button type="submit" className='border font-bold px-24 py-2.5 rounded-md border-gray-400 mt-5 text-white hover:white hover:border-green-500 hover:scale-95 hover:font-semibold bg-green-500'>
                                        {loading ? "Loading..." : "Register"}
                                    </button>
                                </div>
                            </div>
                        </Form>

                    )}
                </Formik>
            </div>
            <ToastContainer />
        </div>
    )
}

export default CompanyRegister
