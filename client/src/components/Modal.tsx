import { ReactNode } from 'react'
import { IoCloseCircleSharp } from "react-icons/io5";

const Modal = ({ isVisible, onClose,children }: { isVisible: boolean, onClose: () => void,children:ReactNode }) => {
  if (!isVisible) return null

  return (
    <div id='wrapper' className='fixed top-0 overflow-y-scroll rounded-md inset-0 z-50 scrollbar bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
      <div className='w-[600px] bg-white rounded-md p-2 mt-12'>
        <IoCloseCircleSharp onClick={() => onClose()} className='text-black text-xl hover:cursor-pointer font-bold ms-auto'>X</IoCloseCircleSharp>
        <div className='bg-white p-2 text-black' >
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal