import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export function CompanyProfile() {
  const { user } = useSelector(
    (state: RootState) => state.user
  );
  return (
    <main className="w-full h-screen ">
      <section className="  mx-auto w-[95%] space-y-4">
        <div className="h-56 w-full  flex relative ">
          <div className="absolute -left-2 top-5 bg-background rounded-md">
            {/* <EditBtn /> */}
          </div>
          <div className="h-full w-64   flex items-center justify-start ">
            <img
              src={user?.companyLogo}
              className="w-[70%] h-[70%] object-cover rounded-xl"
              alt=""
            />
          </div>
          <div className="h-full w-full  flex items-center">
            <div className="w-full h-[70%] flex flex-col justify-between">
              <div className="w-full flex justify-between">
                <div className="flex flex-col gap-3">
                  <h1 className="maintxt text-3xl font-bold">{user.name}</h1>
                  <div>
                    <a
                      href={user.website}
                      className="font-semibold text-primary text-lg"
                    >
                      {user.website}
                    </a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="min-w-48 flex items-center justify-center h-12 gap-2 text-primary">
                    {/* <Eye /> Public view */}
                  </button>
                  <button className="min-w-48 flex items-center justify-center h-12 border gap-2 text-primary dark:text-white">
                    {/* <Settings className="w-5" /> Profile settings */}
                  </button>
                </div>
              </div>
              <div className="w-full flex h-12">
                <div className="h-full w-56 flex gap-3">
                  <div className="h-full w-12 flex items-center justify-center rounded-full border">
                    {/* <Flame /> */}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-textPrimary">Founded</h3>
                    {/* <h3 className="font-bold">
                      {format(
                        user?.foundedDate as string | number | Date,
                        "PPP"
                      )}
                    </h3> */}
                  </div>
                </div>
                <div className="h-full w-56 flex gap-3">
                  <div className="h-full w-12 flex items-center justify-center rounded-full border">
                    {/* <MapPin /> */}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-textPrimary">Location</h3>
                    <h3 className="font-bold">
                      {user?.locations?.length} Countries
                    </h3>
                  </div>
                </div>
                <div className="h-full w-56 flex gap-3">
                  <div className="h-full w-12 flex items-center justify-center rounded-full border">
                    {/* <Building2 /> */}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-textPrimary">Industry</h3>
                    <h3 className="font-bold">{user.industry}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row ">
          <div className="w-full space-y-3">
            <div className="maintxt w-full flex justify-between">
              <h1 className="text-3xl font-semibold">Company Profile</h1>
              <div>
                {/* <EditBtn /> */}
              </div>
            </div>
            <div className="h-80 w-full border-b">
              <div className="divClass h-72 overflow-y-auto pb-5 ">
                <p className="text-textPrimary maintxt text-lg">
                  {user?.description} Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam sint eaque laudantium fugit repellat, dolore quisquam ad corrupti distinctio reprehenderit obcaecati dolorem, quis blanditiis repellendus, nesciunt quaerat. Nisi, officia alias.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 md:block pl-10 min-h-56 space-y-4 ">
            <div className="space-y-3 md:h-96 border-b w-full">
              <div className="maintxt w-full flex justify-between">
                <h1 className="text-3xl font-semibold">Tech stack</h1>
                <div className="flex gap-2">
                  <div>
                    {/* <PlusBtn /> */}
                  </div>
                  <div>
                    {/* <EditBtn /> */}
                  </div>
                </div>
              </div>
              <div className=" w-full  flex flex-wrap pr-4">
                {user.techStack?.map((value, index) => (
                  <div className="flex flex-col w-28 h-32 " key={index}>
                    <div className="w-full h-24  text-8xl flex items-center justify-center">
                      {/* <TechnologyIcon technology={value} /> */}
                    </div>
                    <div className="w-full flex items-center justify-center text-lg">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full mt-3 space-y-3">
              <div className="maintxt w-full flex justify-between">
                <h1 className="text-3xl font-semibold">Company Profile</h1>
                <div className="flex gap-2">
                  <div>
                    {/* <PlusBtn /> */}
                  </div>
                  <div>
                    {/* <EditBtn /> */}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {user?.locations?.map((value, index) => (
                  <div key={index} className="w-full h-10 flex gap-4">
                    <div className="w-10 h-10 flex items-center justify-center border rounded-md">
                      {/* <Flag className="w-5" /> */}
                    </div>
                    <div className="flex items-center">
                      <h1 className="text-2xl">{value}</h1>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </section>
    </main>
  );
}