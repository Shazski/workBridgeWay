import { useState, ChangeEvent, FormEvent } from "react"
import { FaRegEdit } from "react-icons/fa";
import Modal from "../Modal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { addSkill, removeSkill, uploadResume } from "../../redux/actions/user/userActions";
import { toast } from "react-hot-toast";
import { TODO } from "../../config/constants";
const ProfileSkills = ({ user, isAboutModalOpen, isSocialModalOpen, isSocialConfirmModalOpen }: { user: { skills: string[], email: string, resume: string }, isAboutModalOpen: boolean, isSocialModalOpen: boolean, isSocialConfirmModalOpen: boolean }) => {
  const dispatch = useDispatch<AppDispatch>()
  const [skills, setSkills] = useState<string>("")
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false)
  const [removeIndex, setRemoveIndex] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)
  const [isSkillModalOpen, setIsSkillModalOpen] = useState<boolean>(false)
  const [pdfData, setPdfData] = useState<TODO>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSkills(e.currentTarget.value)
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (skills === " ") {
      return setError("Please enter a skill.")
    } else if (user.skills.includes(skills)) {
      return setError(`${skills} is already in your profile.`)
    }
    const formDatas = {
      skill: skills,
      email: user?.email
    }
    await dispatch(addSkill(formDatas))
    toast.success("Skill added successfully")
  }

  const handleRemove = async () => {
    const userObj = {
      email: user?.email,
      skill: user?.skills[removeIndex]
    }
    const res = await dispatch(removeSkill(userObj))
    if (res.payload) {
      toast.success("Skill removed successfully")
    }
  }

  const handleConfirm = (index: number) => {
    setRemoveIndex(index);
    setIsConfirmModalOpen(true);
  }

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files)
      setPdfData(e?.target?.files[0])
    if (e.target.files)
      console.log(e?.target?.files[0], "pdfData")
  }

  const handleFileUploads = async () => {
    try {
      const formData = new FormData()
      formData.append("pdfFile", pdfData)
      dispatch(uploadResume(formData))
    } catch (error) {
      console.error('Error uploading PDF file:', error);
    }
  };

  return (
    <div className="flex gap-x-4">
      <div className="border w-full lg:w-7/12 shadow-md ms-5 mt-4">
        <div className="flex justify-between">
          <h1 className="font-semibold text-gray-600 mt-3 ms-2">Skills</h1>
          <FaRegEdit className='cursor-pointer text-lightgreen my-1 mx-2' onClick={() => setIsSkillModalOpen(true)} />
        </div>

        {(user?.skills.length > 0) ? (
          <div className="flex flex-wrap mt-4">
            {user?.skills.map((value, index) => (
              <div key={index} className={`bg-gray-100 ${isAboutModalOpen || isSocialModalOpen || isSocialConfirmModalOpen ? "" : "relative"}  rounded-md text-lightgreen px-4 py-1 m-2 font-semibold`}>
                {value}
                <h1 onClick={() => handleConfirm(index)} className="text-xs cursor-pointer absolute top-0 left-1 text-red-600 font-semibold">x</h1>
              </div>
            ))}
          </div>
        ) : (
          <h1 className="mt-4 text-sm text-blue-gray-400 ms-2">Provide Some Skills</h1>
        )}


        <Modal isVisible={isSkillModalOpen} onClose={() => setIsSkillModalOpen(false)}>
          <form action="" onSubmit={handleSubmit}>
            <h1 className="font-semibold text-blue-gray-700">Add Skill</h1>
            {error && <h1 className="text-red-600 text-sm font-semibold">{error}</h1>}
            <input name="skills" className="border rounded-md py-2 w-full outline-none" value={skills} onChange={handleChange} required />
            <div className="flex justify-end">
              <button className="bg-lightgreen rounded-md font-semibold text-white py-2 px-5 mt-2">Add</button>
            </div>
          </form>
        </Modal>

        <Modal isVisible={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)}>
          <h1 className="uppercase font-semibold text-center">Do you want to delete {user?.skills[removeIndex]}</h1>
          <div className="flex gap-x-2 justify-center ">
            <button onClick={handleRemove} className="bg-red-600 text-white font-semibold px-3 mt-2 py-2 rounded-md">Yes</button>
            <button onClick={() => setIsConfirmModalOpen(false)} className="bg-blue-600 text-white font-semibold px-4 mt-2 py-2 rounded-md">No</button>
          </div>
        </Modal>

      </div>
      <div className="mb-4 mt-2 bg-white shadow-md">
        <form action="" onSubmit={handleFileUploads} className="px-4 py-2 flex">
          <input required accept="application/pdf" type="file" onChange={handleFileUpload} />
          <button className="border px-4 py-2 bg-lightgreen rounded-md font-semibold text-white">Add</button>
        </form>
        {
          user?.resume &&
          <div className="bg-white">
            <iframe src={user?.resume} className="px-4 py-2"/>
          </div>
        }
      </div>
    </div>
  );
}

export default ProfileSkills
