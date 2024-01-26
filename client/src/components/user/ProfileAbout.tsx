import { useState, useEffect, ChangeEvent, FormEvent } from "react"
import ProfileSkills from "../../components/user/ProfileSkills"
import { AppDispatch } from "../../redux/store";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { updateUserAbout } from "../../redux/actions/user/userActions";
import { toast } from "react-toastify";
const ProfileAbout = ({ user }) => {
    const dispatch = useDispatch<AppDispatch>()
    const socialLinks = [{
        link: "dasdsadsadasd",
        socialMedia: "linkedIn"
    }, {
        link: "dasdsadsadasd",
        socialMedia: "instagram"
    }, {
        link: "dasdsadsadasd",
        socialMedia: "twitter"
    }]
    const [isAboutModalOpen, setIsAboutModalOpen] = useState<boolean>(false)
    const [about, setAbout] = useState<string>("")

    useEffect(() => {
        setAbout(user?.about)
    }, [user]);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setAbout(e.currentTarget.value)
    }

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const userObj = {
            email:user?.email,
            about
        }
        await dispatch(updateUserAbout(userObj))
        toast.success("AboutMe updated successfully")
    }

    return (
        <>
            <div className="lg:flex ms-5 mt-4 gap-x-4">
                <div className="border w-full lg:w-7/12">
                    <div className="flex justify-between">
                        <h1 className="font-semibold text-gray-600 mt-3 ms-2">About Me</h1>
                        <FaRegEdit className='cursor-pointer text-lightgreen my-1 mx-2' onClick={() => setIsAboutModalOpen(true)} />
                    </div>
                    {
                        user?.about ? (
                            <h1 className="mt-4 text-sm text-blue-gray-400 ms-2">{user?.about}</h1>
                        ) : (
                            <h1 className="mt-4 text-sm text-blue-gray-400 ms-2 text-center">Tell us about yourself</h1>
                        )
                    }
                </div>
                <div className="w-6/12 lg:w-2/6  border h-48 lg:h-60 mt-2 lg:mt-0">
                    <div className='m-2 '>
                        <div className="flex justify-between">
                            <h1 className='font-semibold text-blue-gray-600 mt-0.5'>Social Links</h1>
                            <div className='border h-7  border-gray-300'>
                                <Link to={'/user/settings/edit-login'}><FaRegEdit className=' text-lightgreen my-1 mx-2' /></Link>
                            </div>
                            <Modal isVisible={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} >
                                <form action="" onSubmit={handleSubmit}>
                                    <h1 className="font-semibold text-blue-gray-700">About Me</h1>
                                    <textarea onChange={handleChange} name="about" className="border rounded-md py-2 w-full h-32 outline-none" value={about} />
                                    <div className="flex justify-end me-2 mt-2">
                                        <button className="px-3 py-2 bg-lightgreen text-white font-semibold rounded-md">Submit</button>
                                    </div>
                                </form>
                            </Modal>
                        </div>
                        {
                            socialLinks.map((value, index) => (
                                <div key={index}>
                                    <div className='flex gap-x-1'>
                                        <h1 className='text-blue-gray-400 text-sm lg:mt-6'>{value?.socialMedia}</h1>
                                    </div>
                                    <h1 className='text-lightgreen text-sm lg:ms-5'>{value?.link}</h1>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </div>
            <ProfileSkills user={user} isAboutModalOpen={isAboutModalOpen} />
        </>
    )
}

export default ProfileAbout
