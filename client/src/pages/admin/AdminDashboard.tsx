import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdBusiness } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
// import AdminDashCards from "@/components/admin/Dashboard/AdminDashCards";
// import {
//   fetchJobs,
// } from "@/redux/actions/companyActions";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  BarChart,
  Bar,
} from "recharts";
import { TODO } from "../../config/constants";
import { ICompanyData } from "../../interface/ICompanyData";


const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const [usersCount, setUsersCount] = useState<number>(0);
  const [users, setUsers] = useState([]);
  const [_, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [jobsCount, setJobsCount] = useState<number>(0);
  const [companyCount, setCompaniesCount] = useState<number>(0);
  const [pendingApprovels, setPendingApprovels] = useState<number>(0);
  const [timeFrame, setTimeFrame] = useState<string>('monthly');
  const Month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', ' Oct', 'Nov', 'Dec']

  // Fetch data on component mount
  // useEffect(() => {
  //   fetchUsersAndCompanies();
  //   fetchTotalJobs();
  // }, [timeFrame]); // Refetch data when the time frame changes

  // Fetch users and companies data
  // const fetchUsersAndCompanies = async () => {
  //   try {
  //     // const data = await fetchUsers();

  //     // Filter users
  //     const filteredUsers = data?.data?.filter(
  //       (user: TODO) => user?.role === "user"
  //     );
  //     setUsersCount(filteredUsers?.length);
  //     setUsers(filteredUsers);

  //     // Filter companies
  //     const filteredCompanies = data?.data?.filter(
  //       (company: TODO) => company?.role === "company"
  //     );
  //     setCompaniesCount(filteredCompanies?.length);
  //     setCompanies(filteredCompanies);

  //     // Count pending approvals
  //     const pendingApprovelsCount = data?.data?.filter(
  //       (company: TODO) => company?.approved === false
  //     );
  //     setPendingApprovels(pendingApprovelsCount?.length);
  //   } catch (err: unknown) {
  //     console.log(err, " error in useEffect of AdminDashboard");
  //   }
  // };

  // Fetch total jobs
  // const fetchTotalJobs = async () => {
  //   try {
  //     const totalJobs = await fetchJobs();
  //     setJobsCount(totalJobs?.data?.length);
  //     setJobs(totalJobs?.data);
  //   } catch (err: unknown) {
  //     console.log(err, " error in fetching totalJobs of AdminDashboard");
  //   }
  // };

  // Handle logout
  // const handleLogout = () => {
  //   console.log("Logging out...");
  //   dispatch(logout());
  // };

  // Prepare data for the line chart showing companies registered in each month
  const prepareCompanyData = () => {
    const monthsData: { [key: string]: number } = {};

    // Count the number of companies registered in each month
    companies.forEach((company: TODO) => {
      const registrationDate = new Date(company.createdAt);
      let monthName = '';

      if (timeFrame === 'monthly') {
        monthName = Month[registrationDate.getMonth()];
      } else if (timeFrame === 'weekly') {
        monthName = `Week ${getWeekNumber(registrationDate)}`;
      } else if (timeFrame === 'yearly') {
        monthName = `${registrationDate.getFullYear()}`;
      }

      // Increment count for the corresponding month
      if (monthsData[monthName]) {
        monthsData[monthName]++;
      } else {
        monthsData[monthName] = 1;
      }
    });

    // Format data for the line chart
    const lineChartData = Object.keys(monthsData).map((monthName) => ({
      month: monthName,
      companiesRegistered: monthsData[monthName],
    }));

    return lineChartData;
  };

  // Function to get the week number
  const getWeekNumber = (date: Date) => {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const differenceInTime = date.getTime() - oneJan.getTime();
    return Math.ceil((differenceInTime / (1000 * 3600 * 24 * 7)) + 1);
  };

  // Data for the line chart
  const lineChartData = prepareCompanyData();

  // Prepare data for the bar chart showing number of users created each month
  const prepareUserData = () => {
    const userData: { [key: string]: number } = {};

    // Count the number of users created in each month
    users.forEach((user: TODO) => {
      const creationDate = new Date(user?.createdAt);
      let monthName = '';

      if (timeFrame === 'monthly') {
        monthName = Month[creationDate.getMonth()];
      } else if (timeFrame === 'weekly') {
        monthName = `Week ${getWeekNumber(creationDate)}`;
      } else if (timeFrame === 'yearly') {
        monthName = `${creationDate.getFullYear()}`;
      }

      // Increment count for the corresponding month
      if (userData[monthName]) {
        userData[monthName]++;
      } else {
        userData[monthName] = 1;
      }
    });

    // Format data for the bar chart
    const barChartData = Object.keys(userData).map((monthName) => ({
      month: monthName,
      NumberOfUsers: userData[monthName],
    }));

    return barChartData;
  };

  // Data for the bar chart
  const barChartData = prepareUserData();

  // Render the AdminDashboard component
  return (
    <>
      <div className="flex min-h-screen">
        {/* Main Content */}
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Welcome Admin!
          </h1>
          <div className="w-full flex flex-wrap justify-around gap-3">
            {/* Dashboard cards */}
            {/* <AdminDashCards
              text="Total Companies "
              icon={IoMdBusiness}
              count={companyCount}
            />
            <AdminDashCards text="Total Users " icon={FaUsers} count={usersCount} />
            <AdminDashCards text="Total Jobs " icon={MdWork} count={jobsCount} />
            <AdminDashCards
              text="Pending Approvals"
              icon={MdOutlinePendingActions}
              count={pendingApprovels}
            /> */}
          </div>
          {/* Filter selection */}
          <div className="flex justify-center mt-6">
            <select
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              value={timeFrame}
              onChange={(e) => setTimeFrame(e.target.value)}
            >
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-6 mt-8">
            {/* Line Chart */}
            <div className="border rounded shadow-md w-full p-3 h-auto bg-white">
              <LineChart
                width={400}
                height={200}
                data={lineChartData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Line
                  type="monotone"
                  dataKey="companiesRegistered"
                  stroke="#8884d8"
                />
              </LineChart>
              <div className="w-full text-center p-3">
                <h1 className="font-bold text-lg">
                  Companies Registered Per {timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)}
                </h1>
                <p>Number of companies registered in each {timeFrame}</p>
              </div>
            </div>
            {/* Bar Chart */}
            <div className="border rounded shadow-md w-full p-3 h-auto bg-white">
              <BarChart
                width={400}
                height={200}
                data={barChartData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Bar dataKey="NumberOfUsers" fill="#82ca9d" />
              </BarChart>
              <div className="w-full text-center p-3">
                <h1 className="font-bold text-lg">No. Of Users</h1>
                <p>Count of users created in recent {timeFrame}</p>
              </div>
            </div>
            {/*  */}
            {/* Latest Users Table */}
          </div>
          <div className="mt-8 ">
            <h2 className="text-xl font-bold mb-4 ">Latest Users</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Render latest users here */}
                {users.reverse().map((user: TODO) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.userName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(user.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/*  */}
          <div className="mt-8 ">
            <h2 className="text-xl font-bold mb-4 ">Latest Companies</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CompanyName
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Render latest users here */}
                {companies.reverse().map((company: TODO) => (
                  <tr key={company._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {company.userName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {company.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {company.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(company.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/*  */}
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;