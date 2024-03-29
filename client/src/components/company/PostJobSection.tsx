import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { BiLeftArrowAlt } from "react-icons/bi";
import Modal from "../Modal";
import { GoDotFill } from "react-icons/go";
import useForm from "../../hooks/useForm";
import { AppDispatch, RootState } from "../../redux/store";
import { getCategory, postJob } from "../../redux/actions/company/CompanyActions";
import { useNavigate } from "react-router-dom";
const PostJobSection = () => {

  const [isSkillModalOpen, setIsSkillModalOpen] = useState<boolean>(false);
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [salaryError, setSalaryError] = useState<string>("");
  const [skill, setSkill] = useState<string>("");
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [responsibility, setResponsibility] = useState<string>("")
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [responsibilityError, setResponsibilityError] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [categoryData, setCategoryData] = useState<string>("");

  const { values, handleChange } = useForm({})

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { category } = useSelector((state: RootState) => state.company)

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("")
      }, 5000)
    }
    if (salaryError) {
      setTimeout(() => {
        setSalaryError("")
      }, 5000)
    }
    if (responsibilityError) {
      setTimeout(() => {
        setResponsibilityError("")
      }, 3000)
    }

  }, [error, responsibilityError])


  useEffect(() => {
    dispatch(getCategory())
  }, [dispatch])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (requiredSkills.includes(skill.toLowerCase())) {
      return setError("skills has already Entered")
    }
    setRequiredSkills([...requiredSkills, skill])
    setSkill("")
    setError("")
  }

  const handleDelete = (skill: string) => {
    const filterData = requiredSkills.filter((value) => value !== skill)
    setRequiredSkills([...filterData])
  }

  const handleResponsibility = () => {
    if (responsibilities.includes(responsibility)) {
      return setResponsibilityError("Already entered the responsibility")
    }
    if (responsibility === "") {
      return setResponsibilityError("please enter an responsibility")
    }
    setResponsibilities([
      ...responsibilities,
      responsibility
    ])
    setResponsibility('')
    setResponsibilityError("")
    scrollToBottom()
  }

  const handleJobSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!(requiredSkills.length > 0) || !(responsibilities.length > 0)) {
      return console.log("provide details ")
    }
    if (values?.fromSalary === undefined || values?.toSalary === undefined) {
      return console.log("provide details ");
    }
    if (Number(values.fromSalary) >= Number(values.toSalary)) {
      return setSalaryError("Salary range is invalid");
    }
    const jobData = {
      ...values,
      category: categoryData,
      requiredSkills,
      responsibilities
    }
    console.log(jobData, "job details data")
    await dispatch(postJob(jobData))
    navigate('/company/job-list')
  }

  const handleDeleteResponsibility = (responsibility: string) => {
    const filterData = responsibilities.filter((value) => value !== responsibility)
    setResponsibilities([...filterData])
  }

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;
  
    if (value === "other") {
      setIsModalOpen(true);
    } else {
      setCategoryData(value);
    }
  };

  return (
    <>
      <div className="flex mt-4 border-b-2">
        <BiLeftArrowAlt className="text-3xl ms-4" />
        <h1 className="text-xl font-serif font-semibold ms-1 mb-3" >Post a Job</h1>
      </div>
      <div className="ms-5">

        <div className="border-b-2">
          <h1 className="font-semibold mt-3 text-sm text-blue-gray-800">Basic information</h1>
          <h1 className="text-xs mb-3 text-gray-600">This information will be displayed publicaly</h1>
        </div>
        <form action="" onSubmit={handleJobSubmit}>
          <div className="border-b-2 grid grid-cols-2 h-full items-center">
            <div className="mb-4">
              <h1 className="font-semibold mt-3 text-sm text-blue-gray-800">Job Title</h1>
              <h1 className="text-xs mb-5 text-gray-600">Job titles must be describe one position</h1>
            </div>
            <div>
              <input onChange={handleChange} type="text" name="jobTitle" className="border rounded-md py-1  ps-3 placeholder:text-sm outline-none" placeholder="e.g Software Engineer" required />
              <h1 className="text-xs  text-gray-600 mt-1 ms-1">At least 30 characters</h1>
            </div>
          </div>
          <div className="border-b-2 grid grid-cols-2 h-full items-center">
            <div className="mb-4">
              <h1 className="font-semibold mt-3 text-sm text-blue-gray-800">Vacancy</h1>
              <h1 className="text-xs mb-5 text-gray-600">open for how many job hunters</h1>
            </div>
            <div>
              <input onChange={handleChange} type="number" name="vacancy" className="border rounded-md py-1  ps-3 placeholder:text-sm outline-none" placeholder="e.g 20" required />
              <h1 className="text-xs  text-gray-600 mt-1 ms-1">slot openings</h1>
            </div>
          </div>
          <div className="border-b-2 grid grid-cols-2 h-full items-center">
            <div className="mb-4">
              <h1 className="font-semibold mt-3 text-sm text-blue-gray-800">Expiry Date </h1>
              <h1 className="text-xs mb-5 text-gray-600">open for how many days</h1>
            </div>
            <div>
              <input onChange={handleChange} type="date" min={getCurrentDate()} name="expiry" className="border rounded-md py-1  ps-3 placeholder:text-sm outline-none" placeholder="e.g 20" required />
              <h1 className="text-xs  text-gray-600 mt-1 ms-1">Job expiry date</h1>
            </div>
          </div>

          <div className="border-b-2 grid grid-cols-2 flex-wrap items-start ">
            <div>
              <h1 className="font-semibold mt-3 text-sm text-blue-gray-800">Type of Employment</h1>
              <h1 className="text-xs mb-5 text-gray-600">You can select multiple type of employment</h1>
            </div>
            <div className="ms-14">
              <div className="pt-2">
                <input type="checkbox" name="typeOfEmployment" value="Full-Time" checked={values!.typeOfEmployment === "Full-Time"} className="border rounded-md ps-3" onChange={handleChange} />
                <label className="text-sm text-gray-800 ms-1 " htmlFor="">Full-Time</label>
              </div>
              <div className="pt-2">

                <input type="checkbox" name="typeOfEmployment" value="Part-Time" checked={values!.typeOfEmployment === "Part-Time"} className="border rounded-md ps-3" onChange={handleChange} />
                <label className="text-sm text-gray-800 ms-1 " htmlFor="">Part-Time</label>
              </div>
              <div className="pt-2">

                <input type="checkbox" name="typeOfEmployment" value="Remote" checked={values!.typeOfEmployment === "Remote"} className="border rounded-md ps-3" onChange={handleChange} />
                <label className="text-sm text-gray-800 ms-1 " htmlFor="">Remote</label>
              </div>
              <div className="pt-2 mb-5">
                <input type="checkbox" name="typeOfEmployment" value="Internship" checked={values!.typeOfEmployment === "Internship"} className="border rounded-md ps-3" onChange={handleChange} />
                <label className="text-sm text-gray-800 ms-1 " htmlFor="">Internship</label>
              </div>
            </div>
          </div>
          <div className="border-b-2 grid grid-cols-2 h-full items-center">
            <div className="mb-4">
              <h1 className="font-semibold mt-3 text-sm text-blue-gray-800">Salary</h1>
              <h1 className="text-xs mb-5 text-gray-600">Please specify the estimated salary range for the role. *You can leave this blank</h1>
            </div>
            <div className="flex gap-x-6 ms-4 md:ms-0">
              <input min={0} type="number" name="fromSalary" className="border border-gray-600 rounded-md py-1 w-20 ps-3 placeholder:text-xs outline-none" placeholder="e.g:5" onChange={handleChange} required />
              <h1 className="mt-1">LPA</h1>
              <h1>to</h1>
              <input min={0} type="number" name="toSalary" className="border border-gray-600 rounded-md py-1 w-20  ps-3 placeholder:text-xs outline-none" placeholder="e.g:10" onChange={handleChange} required />
              <h1 className="mt-1">LPA</h1>
              {salaryError && <>
                <h1 className="text-red-600 font-semibold">{salaryError}</h1>
              </>}
            </div>
          </div>
          <div className="border-b-2 grid grid-cols-2 h-full items-center">
            <div className="mb-4">
              <h1 className="font-semibold mt-3 text-sm text-blue-gray-800">Categories</h1>
              <h1 className="text-xs mb-5 text-gray-600">You can select multiple job categories</h1>
            </div>
            <div>
              {category && category?.length > 0 ?
                <>
                  <h1 className="text-sm font-semibold text-gray-700">Select Job Categories</h1>
                  <select name="category" required className="border text-gray-500 border-gray-500 py-1 px-4 outline-none rounded-md" onChange={(e) => handleCategoryChange(e)}>
                    <option defaultChecked hidden>Select Job Categories</option>
                    {

                      category?.map((category, idx) => (
                        <>
                          <option key={idx} value={category}>{category}</option>
                        </>
                      ))
                    }

                    <option onClick={() => setIsModalOpen(true)} value="other">{categoryData && !category.includes(categoryData) ? categoryData : "other..."}</option>
                  </select>
                </>
                : <>
                  <h1 className="font-semibold">Add category to display category</h1>
                </>

              }
            </div>
          </div>
          <div className="border-b-2 grid grid-cols-2 h-full items-center">
            <div className="mb-4">
              <h1 className="font-semibold mt-3 text-sm text-blue-gray-800">Required Skills</h1>
              <h1 className="text-xs mb-5 text-gray-600">Add required skills for the job</h1>
            </div>
            <div>
              <button type="button" onClick={() => { setIsSkillModalOpen(true) }} className="border border-gray-400 text-lightgreen px-2 py-2 text-xs font-semibold rounded-md">+ Add Skills</button>
              <div className="flex gap-x-4 flex-wrap">
                {
                  requiredSkills.map((skill, idx) => (
                    <>
                      <div key={idx} className="flex gap-x-1.5 border border-gray-300 px-6 py-1 mt-2 rounded-md relative">
                        <h1 className="text-lightgreen ">{skill}</h1>
                        <h1 onClick={() => handleDelete(skill)} className="text-lightgreen cursor-pointer text-sm font-semibold absolute right-1 top-0">X</h1>
                      </div>
                    </>
                  ))
                }
              </div>
            </div>
          </div>
          <div className="border-b-2 grid grid-cols-2 flex-wrap items-start ">
            <div>
              <h1 className="font-semibold mt-3 text-sm text-blue-gray-800">Job Descriptions</h1>
              <h1 className="text-xs mb-5 text-gray-600">Job titles must be describe one position</h1>
            </div>
            <div className="">
              <textarea onChange={handleChange} name="jobDescription" className="border border-gray-300 mt-2" cols={30} rows={5} id=""></textarea>
              <h1 className="text-xs mb-5 text-gray-600">Maximum 500 characters</h1>
            </div>
          </div>
          <div ref={bottomRef} className="border-b-2 grid grid-cols-2 flex-wrap h-full items-start ">
            <div>
              <h1 className="font-semibold mt-3 text-sm text-blue-gray-800">Responsibilities</h1>
              <h1 className="text-xs mb-5 text-gray-600">Outline the core responsibilities of the position</h1>
            </div>
            <div className="mt-2">
              {responsibilityError && <h1 className="text-red-600 font-semibold">{responsibilityError}</h1>}
              <input type="text" className="border border-gray-500 rounded-md py-1 px-5 outline-none" value={responsibility} onChange={(e) => setResponsibility(e.target.value)} />
              <button type="button" onClick={handleResponsibility} className="ms-4 border border-gray-400 px-2 py-1 rounded-md text-lightgreen font-medium">Add</button>
              <div className="flex flex-wrap flex-col mt-2">
                {
                  responsibilities.map((value, idx) => (
                    <div className="flex gap-x-1 h-full items-center">
                      <h1><GoDotFill /></h1>
                      <h1 className="font-semibold text-gray-600 font-sans" key={idx}>{value}</h1>
                      <h1 onClick={() => handleDeleteResponsibility(value)} className="text-xs bg-red-600 px-0.5 text-white hover:cursor-pointer font-bold">X</h1>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <h1></h1>
            <button className="border px-3 w-20 py-2 mb-5 mt-3 rounded-md bg-lightgreen text-white">Submit</button>
          </div>
        </form>
      </div>
      <Modal isVisible={isSkillModalOpen} onClose={() => setIsSkillModalOpen(false)}>
        <form action="" onSubmit={handleSubmit}>
          <h1 className="font-semibold text-blue-gray-700">Add Skill</h1>
          {error && <h1 className="text-red-600 font-semibold animate-pulse">{error}</h1>}
          <input required name="skills" className="border rounded-md py-2 w-full outline-none" value={skill} onChange={(e) => setSkill(e.target.value)} />
          <div className="flex justify-end">
            <button className="bg-lightgreen rounded-md font-semibold text-white py-2 px-5 mt-2">Add</button>
          </div>
        </form>
      </Modal>
      <Modal isVisible={isModalOpen} onClose={() => { setIsModalOpen(false), category && setCategoryData(category[0]), console.log("data triggred") }}>
        <h1 className="font-semibold text-blue-gray-700">Add Category</h1>
        {error && <h1 className="text-red-600 font-semibold animate-pulse">{error}</h1>}
        <input name="category" className="border rounded-md py-2 w-full outline-none" value={categoryData} onChange={(e) => { setCategoryData(e.target.value) }} />
        <div className="flex justify-end">
          <button onClick={() => { setCategoryData(categoryData), setIsModalOpen(false) }} className="bg-lightgreen rounded-md font-semibold text-white py-2 px-5 mt-2">Add</button>
        </div>
      </Modal>
    </>
  )
}

export default PostJobSection