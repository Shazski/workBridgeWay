import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import VERIFIED from '../../assets/images/verified.png'
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { validatePassword } from "../../validations/ValidationSchema";
import { changeUserEmail, changeUserPassowrd } from "../../redux/actions/user/userActions";
import PasswordField from "./PasswordField";
import { useNavigate } from "react-router-dom";
const UpdateLoginDetails = () => {
    const { user, error } = useSelector((state: any) => state.user);
    const [err, setErr] = useState<string>("")
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [newEmail, setNewEmail] = useState<string>("");
    const [password, setPassword] = useState<{ oldPassword: string, newPassword: string, email?: string }>({ oldPassword: "", newPassword: "", email: "", });
    const [passwordValidation, setPasswordValidation] = useState<string | null>(null);

    useEffect(() => {
        if (err !== "") {
            setTimeout(() => {
                setErr("")
            }, 7000);
        }
    }, [err])

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewEmail(e.currentTarget.value)
    }
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        if (name === "newPassword") {
            setPasswordValidation(validatePassword(value));
        }
        setPassword({
            ...password,
            [name]: value
        });
    };

    const handlePasswordSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        password.email = user?.email
        dispatch(changeUserPassowrd(password))
    }
    const handleEmailSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (newEmail === user.email) {
            setErr("The email is same as your email")
            return
        }

        const userCredentials = {
            email: newEmail,
            oldEmail: user.email
        }
       const res = await dispatch(changeUserEmail(userCredentials))
        if(res.payload.success) {
            navigate('/update-email/otp')
        }
    }
    return (
        <div>
            <form action="" onSubmit={handleEmailSubmit}>
                <div className="ms-6 mt-4 md:flex">
                    <div className="md:w-4/12">
                        <h1 className="font-semibold text-sm text-gray-600 ">Update Email</h1>
                        <h1 className="font-medium text-xs text-gray-600 ">Update your
                            email address to make sure it is safe</h1>
                    </div>
                    <div className="flex flex-col gap-y-3">
                        <div className="md:flex flex-col mt-2">
                            <div className="flex gap-2">
                                <h1 className="text-gray-600 font-semibold font-sans">{user?.email}</h1>
                                <img src={VERIFIED} alt="" />
                            </div>
                            <h1 className="text-gray-600 text-xs">Your email address is verified</h1>
                            <label className="text-gray-600 font-medium font-sans mt-3" htmlFor="">Update Email</label>
                            <input required type="email" className="border border-gray-400 ms-4 md:ms-0 outline-none ps-4 py-3 w-44 md:w-[420px] rounded-md" onChange={handleEmailChange} value={newEmail} placeholder="Enter your new email" name="email" />
                        </div>
                        {err && <h1 className="text-red-600 font-semibold">{err}</h1>}
                        <div className="mt-4 md:text-end">
                            <button type="submit" className="px-4  py-2 bg-lightgreen text-white font-semibold">Update Email</button>
                        </div>
                    </div>
                </div>
            </form>
            <form action="" onSubmit={handlePasswordSubmit}>
                <div className="ms-6 mt-4 md:flex">
                    <div className="md:w-4/12">
                        <h1 className="font-semibold text-sm text-gray-600 ">New Password</h1>
                        <h1 className="font-medium text-xs text-gray-600 ">Manage your password to make sure it is safe</h1>
                    </div>
                    <div className="flex flex-col gap-y-3">
                        {error && <h1 className="text-red-600 font-semibold">{error}</h1>}
                        <div className="md:flex flex-col mt-2">
                            <label className="text-gray-600 font-medium font-sans" htmlFor="">Old Password</label>
                            <PasswordField placeHolder="Enter your old password" name="oldPassword" handleChange={handlePasswordChange} style="border border-gray-400 ms-4 md:ms-0 outline-none md:ps-4 py-3 w-44 md:w-[420px] rounded-md" />
                        </div>
                        <div className="md:flex flex-col mt-2">
                            <label className="text-gray-600 font-medium font-sans" htmlFor="">New Password</label>
                            <PasswordField placeHolder="Enter your new password" name="newPassword" handleChange={handlePasswordChange} style="border border-gray-400 ms-4 md:ms-0 outline-none md:ps-4 py-3 w-44 md:w-[420px] rounded-md" />
                            {passwordValidation && <p className="text-red-500 text-xs mt-1">{passwordValidation}</p>}
                        </div>
                        <div className="mt-4 md:text-end">
                            <button type="submit" className="px-4  py-2 bg-lightgreen text-white font-semibold">Change Password</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdateLoginDetails
