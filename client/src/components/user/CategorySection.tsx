import { MdDesignServices } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect } from "react";
import { getAllJobs } from "../../redux/actions/user/userActions";
import { useNavigate } from "react-router-dom";
import { getCategory } from "../../redux/actions/company/CompanyActions";
const CategorySection = () => {
    const { jobsCount } = useSelector((state: RootState) => state.job)
    const { category } = useSelector((state: RootState) => state.company)
    const { user } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    useEffect(() => {
        if (user) {
            dispatch(getAllJobs(""))
            dispatch(getCategory())
        }
    }, [])

    return (
        <div className="ms-14 md:ms-36">
            <div className="mt-12">
                <h1 className="font-serif text-3xl">Explore by <span className="text-blue-500">category</span></h1>
            </div>
            <div className="grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 ">
                {
                    category && category?.map((cat, idx) => (
                        <>
                            <div key={idx} onClick={() => navigate(`/jobs?category=${cat}`)} className="border rounded-md shadow-lg w-64 h-44 mt-10 group hover:bg-lightgreen text-lightgreen hover:scale-105 transition-all duration-300 ease-in-out hover:cursor-pointer hover:text-white">
                                <MdDesignServices className="text-4xl m-5  " />
                                <h1 className="font-serif text-lg ps-5 group-hover:translate-x-2 transition-all duration-300 ease-in">{cat}</h1>
                                <div className="flex group-hover:translate-x-2 duration-300">
                                    <h4 className="text-sm ps-5 mt-4">{jobsCount && jobsCount[cat]} Jobs available </h4>
                                    <FaArrowRight className="ms-5 mt-5 group-hover:scale-150  transition-all duration-300 ease-in" />
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
