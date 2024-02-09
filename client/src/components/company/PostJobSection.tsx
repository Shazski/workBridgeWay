import { FormEvent, useEffect, useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import Modal from "../user/Modal";
const PostJobSection = () => {
    const [isSkillModalOpen, setIsSkillModalOpen] = useState<boolean>(false);
    const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
    const [error, setError] = useState<string>("");
    const [skill, setSkill] = useState<string>("");

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError("")
            }, 5000)
        }
    }, [error])

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
                <form action="">
                    <div className="border-b-2 grid grid-cols-2 h-full items-center">
                        <div className="mb-4">
                            <h1 className="font-semibold mt-3 text-sm text-blue-gray-800">Job Title</h1>
                            <h1 className="text-xs mb-5 text-gray-600">Job titles must be describe one position</h1>
                        </div>
                        <div>
                            <input type="text" className="border rounded-md py-1  ps-3 placeholder:text-sm" placeholder="e.g Software Engineer" />
                            <h1 className="text-xs  text-gray-600 mt-1 ms-1">At least 30 characters</h1>
                        </div>
                    </div>

                    <div className="border-b-2 grid grid-cols-2 flex-wrap items-start ">
                        <div>
                            <h1 className="font-semibold mt-3 text-sm text-blue-gray-800">Type of Employment</h1>
                            <h1 className="text-xs mb-5 text-gray-600">You can select multiple type of employment</h1>
                        </div>
                        <div className="ms-14">
                            <div className="pt-2">
                                <input type="checkbox" className="border rounded-md ps-3" placeholder="e.g Software Engineer" />
                                <label className="text-sm text-gray-800 ms-1 " htmlFor="">Full-Time</label>
                            </div>
                            <div className="pt-2">

                                <input type="checkbox" className="border rounded-md ps-3" placeholder="e.g Software Engineer" />
                                <label className="text-sm text-gray-800 ms-1 " htmlFor="">Part-Time</label>
                            </div>
                            <div className="pt-2">

                                <input type="checkbox" className="border rounded-md ps-3" placeholder="e.g Software Engineer" />
                                <label className="text-sm text-gray-800 ms-1 " htmlFor="">Remote</label>
                            </div>
                            <div className="pt-2 mb-5">
                                <input type="checkbox" className="border rounded-md ps-3" placeholder="e.g Software Engineer" />
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
                            <input type="number" className="border border-gray-600 rounded-md py-1 w-20 ps-3 placeholder:text-xs outline-none" placeholder="e.g:500000" />
                            <h1>to</h1>
                            <input type="number" className="border border-gray-600 rounded-md py-1 w-20  ps-3 placeholder:text-xs outline-none" placeholder="e.g:1500000" />
                        </div>
                    </div>
                    <div className="border-b-2 grid grid-cols-2 h-full items-center">
                        <div className="mb-4">
                            <h1 className="font-semibold mt-3 text-sm text-blue-gray-800">Categories</h1>
                            <h1 className="text-xs mb-5 text-gray-600">You can select multiple job categories</h1>
                        </div>
                        <div>
                            <h1 className="text-sm font-semibold text-gray-700">Select Job Categories</h1>
                            <select className="border text-gray-500 border-gray-500 py-1 px-4 outline-none rounded-md" >
                                <option defaultChecked hidden>Select Job Categories</option>
                                <option value="">asdssadd</option>
                                <option className="text-gray-900" value="">asd</option>
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
                                    requiredSkills.map((skill) => (
                                        <>
                                            <div className="flex gap-x-1.5 border border-gray-300 px-6 py-1 mt-2 rounded-md relative">
                                                <h1 className="text-lightgreen ">{skill}</h1>
                                                <h1 onClick={() => handleDelete(skill)} className="text-lightgreen cursor-pointer text-sm font-semibold absolute right-1 top-0">X</h1>
                                            </div>
                                        </>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <Modal isVisible={isSkillModalOpen} onClose={() => setIsSkillModalOpen(false)}>
                <form action="" onSubmit={handleSubmit}>
                    <h1 className="font-semibold text-blue-gray-700">Add Skill</h1>
                    {error && <h1 className="text-red-600 font-semibold animate-pulse">{error}</h1>}
                    <input name="skills" className="border rounded-md py-2 w-full outline-none" value={skill} onChange={(e) => setSkill(e.target.value)} required />
                    <div className="flex justify-end">
                        <button className="bg-lightgreen rounded-md font-semibold text-white py-2 px-5 mt-2">Add</button>
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default PostJobSection