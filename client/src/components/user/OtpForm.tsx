import { useState, ChangeEvent, KeyboardEvent, useRef, useEffect } from 'react'
import CountdownTimer from './CountDownTimer';
import { AppDispatch } from '../../redux/store';
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-hot-toast"
import { changeUserEmail, userSignUp } from '../../redux/actions/user/userActions';
import { useLocation, useNavigate } from 'react-router-dom';
import { IUserLoginData } from '../../interface/IuserLogin';
const OtpForm = ({ length = 4 }: { length: number }) => {

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const location = useLocation()
  const { user, error } = useSelector((state: any) => state.user)
  const [otp, setOtp] = useState<(string | number)[]>(new Array(length).fill(""))
  const inputRef = useRef<(HTMLInputElement | null)[]>(new Array(length).fill(""));
  const formData: IUserLoginData = {
    email: user?.user?.email || user?.email,
    userName: user?.user?.userName || user?.userName,
    password: user?.user?.password || user?.password,
    phone: user?.user?.phone || user?.phone
  }
  useEffect(() => {
    if (inputRef.current[0]) {
      inputRef.current[0].focus()
    }
    if (user && !user?.user && location.pathname === "/otp") {
      navigate('/')
    }
  }, [user, navigate, location.pathname])
  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value

    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp)


    if (value && index < length - 1 && inputRef.current[index + 1]) {
      inputRef.current[index + 1]?.focus()
    }
  }
  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0 && inputRef.current[index - 1]) {
      inputRef.current[index - 1]?.focus()
    }
  }
  const handleClick = (index: number) => {
    inputRef.current[index]?.setSelectionRange(1, 1)
  }

  const handleMultipleSubmit = () => {
    if (location.pathname === "/otp") {
      handleSignUpSubmit()
    } else {
      handleUpdateEmailSubmit()
    }
  }
  const handleUpdateEmailSubmit = async () => {
    const combinedOtp = otp.join("");
    const newFormData: { email: any; otp?: number, oldEmail: string } = {
      email: user.newEmail,
      oldEmail: user.email
    };

    if (Number(combinedOtp) > 0) {
      newFormData.otp = Number(combinedOtp);
    } else {
      newFormData.otp = 1
    }

    const success = await dispatch(changeUserEmail(newFormData));

    if (success.payload.email) {
      toast.success("Email Updated successfully");
      navigate('/user/settings/edit-login');
    }
  };

  const handleSignUpSubmit = async () => {
    const combinedOtp = otp.join("")
    const newFormData = { ...formData }

    newFormData.otp = Number(combinedOtp)

    const success = await dispatch(userSignUp(newFormData))
    if (success.payload.success) {
      toast.success("user Created successfully")
      navigate('/')
    }
  }

  const handleResendOtp = () => {
    if (location.pathname === "/otp") {
      const newFormData = { ...formData }
      dispatch(userSignUp(newFormData))
    } else {
      const resendOtpObj = {
        email: user.newEmail,
        oldEmail: user.email
      }
      dispatch(changeUserEmail(resendOtpObj))
    }
  }

  return (
    <div className='flex flex-col items-center bg-teal-700 text-black rounded-md w-6/12 h-96 justify-center mt-32 bg-transparent'>
      <div>
        <h1 className='font-semibold'>Enter Otp sent to {user?.user?.email || user?.newEmail}</h1>
      </div>
      {
        error && <h1 className='text-red-600 font-semibold'>{error}</h1>
      }
      <div className='mt-12'>
        {
          otp.map((value, index) => {
            return <input
              type="text"
              ref={(input) => (inputRef.current[index] = input)}
              key={index}
              value={value}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onChange={(e) => handleChange(index, e)}
              onClick={() => handleClick(index)}
              className='border w-12 h-12 ms-1 cursor-pointer rounded-md text-lightgreen text-xl text-center'
              required
            />
          })
        }
      </div>
      <div className='mt-12 flex gap-1'>
        <h1>Resend OTP</h1>
        {<CountdownTimer resendOtp={handleResendOtp} />}
      </div>
      <div className='mt-6'>
        <button onClick={handleMultipleSubmit} className='bg-lightgreen text-white font-semibold px-6 py-2 rounded-md'>submit</button>
      </div>
    </div>
  )
}

export default OtpForm
