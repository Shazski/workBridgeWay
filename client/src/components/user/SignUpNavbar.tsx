import LOGO from "../../assets/images/Logo.png"
import SIGNUPIMG from "../../assets/images/signuppageicon.png"
const SignUpNavbar = () => {
  return (
    <div>
        <img src={LOGO} alt="" className='w-36 absolute' />
      <img src={SIGNUPIMG} className='h-screen' alt="" />
    </div>
  )
}

export default SignUpNavbar
