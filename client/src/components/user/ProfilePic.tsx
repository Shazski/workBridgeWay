import { useSelector } from "react-redux";
import DEFAULTPROFILE from "../../assets/images/defaultProfile.jpg";
import { CiImageOn } from "react-icons/ci";
import { useRef, useState, useEffect } from "react";

const ProfilePic = () => {
    const [userData, setUserData] = useState<any>(null)
    const profileRef = useRef<HTMLInputElement | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [droppedImage, setDroppedImage] = useState<string | null>(null);
    const { user } = useSelector((state: any) => state.user);

    useEffect(() => {
        const newUserData = {
            userName: user?.userName,
            email: user?.email,
            profilePic: user?.profilePic,
            dob: user?.dob,
            phone: user?.phone
        }
        setUserData({ ...newUserData })
    }, [user])

    const fileDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {

            userData.profilePic = files[0];
            const imageUrl = URL.createObjectURL(files[0]);
            setDroppedImage(imageUrl);
        }
    };

    const handleImageClick = () => {
        profileRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files && files.length > 0) {

            userData.profilePic = files[0];
            const imageUrl = URL.createObjectURL(files[0]);
            setDroppedImage(imageUrl);
        }
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("dfasdsad")
        const { name, value } = event.currentTarget
        console.log(name, value)
        const file: any = event.target.files
        if (name === 'profilePic' && file) {
            setUserData({
                ...userData,
                [name]: file[0],
            })
        } else {
            setUserData({
                ...userData,
                [name]: value,
            });
        }
    }
    const imageUpload = async (image: any) => {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'drtyu0yv');
        try {
            const res = await fetch('https://api.cloudinary.com/v1_1/dvjggxcc1/image/upload', {
                method: 'post',
                body: formData,
            })
            const urlData = await res.json()
            return urlData.url
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (userData.profilePic) {
            console.log("is it here cpomigng")
            const profilePic = await imageUpload(userData.profilePic)
            userData.profilePic = profilePic
        }
        console.log(userData, "my userData details")
        // await dispatch(editUser(formData))
        // setImagePreview(null)
    }

    return (
        <>
            <form action="" onSubmit={handleSubmit}>
                <div className="md:flex gap-12 w-full border-b-2">
                    <div className="ms-6 mt-5 w-3/6 md:w-2/6">
                        <h1 className="font-semibold text-sm text-gray-800">Profile Photo</h1>
                        <h1 className="text-xs text-gray-600">This image will be shown publicly as your profile picture, it will help recruiters recognize you!</h1>
                    </div>
                    <div
                        onDragOver={(e) => e.preventDefault()}
                        onDragEnter={(e) => e.preventDefault()}
                        onDragLeave={(e) => e.preventDefault()}
                        onDrop={fileDrop}
                        className="ms-6  cursor-pointer md:me-44 mt-3 md:ms-0  text-center  flex gap-4"
                    >
                        <div>
                            <img onClick={handleImageClick} src={droppedImage || user?.profilePic || DEFAULTPROFILE} alt="" className="w-20 h-20 rounded-full" />
                        </div>
                        <div className="border-2 flex flex-col items-center cursor-pointer justify-center border-lightgreen w-60 h-24 border-dashed">
                            <div>
                                <CiImageOn className="text-xl text-lightgreen" />
                            </div>
                            <div>
                                <h1 className="text-sm text-gray-500">Click to replace or drag and drop</h1>
                            </div>
                        </div>
                    </div>
                    <input ref={profileRef} type="file" id="profilepic" hidden accept=".png, .jpg" onChange={handleFileChange} />
                </div>
                <div className="ms-6 mt-4 md:flex  w-full">
                    <div className="md:w-4/12">
                        <h1 className="font-semibold text-sm">Personal Details</h1>
                    </div>
                    <div className="flex flex-col gap-y-3">
                        <div className="md:flex flex-col">
                            <label className="" htmlFor="">Full Name</label>
                            <input type="text" value={userData?.userName} className="border border-gray-400 ms-4 md:ms-0 outline-none ps-4 py-3 w-44 md:w-[420px] rounded-md" onChange={handleChange} name="userName" />
                        </div>
                        <div className="md:flex gap-4">
                            <div className="md:flex flex-col ">
                                <label className="text-start" htmlFor="">Email</label>
                                <input readOnly type="text" value={userData?.email} className="border border-gray-400 ms-4 md:ms-0 outline-none ps-4 py-3 w-56 rounded-md" onChange={handleChange} name="email" />
                            </div>
                            <div className="md:flex flex-col mt-3 md:mt-0">
                                <label className="text-start" htmlFor="">Phone</label>
                                <input type="number" value={userData?.phone} className="border border-gray-400 ms-4 md:ms-0 outline-none ps-4 py-3 w-44 rounded-md" onChange={handleChange} name="phone" />
                            </div>
                        </div>
                        <div className="md:flex flex-col">
                            <label className="" htmlFor="">Date of Birth</label>
                            <input type="Date" value={userData?.dob} className="border border-gray-400 ms-4 md:ms-0 outline-none ps-4 py-3 w-44 md:w-[420px] rounded-md" onChange={handleChange} name="dob" />
                        </div>
                        <div className="mt-4 md:text-end">
                            <button type="submit" className="px-4  py-2 bg-lightgreen text-white font-semibold">{isLoading ? "Updating..." : "Save Profile"}</button>
                        </div>
                    </div>
                </div>
            </form >
        </>
    );
};

export default ProfilePic;
