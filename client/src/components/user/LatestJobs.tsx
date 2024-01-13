import LOGO from "../../assets/images/Logo.png"
import JobCategogyBtn from "./JobCategogyBtn"
const LatestJobs = () => {
    return (
        <div className="ms-14 md:ms-36">
            <div className="mt-10 md:mt-20">
                <h1 className="text-3xl font-serif pt-8">Latest <span className="text-blue-500"> jobs open </span></h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="bg-white flex mt-12 w-11/12 lg:w-9/12">
                    <div>
                        <img src={LOGO} alt="" className="w-28 mt-2" />
                    </div>

                    <div className="pt-3">
                        <h1 className="font-semibold">Social Media Assistant</h1>
                        <h1 className="text-sm">Nomad . <span>Paris, France</span></h1>
                        <div className="flex gap-3 pb-6">
                            <h4 className="border text-sm text-green-500 bg-green-100  mt-4 px-2 py-1 rounded-xl">Full Time</h4>
                            <h4 className="border text-sm text-yellow-400 border-yellow-500 mt-4 px-2 py-1 rounded-xl ">Marketing</h4>
                            <h4 className="border text-sm text-green-500 border-green-500  mt-4 px-2 py-1 rounded-xl">Design</h4>
                        </div>
                    </div>
                </div>
                <div className="bg-white flex mt-12 w-11/12 lg:w-9/12">
                    <div>
                        <img src={LOGO} alt="" className="w-28 mt-2" />
                    </div>

                    <div className="pt-3">
                        <h1 className="font-semibold">Social Media Assistant</h1>
                        <h1 className="text-sm">Nomad . <span>Paris, France</span></h1>
                        <div className="flex gap-3 pb-6">
                            <h4 className="border text-sm text-green-500 bg-green-100  mt-4 px-2 py-1 rounded-xl">Full Time</h4>
                            <h4 className="border text-sm text-yellow-400 border-yellow-500 mt-4 px-2 py-1 rounded-xl ">Marketing</h4>
                            <h4 className="border text-sm text-green-500 border-green-500  mt-4 px-2 py-1 rounded-xl">Design</h4>
                        </div>
                    </div>
                </div>
                <div className="bg-white flex mt-12 w-11/12 lg:w-9/12">
                    <div>
                        <img src={LOGO} alt="" className="w-28 mt-2" />
                    </div>

                    <div className="pt-3">
                        <h1 className="font-semibold">Social Media Assistant</h1>
                        <h1 className="text-sm">Nomad . <span>Paris, France</span></h1>
                        <div className="flex gap-3 pb-6">
                            <h4 className="border text-sm text-green-500 bg-green-100  mt-4 px-2 py-1 rounded-xl">Full Time</h4>
                            <h4 className="border text-sm text-yellow-400 border-yellow-500 mt-4 px-2 py-1 rounded-xl ">Marketing</h4>
                            <h4 className="border text-sm text-green-500 border-green-500  mt-4 px-2 py-1 rounded-xl">Design</h4>
                        </div>
                    </div>
                </div>
                <div className="bg-white flex mt-12 w-11/12 lg:w-9/12">
                    <div>
                        <img src={LOGO} alt="" className="w-28 mt-2" />
                    </div>

                    <div className="pt-3">
                        <h1 className="font-semibold">Social Media Assistant</h1>
                        <h1 className="text-sm">Nomad . <span>Paris, France</span></h1>
                        <div className="flex gap-3 pb-6">
                            <h4 className="border text-sm text-green-500 bg-green-100  mt-4 px-2 py-1 rounded-xl">Full Time</h4>
                            <h4 className="border text-sm text-yellow-400 border-yellow-500 mt-4 px-2 py-1 rounded-xl ">Marketing</h4>
                            <h4 className="border text-sm text-green-500 border-green-500  mt-4 px-2 py-1 rounded-xl">Design</h4>
                        </div>
                    </div>
                </div>
                <div className="bg-white flex mt-12 w-11/12 lg:w-9/12">
                    <div>
                        <img src={LOGO} alt="" className="w-28 mt-2" />
                    </div>

                    <div className="pt-3">
                        <h1 className="font-semibold">Social Media Assistant</h1>
                        <h1 className="text-sm">Nomad . <span>Paris, France</span></h1>
                        <JobCategogyBtn/>
                    </div>
                </div>
                <div className="bg-white flex mt-12 w-11/12 lg:w-9/12">
                    <div>
                        <img src={LOGO} alt="" className="w-28 mt-2" />
                    </div>

                    <div className="pt-3">
                        <h1 className="font-semibold">Social Media Assistant</h1>
                        <h1 className="text-sm">Nomad . <span>Paris, France</span></h1>
                        <div className="flex gap-3 pb-6">
                            <h4 className="border text-sm text-green-500 bg-green-100  mt-4 px-2 py-1 rounded-xl">Full Time</h4>
                            <h4 className="border text-sm text-yellow-400 border-yellow-500 mt-4 px-2 py-1 rounded-xl ">Marketing</h4>
                            <h4 className="border text-sm text-green-500 border-green-500  mt-4 px-2 py-1 rounded-xl">Design</h4>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default LatestJobs
