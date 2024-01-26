import PROFILECOVERPIC from '../../assets/images/profileCoverImage.webp'
import DEFAULTPROFILE from "../../assets/images/defaultProfile.jpg"
import { IoLanguageSharp } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { Link } from 'react-router-dom'
const ProfileTopSection = ({ user }) => {
    const languages = ["english", "malayalam", "englsih", 'asdsad', "dasdasd", 'dasdas']

    return (
        <div className='mt-5 ms-4'>
            <div className="lg:flex gap-4">
                <div className="w-11/12  border lg:h-60 lg:w-7/12">
                    <div className='m-2 relative'>
                        <img src={PROFILECOVERPIC} alt="" className='lg:w-[750px] lg:h-32 ' />
                        <img src={user?.profilePic || DEFAULTPROFILE} alt="" className='rounded-full w-16 h-16 absolute sm:top-20 top-16 ms-3 lg:w-32 lg:h-32 lg:top-20 lg:ms-6 border-4 border-white ' />
                    </div>
                    <div className='ms-24 lg:ms-52 '>
                        <h1 className='text-gray-600 font-semibold'>{user?.userName}</h1>
                        <h1 className='text-gray-600 font-semibold '>{user?.job}</h1>
                    </div>
                    <div className='w-24 lg:w-32 lg:me-2 2xl:me-16 xl:me-6 ms-auto me-2 mt-4 mb-3'>
                        <Link to={'/user/settings/edit-profile'} className='text-sm  font-semibold px-2 lg:py-3 lg:px-6 text-lightgreen py-1 border border-gray-200 '>Edit Profile</Link>
                    </div>
                </div>
                <div className="w-9/12 sm:6/12 lg:w-2/6  border h-48 lg:h-60 mt-2 lg:mt-0">
                    <div className='m-2 '>
                        <div className="flex justify-between">
                            <h1 className='font-semibold text-blue-gray-800 mt-0.5'>Additonal Details</h1>
                            <div className='border h-7  border-gray-300'>
                                <Link to={'/user/settings/edit-login'}><FaRegEdit className=' text-lightgreen my-1 mx-2' /></Link>
                            </div>
                        </div>
                        <div className='flex gap-x-1'>
                            <CiMail className="lg:mt-6" />
                            <h1 className='text-blue-gray-400 text-sm lg:mt-6'>Email</h1>
                        </div>
                        <h1 className='text-blue-gray-700 text-sm lg:ms-5'>{user.email}</h1>
                        <div className="flex gap-x-1">
                            <IoPhonePortraitOutline className='mt-1 lg:mt-4' />
                            <h1 className='text-blue-gray-400 text-sm mt-1  lg:mt-4'>Phone</h1>
                        </div>
                        <h1 className='text-blue-gray-700 text-sm lg:ms-5'>{user.phone}</h1>
                        <div className="flex gap-x-1">
                            <IoLanguageSharp className="mt-1.5 lg:mt-4" />
                            <h1 className='text-blue-gray-400 text-sm mt-1 lg:mt-4'>Languages</h1>
                        </div>
                        <div className='lg:ms-5'>
                            <div className="flex gap-x-2">

                                <div className='grid grid-cols-3 md:grid-cols-4 gap-x-2 '>
                                    {
                                        languages.map((value, index) => (
                                            <div key={index}>
                                                <h1 className='text-blue-gray-700 text-sm'>{value}</h1>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileTopSection
