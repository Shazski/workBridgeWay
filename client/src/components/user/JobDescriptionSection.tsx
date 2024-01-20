import { CiCircleCheck } from "react-icons/ci";
const JobDescriptionSection = () => {
    return (
        <div>

            <div className="flex ms-4 md:ms-0 justify-center mt-16">
                <div className=" w-4/12">
                    <h2 className="text-2xl font-serif">Description</h2>
                    <h2 className="text-xs text-gray-500 mt-3">Stripe is looking for Social Media Marketing expert to help manage our online networks. You will be responsible for monitoring our social media channels, creating content, finding effective ways to engage the community and incentivize others to engage on our channels.</h2>
                    <h2 className="text-2xl font-serif mt-8">Responsibilities</h2>
                    <div className="flex gap-3 mt-2">
                    <CiCircleCheck className="text-6xl md:text-2xl text-lightgreen"/>
                    <h2 className="text-sm">Community engagement to ensure that is supported and actively represented online</h2>
                    </div>
                </div>
                <div className="ms-12 md:ms-52">
                    <div>
                        <h1 className="font-serif  text-xl">About this role</h1>
                        <h1 className="mt-5"><span className="font-medium">5 applied</span> of 10 capacity</h1>
                        <div className="flex justify-between mt-5">
                            <h1 className="text-gray-500">Apply Before</h1>
                            <h1 className="font-medium">Date</h1>
                        </div>
                        <div className="flex justify-between mt-5">
                            <h1 className="text-gray-500">Job Posted On</h1>
                            <h1 className="font-medium">Date</h1>
                        </div>
                        <div className="flex justify-between mt-5">
                            <h1 className="text-gray-500">Job Type</h1>
                            <h1 className="font-medium">Full-Time</h1>
                        </div>
                        <div className="flex justify-between mt-5">
                            <h1 className="text-gray-500">Salary</h1>
                            <h1 className="font-medium">3 LPA - 5 LPA</h1>
                        </div>
                    </div>
                    <div className="mt-6">
                        <h1 className="font-serif font-medium text-xl">Required Skills</h1>
                        <div className="grid grid-cols-2 gap-6 mt-4">
                            <h1 className="text-lightgreen">Project Management</h1>
                            <h1 className="text-lightgreen">Copywriting</h1>
                            <h1 className="text-lightgreen">Social Media Marketing</h1>
                            <h1 className="text-lightgreen">English</h1>
                            <h1 className="text-lightgreen">Copy Editing</h1>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default JobDescriptionSection
