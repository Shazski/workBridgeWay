import { useState, useEffect, ChangeEvent, FormEvent } from "react"
import ProfileSkills from "../../components/user/ProfileSkills"
import { AppDispatch } from "../../redux/store";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch } from "react-redux"
import Modal from "./Modal";
import { removeUserSocialLinks, updateUserAbout, updateUserSocialLinks } from "../../redux/actions/user/userActions";
import { toast } from "react-toastify";
import useForm from "../../hooks/useForm";
const ProfileAbout = ({ user }) => {
    const dispatch = useDispatch<AppDispatch>()
    const [isAboutModalOpen, setIsAboutModalOpen] = useState<boolean>(false)
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false)
    const [isSocialModalOpen, setIsSocialModalOpen] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const [removeValue, setRemoveValue] = useState<{

        socialMedia: string,
        link: string,

    }>({

        socialMedia: "",
        link: "",

    })
    const { values, handleChange } = useForm({ socialMedia: "", link: "", email: user?.email })
    const [about, setAbout] = useState<string>("")

    useEffect(() => {
        setAbout(user?.about)
    }, [user]);

    const handleAboutChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setAbout(e.currentTarget.value)
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const userObj = {
            email: user?.email,
            about
        }
        await dispatch(updateUserAbout(userObj))
        toast.success("AboutMe updated successfully")
    }

    const handleSocialLinkSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const userObj = {
            email: values?.email || "",
            socialLinks: {
                socialMedia: values?.socialMedia || "",
                link: values?.link || ""
            }
        }
        if (!userObj.socialLinks.socialMedia || !userObj.socialLinks.link) return;
        for (const key in user.socialLinks) {
            if (user.socialLinks[key].socialMedia === values?.socialMedia || user.socialLinks[key].link === values?.link) {
                return setError("This social media or its link is already in your profile")
            }
        }

        await dispatch(updateUserSocialLinks(userObj))

    }
    const handleRemove = async (value: { socialMedia: string, link: string }) => {
        const userObj = {
            email: user?.email,
            socialLinks: {
                socialMedia: value.socialMedia,
                link: value.link
            }
        }
        console.log(userObj)
        const res = await dispatch(removeUserSocialLinks(userObj))
        console.log(res)
        toast.success("sociaLink removed successfully")
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
                <div className="w-6/12 lg:w-2/6  border  lg:h-60 mt-2 lg:mt-0">
                    <div className='m-2 '>
                        <div className="flex flex-wrap justify-between">
                            <h1 className='font-semibold text-blue-gray-600 mt-0.5'>Social Links</h1>
                            <div className='border h-7  border-gray-300'>
                                <FaRegEdit className='cursor-pointer text-lightgreen my-1 mx-2' onClick={() => setIsSocialModalOpen(true)} />
                            </div>
                            <Modal isVisible={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} >
                                <form action="" onSubmit={handleSubmit}>
                                    <h1 className="font-semibold text-blue-gray-700">About Me</h1>
                                    <textarea onChange={handleAboutChange} name="about" className="border rounded-md py-2 w-full h-32 outline-none" value={about} />
                                    <div className="flex justify-end me-2 mt-2">
                                        <button className="px-3 py-2 bg-lightgreen text-white font-semibold rounded-md">Submit</button>
                                    </div>
                                </form>
                            </Modal>
                            <Modal isVisible={isSocialModalOpen} onClose={() => setIsSocialModalOpen(false)} >
                                <form action="" onSubmit={handleSocialLinkSubmit}>
                                    {error && <h1 className="text-red-600 font-semibold">{error}</h1>}
                                    <h1 className="font-semibold text-blue-gray-700">Social Media Name</h1>
                                    <input onChange={handleChange} name="socialMedia" className="border rounded-md py-2 w-full outline-none" />
                                    <h1 className="font-semibold text-blue-gray-700">Social Media Link</h1>
                                    <input onChange={handleChange} name="link" className="border rounded-md py-2 w-full outline-none" />
                                    <div className="flex justify-end me-2 mt-2">
                                        <button className="px-3 py-2 bg-lightgreen text-white font-semibold rounded-md">Submit</button>
                                    </div>
                                </form>
                            </Modal>
                            <Modal isVisible={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)} >
                                <h1 className="uppercase font-semibold text-center">Do you want to delete?</h1>
                                <div className="flex gap-x-2 justify-center ">
                                    <button onClick={() => handleRemove(removeValue)} className="bg-red-600 text-white font-semibold px-3 mt-2 py-2 rounded-md">Yes</button>
                                    <button onClick={() => setIsConfirmModalOpen(false)} className="bg-blue-600 text-white font-semibold px-4 mt-2 py-2 rounded-md">No</button>
                                </div>
                            </Modal>
                        </div>
                        {
                            user?.socialLinks.length > 0 ? (
                                <>
                                    {user?.socialLinks.map((value: { socialMedia: string, link: string }, index: number) => (
                                        <div key={index}>
                                            <div className='flex justify-between gap-x-1'>
                                                <h1 className='text-blue-gray-400 text-sm lg:mt-6'>{value?.socialMedia}</h1>
                                                <h1 onClick={() => {setRemoveValue(value),setIsConfirmModalOpen(true)} } className="text-xs text-red-600 mt-6 me-5 cursor-pointer">X</h1>
                                            </div>
                                            <a href={`https://${value?.link}`} target="_blank" rel="noopener noreferrer" className='text-lightgreen text-sm'>{value?.link}</a>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <>
                                    <div className="flex justify-center items-center h-36">
                                        <h1 className="text-center text-gray-500 items-center">Provide Your Social Links</h1>
                                    </div>
                                </>
                            )
                        }

                    </div>
                </div>
            </div>
            <ProfileSkills user={user} isAboutModalOpen={isAboutModalOpen} isSocialModalOpen={isSocialModalOpen} isSocialConfirmModalOpen = {isConfirmModalOpen}/>
        </>
    )
}

export default ProfileAbout
