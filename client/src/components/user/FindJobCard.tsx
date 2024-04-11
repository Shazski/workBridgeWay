import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import JobCategogyBtn from './JobCategogyBtn'
import { NavLink, useNavigate } from 'react-router-dom'
import Modal from '../Modal';
import { IUserLoginData } from '../../interface/IuserLogin';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { FaPaperclip } from "react-icons/fa6";
import toast from 'react-hot-toast';
import { applyForJob } from '../../redux/actions/user/userActions';
import { TODO } from '../../config/constants';
const FindJobCard = ({ showCatTag = true, showApplied = true, jobs }: { showCatTag?: boolean, showApplied?: boolean, jobs?: TODO }) => {

	const { user } = useSelector((state: RootState) => state.user)
	const navigate = useNavigate()
	const resumeRef = useRef<TODO>(null)

	const [_, setIsLoading] = useState<boolean>(false);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [showResumeUpload, setShowResumeUpload] = useState<boolean>(false);
	const [pdfPreview, setPdfPreview] = useState<string>("");
	const [resumeFile, setResumeFile] = useState<TODO>(null);
	const [userFormData, setUserFormData] = useState<IUserLoginData>({});

	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		setUserFormData({
			...user
		})
	}, [])

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget
		setUserFormData({
			...userFormData,
			[name]: value
		})
	}

	const imageUpload = async (image: TODO) => {
		setIsLoading(true)
		const formData = new FormData();
		formData.append('file', image);
		formData.append('upload_preset', 'drtyu0yv');
		try {
			const res = await fetch('https://api.cloudinary.com/v1_1/dvjggxcc1/image/upload', {
				method: 'post',
				body: formData,
			})
			const urlData = await res.json()
			return urlData.url
		} catch (err) {
			console.error(err)
		} finally {
			setIsLoading(false)
		}
	}


	const handleResumeChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setResumeFile(e.target.files[0])
			const url = URL.createObjectURL(e.target.files[0])
			setPdfPreview(url)
		}
	}

	const handleApplicationSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsModalOpen(false)
		if (showResumeUpload && !resumeRef.current?.value) {
			return toast.error("upload resume!!!")
		}
		else if (showResumeUpload && resumeRef.current?.value) {
			toast.loading("applying...")
			const resume = await imageUpload(resumeFile)
			toast.remove()
			userFormData.resume = resume
		}
		else if (!showResumeUpload && resumeRef.current?.value) {
			toast.loading("Updating...")
			const resume = await imageUpload(resumeFile)
			toast.remove()
			userFormData.resume = resume
		}

		const applicantData = {
			jobId: jobs._id,
			applicantId: userFormData._id,
			appliedDate: new Date(),
			hiringStage: "pending",
			linkedIn: userFormData.linkedIn,
			name: userFormData.userName,
			phone: userFormData.phone,
			portfolioURL: userFormData.portfolioURL,
			previousJob: userFormData.previousJob,
			resume: userFormData.resume,
		}

		const res = await dispatch(applyForJob(applicantData))
		if (res.payload === "You have already applied to this job") {
			toast.error(res.payload)
		} else {
			toast.success("job applied successfully")
			setIsModalOpen(false)
			navigate('/user/applications?status=all')
		}
	}

	return (
		<div className="border md:flex md:h-28 w-full rounded-md md:w-full mt-8 md:justify-center">
			<div className="md:mt-4 hover:cursor-pointer" onClick={() => navigate(`/jobs/${jobs._id}`)}>
				<img src={jobs?.companyId?.companyLogo} alt="" className="w-14 rounded-full h-14" />
			</div>
			<div className={`md:mt-4 ms-2 ${showCatTag ? "" : "md:mt-7"}`}>
				<h1 className={`font-semibold`}>{jobs?.jobTitle?.toLowerCase()}</h1>
				<h3 className="text-gray-500 text-sm">HeadOffice . {jobs?.companyId?.headOffice} </h3>
				<div className="flex gap-3 md:mt-3">
					{
						showCatTag ? <>

							<JobCategogyBtn category={jobs?.category} />
						</> : <>
						</>
					}
				</div>
			</div>
			<div className="lg:ms-24 ms-2">
				<button onClick={() => setIsModalOpen(true)} disabled={jobs?.applicants?.some(applicant => applicant?.applicantId?.toString() === user?._id?.toString())} className="bg-lightgreen disabled:opacity-50 disabled:cursor-not-allowed text-white mt-3  font-semibold px-10 md:ms-5 py-2 md:mt-6 me-4 rounded-md">{jobs?.applicants?.some(applicant => applicant?.applicantId?.toString() === user?._id?.toString()) ? "Applied" : "Apply"}</button>
				{
					showApplied ? <h1 className="text-xs mt-2 md:ms-5 text-gray-500">{jobs?.applicants?.length} applied of {jobs?.vacancy} capacity</h1> : <></>
				}
			</div>
			<Modal isVisible={isModalOpen} onClose={() => setIsModalOpen(false)}>
				{
					user?.profileScore >= 50 ? <>

						<div className='text-start'>
							<div className='flex border-b-2'>
								<div>
									<img className="w-32 " src={jobs?.companyId?.companyLogo} alt="" />
								</div>
								<div className='mt-4 '>
									<h1 className={`font-semibold text-start`}>{jobs?.jobTitle?.toLowerCase()}</h1>
									<div className='flex'>
										<h3 className="text-gray-500 text-sm">HeadOffice . {jobs?.companyId?.headOffice} </h3>
										<h3 className="text-gray-500 text-sm">{jobs?.typeOfEmployment} </h3>
									</div>
								</div>
							</div>
							<div className="mt-5">
								<h1 className='font-serif font-semibold text-xl text-start text-gray-900'>Submit Your application</h1>
								<h1 className='poppins font-semibold text-xs text-start text-gray-500 mt-2'>The following is required and will only be shared with {jobs?.companyId?.name}</h1>
							</div>
							<form action="" onSubmit={handleApplicationSubmit}>
								<div className='mt-8 flex flex-col gap-y-2'>
									<label className='poppins text-gray-700' htmlFor="">Full Name</label>
									<input required name='userName' value={userFormData?.userName || ""} type="text" className='border px-2 py-2 outline-none hover:border-lightgreen rounded-md' placeholder='Enter your fullname' onChange={handleChange} />
								</div>
								<div className='mt-4 flex flex-col gap-y-2'>
									<label className='poppins text-gray-700' htmlFor="">Email address</label>
									<input required value={userFormData?.email || ""} disabled type="text" className='border cursor-not-allowed px-2 py-2 outline-none hover:border-lightgreen rounded-md' placeholder='Enter your email address' />
								</div>
								<div className='mt-4 flex flex-col gap-y-2'>
									<label className='poppins text-gray-700' htmlFor="">Phone number</label>
									<input required name='phone' value={userFormData?.phone || ""} type="number" className='border px-2 py-2 outline-none hover:border-lightgreen rounded-md' placeholder='Enter your phone number' onChange={handleChange} />
								</div>
								<div className='mt-4 flex flex-col gap-y-2'>
									<label className='poppins text-gray-700' htmlFor="">Current or previous job title <span className='text-black font-semibold'>(Optional)</span></label>
									<input type="text" name='previousJob' className='border px-2 py-2 outline-none hover:border-lightgreen rounded-md' placeholder="What's your current or previous job title?" onChange={handleChange} />
								</div>
								<div className='font-bold font-serif mt-4 text-xl'>Links</div>
								<div className='mt-4 flex flex-col gap-y-2'>
									<label className='poppins text-gray-700' htmlFor="">LinkedIn URL</label>
									<input required type="text" name='linkedIn' className='border px-2 py-2 outline-none hover:border-lightgreen rounded-md' placeholder="Link to your LinkedIn URL" onChange={handleChange} />
								</div>
								<div className='mt-4 flex flex-col gap-y-2'>
									<label className='poppins text-gray-700' htmlFor="">Portfolio URL <span className='text-black font-semibold'>(Optional)</span></label>
									<input type="text" name='portfolioUrl' className='border px-2 py-2 outline-none hover:border-lightgreen rounded-md' placeholder="Link to your portfolio URL" onChange={handleChange} />
								</div>
								<h1 className='font-semibold mt-4'>Attach your resume</h1>
								{
									user?.resume &&
									<>
										<div className='flex gap-x-3'>
											<h1 className='font-semibold mt-5'>Do you want to take it from profile </h1>
											<div className='py-2 px-4 flex mt-3 gap-x-4 border border-dashed border-lightgreen bg-blue-50'>
												<input type="radio" defaultChecked name="upload" id="" onChange={() => setShowResumeUpload(false)} /> yes
												<input type="radio" name="upload" id="" onChange={() => setShowResumeUpload(true)} /> no
											</div>
										</div>
									</>
								}
								<div className='flex justify-between mt-6'>
									{
										(!user?.resume || showResumeUpload) &&
										<>
											<div className='border flex gap-x-3 border-dashed h-10 border-lightgreen cursor-pointer' onClick={() => resumeRef?.current.click()}>
												<div className='py-2 px-4 flex gap-x-4 bg-blue-50'>
													<FaPaperclip className='text-lightgreen text-2xl' />
													<h1>Attach Resume/Cv</h1>
												</div>
												<input accept='application/pdf' ref={resumeRef} type="file" name='resume' className='hidden' onChange={(e) => handleResumeChange(e)} />
											</div>
											{
												pdfPreview && <>
													<div className="bg-white">
														<iframe src={pdfPreview} className="px-4 py-2" />
													</div>
												</>
											}
										</>
									}
								</div>
								<div className='w-full mt-4'>
									<button className='px-4 w-full py-3 border bg-lightgreen text-white  font-semibold rounded-md'>Submit Application</button>
								</div>
								<div className='w-full mt-4 flex justify-center'>
									<button type='button' onClick={() => setIsModalOpen(false)} className='px-4 py-3 border bg-black text-white  font-semibold rounded-md'>Cancel</button>
								</div>
							</form>
						</div>
					</> : <>
						<div className=''>
							<div>
								<h1 className='text-red-500 font-semibold'>Please Complete your Profile for applying this job you have only Completed {user?.profileScore}% !<br /> Min Requirement is 50% !!!</h1>
							</div>
							<div className='mt-4 flex justify-center'>
								<NavLink to="/user/profile" className="bg-black text-white font-semibold px-3 py-2 rounded-md">Complete Now</NavLink>
							</div>
						</div>
					</>
				}
			</Modal>
		</div>
	)
}

export default FindJobCard
