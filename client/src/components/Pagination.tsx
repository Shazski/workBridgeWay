import { useEffect, useState } from 'react'
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useSearchParams } from 'react-router-dom';
const Pagination = ({ length, sentToParent, page }) => {
    const [currentPage, setCurrentPage] = useState<number>(page)
    const recordsPerPage = 10;
    const npage = Math.ceil(length / recordsPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)
    const [searchparams, _] = useSearchParams()
    const handleClick = (n:number) => {
        setCurrentPage(n)
        const paginationData =  {
            currentPage: n,
            recordsPerPage: recordsPerPage
        }
        sentToParent(paginationData);
    };
    const handlePrev = () => {
        if (currentPage > 1){
            handleClick(currentPage - 1)
        }
    }
    const handleNext = () => {
        if (currentPage < npage){
            handleClick(currentPage + 1)
        }
    }

    useEffect(() => {
        const pageNumber = searchparams.get("page")
        if(pageNumber) {
            setCurrentPage(Number(pageNumber))
        } else {
            setCurrentPage(1)
        }
    },[])
    return (
        <div  className="flex justify-between mt-5 ms-2">
            <div className="flex me-44 gap-3">
                <MdOutlineKeyboardArrowLeft className={`text-2xl mt-1 cursor-pointer ${currentPage === 1 ? 'hidden':''}`} onClick={handlePrev} />
                {
                    numbers.map((n,i) => (
                        <h1 key={i} onClick={() => handleClick(n)} className={` ${currentPage === n ? 'paginationactive text-white font-semibold' : ""} cursor-pointer rounded-md px-4 py-1 `}>{n}</h1>
                    ))
                }
                <MdOutlineKeyboardArrowRight className={`text-2xl mt-1 cursor-pointer ${currentPage === npage ? 'hidden':''}`} onClick={handleNext} />
            </div>
        </div>
    )
}

export default Pagination
