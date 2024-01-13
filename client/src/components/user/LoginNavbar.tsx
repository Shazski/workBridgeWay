import { FC } from 'react'
import LOGO from "../../assets/images/Logo.png"
import { NavLink } from "react-router-dom"
const Navbar:FC = () => {
  return (
    <div className="md:flex text-center justify-between mx-auto">
        <img src={LOGO} alt="" className='w-36' />
      <h2 className="mt-6 me-20">Don't have an account?<NavLink to='/signup' className="ps-2 font-semibold text-green-400">Sign up!</NavLink></h2>
      </div>
  )
}

export default Navbar
