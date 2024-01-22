import { ToastContainer } from 'react-toastify'
import OtpForm from '../../components/user/OtpForm'

const Otp = () => {
  return (
    <div className='grid place-items-center'>
      <OtpForm length={4}/>
      <ToastContainer/>
    </div>
  )
}

export default Otp
