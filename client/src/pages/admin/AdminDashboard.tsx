import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { ADMIN_BASE_URL, TODO } from "../../config/constants";
import { getAllUsers } from "../../redux/actions/admin/adminActions";
import { AppDispatch, RootState } from "../../redux/store";
import axios from "axios";
import { config } from "../../config/configurations";


const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [users, setUsers] = useState<TODO>([]);
  const [sliceVal, setSliceVal] = useState<number>(10);
  const [companies, setCompanies] = useState<TODO[]>([]);
  const [timeFrame, setTimeFrame] = useState<string>('monthly');
  const Month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', ' Oct', 'Nov', 'Dec']

  const { usersDetails } = useSelector((state: RootState) => state.admin)
  useEffect(() => {
    dispatch(getAllUsers({ search: "", page: 1 }))

  }, [dispatch])

  const getAllRequest = async () => {
    try {

      const response = await axios.get(`${ADMIN_BASE_URL}/get-requests`, config);
      setCompanies(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getAllRequest();
  }, []);


  useEffect(() => {
    const data = usersDetails

    const filteredUsers = data?.filter(
      (user: TODO) => user?.role === "user"
    );
    setUsers(filteredUsers!);
  }, [])

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
    users?.forEach((user: TODO) => {
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
          <div className="md:grid grid-cols-2 gap-6 mt-8">
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
              <div className="flex flex-col md:items-center p-3">
                <h1 className="font-bold text-lg">
                  Companies Registered Per {timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)}
                </h1>
                <h1>Number of companies registered in each {timeFrame}</h1>
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
              <div className="flex flex-col md:items-center p-3">
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
                {users?.reverse().map((user: TODO) => (
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
                {companies?.reverse()?.slice(0, sliceVal).map((company: TODO) => (
                  <tr key={company._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {company.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {company.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {company?.stage}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(company.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {
            companies?.length > sliceVal && <>
              <div className="text-center mt-2 cursor-pointer">
                <h1 onClick={() => { companies?.length > sliceVal && setSliceVal(sliceVal + 10) }} className="px-3 py-2 border border-gray-600 inline">Load More</h1>
              </div>
            </>
          }
        </main >
      </div >
    </>
  );
};

export default AdminDashboard;