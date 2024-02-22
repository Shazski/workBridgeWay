import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { useState, useEffect } from "react"
import FindJobSection from "./FindJobSection";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../redux/actions/company/CompanyActions";
import { AppDispatch, RootState } from "../../redux/store";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { getAllJobs } from "../../redux/actions/user/userActions";
const FindJobSideBar = () => {

  const { category } = useSelector((state: RootState) => state.company)
  const { jobsCount } = useSelector((state: RootState) => state.user)

  const [showType, setShowType] = useState<boolean>(true)
  const [showCat, setShowCat] = useState<boolean>(true)
  const [showSalary, setShowSalary] = useState<boolean>(true)

  const [searchParams, setSearchParams] = useSearchParams()

  const dispatch = useDispatch<AppDispatch>()

  const [page, setPage] = useState<number>(1);
  const [categories, setCategories] = useState<string[]>([]);
  const [typeOfEmployment, setTypeOfEmployment] = useState<string[]>([]);
  const [fromSalary, setFromSalary] = useState<number>(0);
  const [toSalary, setToSalary] = useState<number>(0);
  const [salaryRange, setSalaryRange] = useState<number[] | number>([]);


  const handleCheckBoxChange = (param: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (param === "typeOfEmployment" && value) {
      let type = params.get('typeOfEmployment')
      if (!type) {
        params.append('typeOfEmployment', value)
        setTypeOfEmployment([value])
      } else {
        let temp = type.split(",");
        if (temp.length > 0) {
          if (temp.includes(value)) {
            temp = temp.filter(item => item !== value)
          } else {
            temp.push(value)
          }
          if (temp.length > 0) {
            params.set("typeOfEmployment", temp.join(","))
            setTypeOfEmployment(temp)
          } else {
            params.delete("typeOfEmployment")
            setTypeOfEmployment([])
          }
        }
      }
    }
    if (param === "category" && value) {
      let cat = params.get('category')
      if (!cat) {
        params.append('category', value)
        setCategories([value])
      } else {
        let temp = cat.split(",");
        if (temp.length > 0) {
          if (temp.includes(value)) {
            temp = temp.filter(item => item !== value)
          } else {
            temp.push(value)
          }
          if (temp.length > 0) {
            params.set("category", temp.join(","))
            setCategories(temp)
          } else {
            params.delete("category")
            setCategories([])
          }
        }
      }
    }
    if (param === "fromSalary" && value) {
      let fromSalary = params.get('fromSalary')
      if (!fromSalary) {
        params.append('fromSalary', value)
        setFromSalary(Number(value))
      } else {
        params.set('fromSalary', value)
        setFromSalary(Number(value))
      }
    }
    if (param === "toSalary" && value) {
      let toSalary = params.get('toSalary')
      if (!toSalary) {
        params.append('toSalary', value)
        setFromSalary(Number(value))
      } else {
        params.set('toSalary', value)
        setToSalary(Number(value))

      }
    }
    if (param === "page" && value) {
      let page = params.get('page')
      if (!page) {
        params.append('page', value)
        setPage(Number(value))
      } else {
        params.set('page', value)
        setPage(Number(value))

      }
    }
    setSearchParams(params)
  }

  useEffect(() => {
    dispatch(getCategory())
    const typeParam = searchParams.get("typeOfEmployment");
    const catParam = searchParams.get("category");
    const fromSalary = searchParams.get('fromSalary')
    const toSalary = searchParams.get('toSalary')
    const page = searchParams.get('page')

    setTypeOfEmployment(typeParam ? typeParam.split(",") : []);
    setCategories(catParam ? catParam.split(",") : []);
    setFromSalary(Number(fromSalary))
    setToSalary(Number(toSalary))
    setSalaryRange([Number(fromSalary), Number(toSalary)])
    setPage(Number(page))
  }, [])

  const handleRangeChange = (value: number | number[]) => {
    setSalaryRange(value)
    setFromSalary(value[0])
    setToSalary(value[1])
    handleCheckBoxChange('fromSalary', value[0])
    handleCheckBoxChange('toSalary', value[1])
  }

  const handleChildData = ({ currentPage }) => {
    setPage(currentPage)
    handleCheckBoxChange('page', currentPage)
  }

  useEffect(() => {
    dispatch(getAllJobs(searchParams))
  }, [searchParams])

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
              <input checked={typeOfEmployment.includes('Full-Time')} type="checkbox" value="Full-Time" name="type" className="w-4 hover:cursor-pointer" onChange={() => handleCheckBoxChange('typeOfEmployment', 'Full-Time')} />
              <label htmlFor="">Full-time <span>(<span>{jobsCount.fullTime}</span>)</span> </label>
            </div>
            <div className={`flex gap-3 mt-3 ${showType ? "" : "hidden"}`}>
              <input checked={typeOfEmployment.includes('Part-Time')} type="checkbox" value="Part-Time" name="type" className="w-4 hover:cursor-pointer" onChange={() => handleCheckBoxChange('typeOfEmployment', 'Part-Time')} />
              <label htmlFor="">Part-time <span>(<span>{jobsCount.partTime}</span>)</span> </label>
            </div>
            <div className={`flex gap-3 mt-3 ${showType ? "" : "hidden"}`}>
              <input checked={typeOfEmployment.includes('Remote')} type="checkbox" value="Remote" name="type" className="w-4 hover:cursor-pointer" onChange={() => handleCheckBoxChange('typeOfEmployment', 'Remote')} />
              <label htmlFor="">Remote <span>(<span>{jobsCount.remote}</span>)</span> </label>
            </div>
            <div className={`flex gap-3 mt-3 ${showType ? "" : "hidden"}`}>
              <input checked={typeOfEmployment.includes('Internship')} type="checkbox" value="Internship" name="type" className="w-4 hover:cursor-pointer" onChange={() => handleCheckBoxChange('typeOfEmployment', 'Internship')} />
              <label htmlFor="">Internship <span>(<span>{jobsCount.internship}</span>)</span> </label>
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
            {
              category && category.map((cat, idx) => (
                <div key={idx}>
                  <div className={`flex gap-3 mt-3 ${showCat ? "" : "hidden"}`}>
                    <input checked={categories && categories.includes(cat)} type="checkbox" value={cat} name="category" className="w-4 hover:cursor-pointer" onChange={() => handleCheckBoxChange('category', cat)} />
                    <label htmlFor="">{cat}<span>(<span>{jobsCount[cat]}</span>)</span> </label>
                  </div>
                </div>
              ))
            }
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
              <Slider value={salaryRange} range min={100000} max={1000000} onChange={(e) => handleRangeChange(e)} step={50000} included={true} />
              <div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="font-semibold text-lightgreen">
                {fromSalary}
                <h1>LPA</h1>
              </div>
              <div className="font-semibold text-lightgreen">
                {toSalary}
                <h1>LPA</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <FindJobSection getDataFromChild={handleChildData} page={page} />
      </div>
    </div>
  )
}

export default FindJobSideBar
