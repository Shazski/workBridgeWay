
const ApplicantPersonalInfo = () => {
  return (
    <div className='mt-4'>
      <h1 className='font-semibold text-blue-gray-800 ms-3'>Personal Info</h1>
      <div className='ms-3 grid grid-cols-2 border-b-2'>
        <div>
          <h1 className="text-sm text-gray-600 mt-4 poppins">Full Name</h1>
          <h1 className="text-sm text-gray-900 ">Jerome</h1>
        </div>
        <div>
          <h1 className="text-sm text-gray-600 mt-4 poppins">Date of birth</h1>
          <h1 className="text-sm text-gray-900 ">March 23, 1995 (26 y.o)</h1>
        </div>
        <div>
          <h1 className="text-sm text-gray-600 mt-4 poppins">Linked In</h1>
          <a href="https://asdasdsajkda" target="_blank" className="text-sm text-lightgreen ">https.kks.adda/asds/asdw</a>
        </div>
      </div>
      <h1 className='font-semibold text-blue-gray-800 ms-3 mt-4'>Proffesional Info</h1>
      <div className='ms-3 '>
        <div>
          <h1 className="text-sm text-gray-600 mt-4 poppins">About Me</h1>
          <h1 className="text-xs w-96 text-black mt-2">Im a product designer + filmmaker currently working remotely at Twitter from beautiful Manchester, United Kingdom. Im passionate about designing digital products that have a positive impact on the world.</h1>
        </div>
      </div>
      <div className='ms-3 grid grid-cols-2'>
        <div>
          <h1 className="text-sm text-gray-600 mt-4 poppins">Current Job</h1>
          <h1 className="text-sm text-black mt-1 font-medium">Product Designer</h1>
        </div>
        <div className="mb-5">
          <h1 className="text-sm text-gray-600 mt-4 poppins">Skill set</h1>
          <div className="flex flex-wrap gap-x-2">
            <h1 className="text-sm text-lightgreen mt-1 font-medium px-2 py-1 rounded-md bg-gray-200">Product Designer</h1>
            <h1 className="text-sm text-lightgreen mt-1 font-medium px-2 py-1 rounded-md bg-gray-200">Product Designer</h1>
            <h1 className="text-sm text-lightgreen mt-1 font-medium px-2 py-1 rounded-md bg-gray-200">Product Designer</h1>
            <h1 className="text-sm text-lightgreen mt-1 font-medium px-2 py-1 rounded-md bg-gray-200">Product Designer</h1>
            <h1 className="text-sm text-lightgreen mt-1 font-medium px-2 py-1 rounded-md bg-gray-200">Product Designer</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplicantPersonalInfo