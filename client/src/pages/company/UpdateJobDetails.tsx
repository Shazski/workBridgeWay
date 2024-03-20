import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { GoDotFill } from "react-icons/go";
import { editJobDetails, getCategory, getJobById } from '../../redux/actions/company/CompanyActions';
import Modal from '../../components/Modal';
import { format, parseISO } from 'date-fns';
import { popResponsibilities, popSkills, pushResponsibilities, pushSkill } from '../../redux/reducers/company/companySlice';
import toast from 'react-hot-toast';
import { TODO } from '../../config/constants';

const UpdateJobDetails = () => {


    const [isSkillModalOpen, setIsSkillModalOpen] = useState<boolean>(false);

    const [error, setError] = useState<string>("");
    const [responsibilityError, setResponsibilityError] = useState<string>("");
    const [salaryError, setSalaryError] = useState<string>("");

    const { id } = useParams()

    const [formData, setFormData] = useState<TODO>("");

    const [skill, setSkill] = useState<string>("");
    const [responsibility, setResponsibility] = useState<string>("")
    // const [categoryData, setCategoryData] = useState<string>("");

    const bottomRef = useRef<HTMLDivElement | null>(null);

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const { category, editJob } = useSelector((state: RootState) => state.company)

    const scrollToBottom = () => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        dispatch(getJobById(id!))
        dispatch(getCategory())
    }, [dispatch])

    useEffect(() => {
        setFormData({
            ...editJob
        })
    }, [editJob])

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError("")
            }, 5000)
        }
    }, [error])

    useEffect(() => {
        if (responsibilityError) {
            setTimeout(() => {
                setResponsibilityError("")
            }, 3000)
        }
    }, [responsibilityError])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (formData?.requiredSkills?.includes(skill.toLowerCase())) {
            setError("skills has already Entered")
            return
        }
        dispatch(pushSkill(skill))
        setSkill("")
        setError("")

    }

    const handleDelete = (skill: string) => {
        dispatch(popSkills(skill))
    }

    const handleResponsibility = () => {
        if (formData?.responsibilities?.includes(responsibility)) {
            return setResponsibilityError("Already entered the responsibility")
        }
        dispatch(pushResponsibilities(responsibility))
        setResponsibility('')
        setResponsibilityError("")
        scrollToBottom()
    }

    const handleEditJobSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (Number(formData?.fromSalary) >= Number(formData?.toSalary)) {
            return setSalaryError("Salary range is invalid");
        }
        delete formData?.createdAt
        delete formData?.updatedAt
        delete formData?.applicants
        delete formData?.status
        delete formData?.__v

        toast.promise(
            dispatch(editJobDetails(formData)),
            {
                loading: 'Saving...',
                success: <b>Job Updated !</b>,
                error: <b>Job Update failed</b>,
            }
        );
        navigate('/company/job-list')
    }
    function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.currentTarget
        setFormData({
            ...formData,
            [name]: value
        })
    }
    useEffect(() => {
        if (salaryError) {
            setTimeout(() => {
                setSalaryError("")
            }, 5000)
        }
    }, [salaryError])

    return (
        <div><div className="flex mt-4 border-b-2">
            <h1 className="text-xl font-serif font-semibold ms-1 mb-3" >Edit Job</h1>
        </div>
            <div className="ms-5">

                <div className="border-b-2">
                    <h1 className="font-semibold mt-3 text-sm text-blue-gray-800">Basic information</h1>
                    <h1 className="text-xs mb-3 text-gray-600">This information will be displayed publicaly</h1>
                </div>
                <form action="" onSubmit={handleEditJobSubmit}>
                    <div className="border-b-2 grid grid-cols-2 h-full items-center">
                        <div className="mb-4">
                            <h1 className="font-semibold mt-3 text-sm text-blue-gray-800">Job Title</h1>
                            <h1 className="text-xs mb-5 text-gray-600">Job titles must be describe one position</h1>
                        </div>
                        <div>
                            <input onChange={handleChange} value={formData?.jobTitle} type="text" name="jobTitle" className="border rounded-md py-1  ps-3 placeholder:text-sm outline-none" placeholder="e.g Software Engineer" required />
                            <h1 className="text-xs  text-gray-600 mt-1 ms-1">At least 30 characters</h1>
                        </div>
                    </div>
                    <div className="border-b-2 grid grid-cols-2 h-full items-center">
                        <div className="mb-4">
                            <h1 className="font-semibold mt-3 text-sm text-blue-gray-800">Vacancy</h1>
                            <h1 className="text-xs mb-5 text-gray-600">open for how many job hunters</h1>
                        </div>
                        <div>
                            <input onChange={handleChange} type="number" name="vacancy" value={formData?.vacancy} className="border rounded-md py-1  ps-3 placeholder:text-sm outline-none" placeholder="e.g 20" required />
                            <h1 className="text-xs  text-gray-600 mt-1 ms-1">slot openings</h1>
                        </div>
                    </div>
                    <div className="border-b-2 grid grid-cols-2 h-full items-center">
                        <div className="mb-4">
                            <h1 className="font-semibold mt-3 text-sm text-blue-gray-800">Expiry Date </h1>
                            <h1 className="text-xs mb-5 text-gray-600">open for how many days</h1>
                        </div>
                        <div>
                            <input onChange={handleChange} type="date" value={formData.expiry && format(parseISO(formData?.expiry), 'yyyy-MM-dd')} min={getCurrentDate()} name="expiry" className="border rounded-md py-1  ps-3 placeholder:text-sm outline-none" placeholder="e.g 20" required />
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
                                <input type="checkbox" name="typeOfEmployment" value="Full-Time" checked={formData?.typeOfEmployment === 'Full-Time' ? true : false} className="border rounded-md ps-3" onChange={handleChange} />
                                <label className="text-sm text-gray-800 ms-1 " htmlFor="">Full-Time</label>
                            </div>
                            <div className="pt-2">

                                <input type="checkbox" name="typeOfEmployment" value="Part-Time" checked={formData?.typeOfEmployment === 'Part-Time' ? true : false} className="border rounded-md ps-3" onChange={handleChange} />
                                <label className="text-sm text-gray-800 ms-1 " htmlFor="">Part-Time</label>
                            </div>
                            <div className="pt-2">

                                <input type="checkbox" name="typeOfEmployment" value="Remote" checked={formData?.typeOfEmployment === 'Remote' ? true : false} className="border rounded-md ps-3" onChange={handleChange} />
                                <label className="text-sm text-gray-800 ms-1 " htmlFor="">Remote</label>
                            </div>
                            <div className="pt-2 mb-5">
                                <input type="checkbox" name="typeOfEmployment" value="Internship" checked={formData?.typeOfEmployment === 'Internship' ? true : false} className="border rounded-md ps-3" onChange={handleChange} />
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
                            <input type="number" name="fromSalary" className="border border-gray-600 rounded-md py-1 w-20 ps-3 placeholder:text-xs outline-none" placeholder="e.g:500000" value={formData?.fromSalary} onChange={handleChange} required />
                            <h1>to</h1>
                            <input type="number" name="toSalary" className="border border-gray-600 rounded-md py-1 w-20  ps-3 placeholder:text-xs outline-none" placeholder="e.g:1500000" onChange={handleChange} value={formData?.toSalary} required />
                            {salaryError && <h1 className='text-red-600 font-semibold'>{salaryError}</h1>}
                        </div>
                    </div>
                    <div className="border-b-2 grid grid-cols-2 h-full items-center">
                        <div className="mb-4">
                            <h1 className="font-semibold mt-3 text-sm text-blue-gray-800">Categories</h1>
                            <h1 className="text-xs mb-5 text-gray-600">You can select multiple job categories</h1>
                        </div>
                        <div>
                            <h1 className="text-sm font-semibold text-gray-700">Select Job Categories</h1>
                            <select name="category"  required className="border text-gray-500 border-gray-500 py-1 px-4 outline-none rounded-md" onChange={handleChange}>
                                {
                                    category?.map((category, idx) => (
                                        <>
                                            <option selected={category.includes(formData.category) ? true : false} key={idx} value={category}>{category}</option>
                                        </>
                                    )) 
                                }
                            </select>
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
                                    formData.requiredSkills && formData?.requiredSkills.map((skill, idx) => (
                                        <>
                                            <div key={idx} className="flex gap-x-1.5 border border-gray-300 px-6 py-1 mt-2 rounded-md relative">
                                                <h1 className="text-lightgreen ">{skill.toLowerCase()}</h1>
                                                <h1 onClick={() => handleDelete(skill)} className="text-white rounded-full px-1  bg-red-600 cursor-pointer text-xs mt-0.5 font-semibold absolute right-1 top-0">x</h1>
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
                            <textarea value={formData?.jobDescription} onChange={handleChange} name="jobDescription" className="border border-gray-300 mt-2" cols={30} rows={5} id=""></textarea>
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
                                    formData?.responsibilities && formData?.responsibilities.map((value, idx) => (
                                        <div className="flex gap-x-1 h-full items-center">
                                            <h1 className='text-xs'><GoDotFill /></h1>
                                            <h1 className=" text-gray-800 font-sans" key={idx}>{value.toLowerCase()}</h1>
                                            <h1 onClick={() => dispatch(popResponsibilities(value))} className="text-xs bg-red-600 px-1 rounded-full text-white hover:cursor-pointer font-bold">x</h1>
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
            </div >
            <Modal isVisible={isSkillModalOpen} onClose={() => setIsSkillModalOpen(false)}>
                <form action="" onSubmit={handleSubmit}>
                    <h1 className="font-semibold text-blue-gray-700">Add Skill</h1>
                    {error && <h1 className="text-red-600 font-semibold animate-pulse">{error}</h1>}
                    <input name="skills" className="border rounded-md py-2 w-full outline-none" value={skill} onChange={(e) => setSkill(e.target.value)} />
                    <div className="flex justify-end">
                        <button className="bg-lightgreen rounded-md font-semibold text-white py-2 px-5 mt-2">Add</button>
                    </div>
                </form>
            </Modal>
            </div >
    )
}

export default UpdateJobDetails