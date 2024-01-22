import { useState, ChangeEvent, KeyboardEvent, useRef, useEffect } from 'react'
import CountdownTimer from './CountDownTimer';
import { AppDispatch } from '../../redux/store';
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { userSignUp } from '../../redux/actions/user/userActions';
import { useNavigate } from 'react-router-dom';
import { IUserLoginData } from '../../interface/IuserLogin';
const OtpForm = ({ length = 4 }: { length: number }) => {

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { user, error } = useSelector((state: any) => state.user)
  const [otp, setOtp] = useState<(string | number)[]>(new Array(length).fill(""))
  const inputRef = useRef<(HTMLInputElement | null)[]>(new Array(length).fill(""));
  const formData:IUserLoginData = {
    email: user?.user?.email || user?.email,
    userName: user?.user?.userName || user?.userName,
    password: user?.user?.password || user?.password,
    phone: user?.user?.phone || user?.phone
  }
  useEffect(() => {
    if (inputRef.current[0]) {
      inputRef.current[0].focus()
    }
    console.log(user,"user redux data")
    if(user && !user?.user) {
      navigate('/')
    }
  }, [user, navigate])
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

  

  const handleSubmit = async () => {
    const combinedOtp = otp.join("")
    console.log(combinedOtp)
    const newFormData = { ...formData }

    newFormData.otp = Number(combinedOtp)

    const success = await dispatch(userSignUp(newFormData))
    if (success.payload.success) {
      toast.success("user Created successfully")
      navigate('/')
    }
  }

  const handleResendOtp = () => {
    const newFormData = { ...formData }
    dispatch(userSignUp(newFormData))
  }

  return (
    <div className='flex flex-col items-center bg-blue-gray-800 text-white rounded-md w-6/12 h-96 justify-center mt-32 bg-transparent'>
      <div>
        <h1 className='font-semibold'>Enter Otp sent to {user?.user?.email}</h1>
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
            />
          })
        }
      </div>
      <div className='mt-12 flex gap-1'>
        <h1>Resend OTP</h1>
        {<CountdownTimer resendOtp={handleResendOtp} />}
      </div>
      <div className='mt-6'>
        <button onClick={handleSubmit} className='bg-lightgreen text-white font-semibold px-6 py-2 rounded-md'>submit</button>
      </div>
    </div>
  )
}

export default OtpForm
