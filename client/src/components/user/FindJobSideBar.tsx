import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { useState, useEffect } from "react"
import FindJobSection from "./FindJobSection";
const FindJobSideBar = () => {
    const [showType, setShowType] = useState<boolean>(true)
    const [showCat, setShowCat] = useState<boolean>(true)
    const [showLevel, setShowLevel] = useState<boolean>(true)
    const [showSalary, setShowSalary] = useState<boolean>(true)
    const [filterValue, setFilterValue] = useState<string[]>([])

    const handleCheckBoxChange = (value: string) => {
        setFilterValue((prev: string[]) => {
            if (prev.includes(value)) {
                return prev.filter((item: string) => item !== value)
            } else {
                return [...prev, value]
            }
        })
    }

    useEffect(() => {
        console.log(filterValue)
    }, [filterValue]);

    return (
        <div className="flex mt-12">
            <div>
                <div>
                    <div className="flex gap-3 ">
                        <h1 className="font-bold">Type of Employment</h1>
                        {
                            showType ?
                                <IoIosArrowDown className="font-semibold mt-1 hover:cursor-pointer" onClick={() => setShowType(!showType)} />
                                :
                                <IoIosArrowUp className="font-semibold mt-1 hover:cursor-pointer" onClick={() => setShowType(!showType)} />
                        }
                    </div>
                    <div className={`mt-3 ${showType ? "" : "hidden"}text-gray-500`}>
                        <div className={`flex gap-3 mt-3 ${showType ? "" : "hidden"}`}>
                            <input type="checkbox" value="fulltime" name="type" className="w-4 hover:cursor-pointer" onChange={() => handleCheckBoxChange('fulltime')} />
                            <label htmlFor="">Full-time <span>(3)</span> </label>
                        </div>
                        <div className={`flex gap-3 mt-3 ${showType ? "" : "hidden"}`}>
                            <input type="checkbox" value="parttime" name="type" className="w-4 hover:cursor-pointer" onChange={() => handleCheckBoxChange('parttime')} />
                            <label htmlFor="">Part-time <span>(43)</span> </label>
                        </div>
                        <div className={`flex gap-3 mt-3 ${showType ? "" : "hidden"}`}>
                            <input type="checkbox" value="remote" name="type" className="w-4 hover:cursor-pointer" onChange={() => handleCheckBoxChange('remote')} />
                            <label htmlFor="">Remote <span>(33)</span> </label>
                        </div>
                        <div className={`flex gap-3 mt-3 ${showType ? "" : "hidden"}`}>
                            <input type="checkbox" value="internship" name="type" className="w-4 hover:cursor-pointer" onChange={() => handleCheckBoxChange('internship')} />
                            <label htmlFor="">Internship <span>(16)</span> </label>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex gap-3 mt-12">
                        <h1 className="font-bold">Categories</h1>
                        {
                            showCat ?
                                <IoIosArrowDown className="font-semibold mt-1 hover:cursor-pointer" onClick={() => setShowCat(!showCat)} />
                                :
                                <IoIosArrowUp className="font-semibold mt-1 hover:cursor-pointer" onClick={() => setShowCat(!showCat)} />
                        }
                    </div>
                    <div className={`mt-3 ${showCat ? "" : "hidden"} text-gray-500`}>
                        <div className={`flex gap-3 mt-3 ${showCat ? "" : "hidden"}`}>
                            <input type="checkbox" value="design" name="type" className="w-4 hover:cursor-pointer" onChange={() => handleCheckBoxChange('design')} />
                            <label htmlFor="">Design<span>(3)</span> </label>
                        </div>
                        <div className={`flex gap-3 mt-3 ${showCat ? "" : "hidden"}`}>
                            <input type="checkbox" value="sales" name="type" className="w-4 hover:cursor-pointer" onChange={() => handleCheckBoxChange('sales')} />
                            <label htmlFor="">Sales <span>(43)</span> </label>
                        </div>
                        <div className={`flex gap-3 mt-3 ${showCat ? "" : "hidden"}`}>
                            <input type="checkbox" value="marketing" name="type" className="w-4 hover:cursor-pointer" onChange={() => handleCheckBoxChange('marketing')} />
                            <label htmlFor="">Marketing <span>(33)</span> </label>
                        </div>
                        <div className={`flex gap-3 mt-3 ${showCat ? "" : "hidden"}`}>
                            <input type="checkbox" value="business" name="type" className="w-4 hover:cursor-pointer" onChange={() => handleCheckBoxChange('business')} />
                            <label htmlFor="">Business <span>(16)</span> </label>
                        </div>
                        <div className={`flex gap-3 mt-3 ${showCat ? "" : "hidden"}`}>
                            <input type="checkbox" value="hr" name="type" className="w-4 hover:cursor-pointer" onChange={() => handleCheckBoxChange('hr')} />
                            <label htmlFor="">HR <span>(16)</span> </label>
                        </div>
                        <div className={`flex gap-3 mt-3 ${showCat ? "" : "hidden"}`}>
                            <input type="checkbox" value="finance" name="type" className="w-4 hover:cursor-pointer" onChange={() => handleCheckBoxChange('finance')} />
                            <label htmlFor="">Finance <span>(26)</span> </label>
                        </div>
                        <div className={`flex gap-3 mt-3 ${showCat ? "" : "hidden"}`}>
                            <input type="checkbox" value="engineering" name="type" className="w-4 hover:cursor-pointer" onChange={() => handleCheckBoxChange('engineering')} />
                            <label htmlFor="">Engineering <span>(12)</span> </label>
                        </div>
                        <div className={`flex gap-3 mt-3 ${showCat ? "" : "hidden"}`}>
                            <input type="checkbox" value="technology" name="type" className="w-4 hover:cursor-pointer" onChange={() => handleCheckBoxChange('technology')} />
                            <label htmlFor="">Technology <span>(6)</span> </label>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex gap-3 mt-12">
                        <h1 className="font-bold">Job Level</h1>
                        {
                            showLevel ?
                                <IoIosArrowDown className="font-semibold mt-1 hover:cursor-pointer" onClick={() => setShowLevel(!showLevel)} />
                                :
                                <IoIosArrowUp className="font-semibold mt-1 hover:cursor-pointer" onClick={() => setShowLevel(!showLevel)} />
                        }
                    </div>
                    <div className={`mt-3 ${showLevel ? "" : "hidden"} text-gray-500`}>
                        <div className={`flex gap-3 mt-3 ${showLevel ? "" : "hidden"}`}>
                            <input type="checkbox" value="entrylevel" name="type" className="w-4 hover:cursor-pointer" onChange={() => handleCheckBoxChange('entrylevel')} />
                            <label htmlFor="">Entry Level <span>(3)</span> </label>
                        </div>
                        <div className={`flex gap-3 mt-3 ${showLevel ? "" : "hidden"}`}>
                            <input type="checkbox" value="midlevel" name="type" className="w-4 hover:cursor-pointer" onChange={() => handleCheckBoxChange('midlevel')} />
                            <label htmlFor="">Mid Level<span>(43)</span> </label>
                        </div>
                        <div className={`flex gap-3 mt-3 ${showLevel ? "" : "hidden"}`}>
                            <input type="checkbox" value="seniorlevel" name="type" className="w-4 hover:cursor-pointer" onChange={() => handleCheckBoxChange('seniorlevel')} />
                            <label htmlFor="">Senior Level<span>(33)</span> </label>
                        </div>
                        <div className={`flex gap-3 mt-3 ${showLevel ? "" : "hidden"}`}>
                            <input type="checkbox" value="director" name="type" className="w-4 hover:cursor-pointer" onChange={() => handleCheckBoxChange('director')} />
                            <label htmlFor="">Director<span>(16)</span> </label>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex gap-3 mt-12">
                        <h1 className="font-bold">Salary Range</h1>
                        {
                            showSalary ?
                                <IoIosArrowDown className="font-semibold mt-1 hover:cursor-pointer" onClick={() => setShowSalary(!showSalary)} />
                                :
                                <IoIosArrowUp className="font-semibold mt-1 hover:cursor-pointer" onClick={() => setShowSalary(!showSalary)} />
                        }
                    </div>
                    <div className={`mt-3 ${showSalary ? "" : "hidden"} text-gray-500`}>
                        <div className={`flex gap-3 mt-3 ${showSalary ? "" : "hidden"}`}>
                            <input type="checkbox" value="100000" name="type" className="w-4 hover:cursor-pointer" onChange={() => handleCheckBoxChange('100000')} />
                            <label htmlFor="">1 LPA & Below<span>(3)</span> </label>
                        </div>
                        <div className={`flex gap-3 mt-3 ${showSalary ? "" : "hidden"}`}>
                            <input type="checkbox" value="200000" name="type" className="w-4 hover:cursor-pointer" onChange={() => handleCheckBoxChange('200000')} />
                            <label htmlFor="">2 LPA & Above <span>(43)</span> </label>
                        </div>
                        <div className={`flex gap-3 mt-3 ${showSalary ? "" : "hidden"}`}>
                            <input type="checkbox" value="500000" name="type" className="w-4 hover:cursor-pointer" onChange={() => handleCheckBoxChange('500000')} />
                            <label htmlFor="">5 LPA & Above <span>(33)</span> </label>
                        </div>
                        <div className={`flex gap-3 mt-3 ${showSalary ? "" : "hidden"}`}>
                            <input type="checkbox" value="1000000" name="type" className="w-4 hover:cursor-pointer" onChange={() => handleCheckBoxChange('1000000')} />
                            <label htmlFor="">10 LPA & Above <span>(16)</span> </label>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <FindJobSection/>
            </div>
        </div>
    )
}

export default FindJobSideBar
