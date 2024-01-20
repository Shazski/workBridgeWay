import { useState, ChangeEvent, KeyboardEvent, useRef, useEffect } from 'react'
import CountdownTimer from './CountDownTimer';

const OtpForm = ({ length = 4 }: { length: number }) => {
  const [otp, setOtp] = useState<(string | number)[]>(new Array(length).fill(""))
  const inputRef = useRef<(HTMLInputElement | null)[]>(new Array(length).fill(""));

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    console.log("dasdas")
    const value = e.currentTarget.value

    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp)

    const combinedOtp = newOtp.join("")
    console.log(combinedOtp)

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

  useEffect(() => {
    if (inputRef.current[0]) {
      inputRef.current[0].focus()
    }
  }, [])
  return (
    <div className='flex flex-col items-center bg-teal-100 rounded-md w-6/12 h-96 justify-center mt-32 bg-transparent'>
      <div>
        <h1 className='font-semibold'>Enter Otp sent to sharoonkp267@gmail.com</h1>
      </div>
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
              className='border w-12 h-12 ms-1 cursor-pointer rounded-md text-red-700 text-xl text-center'
            />
          })
        }
      </div>
      <div className='mt-12 flex gap-1'>
        <h1>Resend OTP In </h1>
        {<CountdownTimer/>}
      </div>
      <div className='mt-6'>
        <button className='bg-lightgreen text-white font-semibold px-6 py-2 rounded-md'>submit</button>
      </div>
    </div>
  )
}

export default OtpForm
