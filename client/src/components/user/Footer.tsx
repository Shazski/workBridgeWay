import LOGO from "../../assets/images/Logo.png"
const Footer = () => {
    return (
        <div className="bg-gray-900 w-full text-gray-400">
            <div className="md:flex ms-14 md:ms-32 pt-10">
                <div className="logo md:w-3/12">
                    <img src={LOGO} alt="" className="w-32" />
                    <h1 className="text-sm mt-2 ms-2">Great platform for the job seekers that passionate about startups. Find your dream job easier</h1>
                </div>
                <div className="about ms-2 md:ms-20 pt-10 md:3/12">
                    <h1 className="text-white font-semibold">About</h1>
                    <h1 className="pt-2">Companies</h1>
                    <h1 className="pt-2">Pricing</h1>
                    <h1 className="pt-2">Terms</h1>
                    <h1 className="pt-2">Advice</h1>
                    <h1 className="pt-2">Privacy Policy</h1>
                </div>
                <div className="resources ms-2 md:ms-24 pt-10 md:w-3/12">
                    <h1 className="text-white font-semibold">Resources</h1>
                    <h1 className="pt-2">Help Docs</h1>
                    <h1 className="pt-2">Guide</h1>
                    <h1 className="pt-2">Updates</h1>
                    <h1 className="pt-2">Contact</h1>
                </div>
                <div className="notifications  pt-10 md:w-3/12">
                    <h1 className="text-white font-semibold">Get job notifications</h1>
                    <h1 className="pt-2">The latest job news, articles, sent to your inbox weekly</h1>
                    <div className="mt-5 2xl:flex gap-3">
                        <input type="text" placeholder="Email Address" className="py-2 md:h-10 md:ps-2 rounded-md" />
                        <button className="py-2 bg-lightgreen text-white px-4 mt-3 md:mt-0 rounded-md">Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
