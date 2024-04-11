import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, updateCompanyDetails } from '../../redux/actions/user/userActions';
import { AppDispatch, RootState } from '../../redux/store';
import { useState, useEffect, ChangeEvent, FormEvent, useContext } from 'react';
import Modal from '../../components/Modal';
import { ICompanyData } from '../../interface/ICompanyData';
import { SocketContext } from '../../context/SocketContext';

const WaitingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<ICompanyData | null>(null);
  const dispatch = useDispatch<AppDispatch>()
  const [_, setReApplied] = useState<number>(0)
  const { user } = useSelector((state: RootState) => state.user)

  const { socket } = useContext(SocketContext) || {}

  useEffect(() => {
    setFormData(user)
    const localStorageReApplied = localStorage.getItem('reappliedCount');
    // Set the reApplied state with the parsed integer value from localStorage
    setReApplied(localStorageReApplied ? parseInt(localStorageReApplied, 10) : 0);
  }, [user])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(updateCompanyDetails(formData))
  }
  const handleLogout = () => {
    if (socket && user?._id) {
      dispatch(logoutUser({ socket, userId: user._id }));
    }
  };
  return (
    <div id='wrapper' className='fixed rounded-md inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
      <div className='w-[600px] bg-white rounded-md p-2'>
        <div className='bg-white p-2 text-black' >
          {
            (user?.stage === "pending") &&
            <h1>Your are Under review we will send you a mail after verification</h1>
          }
          {
            (user?.stage === "reapplied") &&
            <>
              <h1>We Are Validating your Submition after Validating you will recieve a mail</h1>
              <h1>Thank you!</h1>
            </>
          }
          {
            user?.stage === "rejected" && <>
              <div className='flex flex-col'>
                <h1><span className='font-semibold underline-offset-1 underline'>You have been rejected by the Admin for the Reason </span><br></br> <span className='text-red-600 font-semibold'> {user?.rejectReason}</span></h1>
              </div>
            </>
          }
          <button onClick={handleLogout} className='px-4 py-2 text-red-600 font-semibold bg-gray-200 rounded-md mt-4'>Logout</button>
          {
            user?.stage === "rejected" &&
            <button disabled={user?.rejectReason === "Rejected"} onClick={() => setIsModalOpen(true)} className='px-4 ms-3 py-2 text-lightgreen disabled:opacity-50 disabled:cursor-not-allowed font-semibold bg-gray-200 rounded-md mt-4'>Verify</button>
          }
        </div>
      </div>
      {
        <>
          <Modal isVisible={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <form action="" onSubmit={handleSubmit}>
              <div>
                <input type="text" placeholder='Name' value={formData?.name} name="name" className='border ps-2 outlin rounded-md h-12 w-full' required onChange={handleChange} />
              </div>
              <div className='mt-3'>
                <input type="text" placeholder='Linked In' value={formData?.linkedIn} name="linkedIn" className='border ps-2 outlin rounded-md h-12 w-full' required onChange={handleChange} />
              </div>
              <div className='mt-3'>
                <input type="number" min={100000000} max={9999999999} placeholder='Phone' value={Number(formData?.phone)} name="phone" className='border ps-2 outlin rounded-md h-12 w-full' required onChange={handleChange} />
              </div>
              <div className='mt-3'>
                <input type="text" placeholder='headOffice' value={formData?.headOffice || ""} name="headOffice" className='border ps-2 outlin rounded-md h-12 w-full' required onChange={handleChange} />
              </div>
              <div>
                <button className='border px-24 py-2.5 rounded-md border-gray-400 mt-5 text-gray-400 hover:text-lightgreen hover:border-lightgreen hover:scale-105 hover:font-semibold'>
                  Submit
                </button>
              </div>
            </form>
          </Modal>
        </>
      }
    </div>
  )
}

export default WaitingPage