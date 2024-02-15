import LOGO from "../../assets/images/Logo.png"
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import Modal from "../user/Modal";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../redux/store";
import { addCategory } from "../../redux/actions/company/CompanyActions";
import { pushCategory } from "../../redux/reducers/company/companySlice";
const CompanyNavbar = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { user } = useSelector((state: any) => state.user)
    const [error, setError] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [categoryString, setCategoryString] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const { category } = useSelector((state: RootState) => state.company)
    const handleSubmit = async () => {
        const categoryData = {
            category: categoryString,
            description
        }
        if (category?.includes(categoryString.toLowerCase())) {
            return setError("Category is already added")
        }
        const res = await dispatch(addCategory(categoryData))
        console.log(res, "response data")
        dispatch(pushCategory(res?.payload?.category))
        setCategoryString('')
        setDescription('')
        setIsModalOpen(false)
    }

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError('')
            }, 5000)
        }
    }, [error])
    return (
        <div className="flex w-full sticky top-0 z-50 bg-white justify-between h-20 border-b-2">
            <div className="flex mt-1">
                <div>
                    <img src={LOGO} alt="" className="w-32" />
                </div>
                <div className="mt-3">
                    <h1>Company</h1>
                    <h1 className="font-semibold uppercase">{user.name}</h1>
                </div>
            </div>
            <div className="ms-auto">
                <button onClick={() => setIsModalOpen(true)} className="bg-lightgreen  rounded-sm px-4 py-1 mt-5 me-12 text-white font-bold">+ Add Category</button>
            </div>
            <div className="mt-6">
                <Link to={'/company/post-job'} className="bg-lightgreen  rounded-sm px-4 py-2 mt-5 me-12 text-white font-bold">+ Post a job</Link>
            </div>
            <Modal isVisible={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div>
                    {error && <h1 className="text-red-600 font-semibold">{error}</h1>}
                    <input name="category" className="border rounded-md py-2 px-4 w-full outline-none" value={categoryString} onChange={(e) => setCategoryString(e.target.value)} placeholder="eg:Sales" />
                    <input name="description" className="border rounded-md py-2 mt-2 px-4 w-full outline-none" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="eg:This is for sales category" />
                    <button onClick={handleSubmit} type="button" className="bg-lightgreen mt-3 text-white font-semibold px-3 py-1 rounded-md">ADD</button>
                </div>
            </Modal>
        </div>
    )
}

export default CompanyNavbar
