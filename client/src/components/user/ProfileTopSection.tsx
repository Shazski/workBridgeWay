import PROFILECOVERPIC from '../../assets/images/profileCoverImage.webp'
import DEFAULTPROFILE from "../../assets/images/defaultProfile.jpg"
import { FaRegEdit } from "react-icons/fa";
import { Circle } from 'rc-progress';
import { MdOutlineCategory } from "react-icons/md";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { Link } from 'react-router-dom'
import { FormEvent, useEffect, useState } from 'react';
import Modal from '../Modal';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { getCategory } from '../../redux/actions/company/CompanyActions';
import { setUserpreferredCategory } from '../../redux/actions/user/userActions';
const ProfileTopSection = ({ user }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [preferredCategory, setPreferredCategory] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>()
    const { category } = useSelector((state: RootState) => state.company)
    useEffect(() => {
        dispatch(getCategory())
    }, [])

    const handlePreferredJob = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(setUserpreferredCategory(preferredCategory))
    }
    return (
        <div className='mt-5 ms-4'>
            <div className="lg:flex gap-4">
                <div className="w-11/12 rounded-lg border shadow-md lg:h-60 lg:w-7/12">
                    <div className='m-2 relative'>
                        <img src={PROFILECOVERPIC} alt="" className='lg:w-[750px] xl:w-[800px] lg:h-32 2xl:w-[850px]' />
                        <Circle percent={user?.profileScore} gapPosition="bottom" className='absolute w-32 z-10 top-20 left-6' trailColor='#0000' strokeWidth={5} strokeColor="#20b2aa   " />
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
                <div className="w-9/12 rounded-lg sm:6/12 lg:w-2/6 shadow-md border h-48 lg:h-60 mt-2 lg:mt-0">
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
                        <h1 className='text-blue-gray-700 text-sm lg:ms-5'>{user?.email}</h1>
                        <div className="flex gap-x-1">
                            <IoPhonePortraitOutline className='mt-1 lg:mt-4' />
                            <h1 className='text-blue-gray-400 text-sm mt-1  lg:mt-4'>Phone</h1>
                        </div>
                        <h1 className='text-blue-gray-700 text-sm lg:ms-5'>{user?.phone}</h1>
                        <div className="flex gap-x-1">
                            <MdOutlineCategory className='mt-1 lg:mt-4 text-gray-800' />
                            <h1 className='text-blue-gray-400 text-sm mt-1  lg:mt-4'>Preferred Category</h1>
                            <button onClick={() => setIsModalOpen(true)} className='mt-4 text-sm px-3 py-0.5 bg-lightgreen text-white font-semibold rounded-md'>{user?.preferredCategory ? "Edit" : "Choose"}</button>
                        </div>
                        <h1 className='text-blue-gray-700 text-sm lg:ms-5'>{user?.preferredCategory || "Not Provided"}</h1>
                    </div>
                    <Modal isVisible={isModalOpen} onClose={() => setIsModalOpen(false)}>
                        <form action="" onSubmit={handlePreferredJob}>

                            <select onChange={(e) => setPreferredCategory(e.target.value)} required name="preferredCategory" id="" className='w-full px-3 py-2 outline-none'>
                                <option value="" defaultChecked hidden>Select Preferred Category</option>
                                {
                                    category?.map((cat, idx) => (
                                        <option key={idx} value={cat}>{cat}</option>
                                    ))
                                }

                            </select>
                            <div className='flex justify-center'>
                                <button className='px-3 py-2 bg-lightgreen rounded-md text-white font-semibold mt-4'>Submit</button>
                            </div>
                        </form>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default ProfileTopSection
