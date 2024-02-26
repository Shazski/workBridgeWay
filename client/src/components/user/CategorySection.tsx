import { MdDesignServices } from "react-icons/md";
// import { BsGraphUpArrow } from "react-icons/bs";
// import { AiOutlineSound } from "react-icons/ai";
// import { FaMoneyBillTrendUp } from "react-icons/fa6";
// import { GrCloudComputer } from "react-icons/gr";
// import { MdOutlineEngineering } from "react-icons/md";
// import { FaBusinessTime } from "react-icons/fa6";
// import { IoPeople } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect } from "react";
import { getAllJobs } from "../../redux/actions/user/userActions";
import { useNavigate } from "react-router-dom";
import { getCategory } from "../../redux/actions/company/CompanyActions";
const CategorySection = () => {
    const { jobsCount } = useSelector((state: RootState) => state.user)
    const { category } = useSelector((state: RootState) => state.company)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getAllJobs(""))
        dispatch(getCategory())
    }, [])

    return (
        <div className="ms-14 md:ms-36">
            <div className="mt-12">
                <h1 className="font-serif text-3xl">Explore by <span className="text-blue-500">category</span></h1>
            </div>
            <div className="grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 ">
                {
                    category && category.map((cat, idx) => (
                        <>
                            <div key={idx} onClick={() => navigate(`/jobs?category=${cat}`)} className="border w-64 h-44 mt-10  hover:bg-lightgreen text-lightgreen hover:scale-105 hover:cursor-pointer hover:text-white">
                                <MdDesignServices className="text-4xl m-5" />
                                <h1 className="font-serif text-lg ps-5">{cat}</h1>
                                <div className="flex">
                                    <h4 className="text-sm text-gray-500 ps-5 mt-4">{jobsCount[cat]} Jobs available </h4>
                                    <FaArrowRight className="ms-5 mt-5" />
                                </div>
                            </div>
                        </>
                    ))
                }
            </div>

            <div className="md:flex gap-14 hidden">

            </div>
        </div>
    )
}

export default CategorySection
