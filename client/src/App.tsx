import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/user/Login';
import SignUp from './pages/user/SignUp';
import Home from './pages/user/Home';
import Footer from './components/user/Footer';
import FindJobs from './pages/user/FindJobs';
import JobDescription from './pages/user/JobDescription';
import { Toaster } from 'react-hot-toast';
import CompanyRegister from './pages/company/CompanyRegister';
import CompanyDashboard from './pages/company/ComapnyDashboard';
import JobApplicants from './pages/company/JobApplicants';
import Otp from './pages/user/Otp';
import AdminSideBar from './components/admin/AdminSideBar';
import { useDispatch, useSelector } from 'react-redux';
import Dashboard from './pages/user/Dashboard';
import UserSidebar from './components/user/UserSidebar';
import { ToastContainer } from 'react-toastify';
import { ReactNode, useEffect } from 'react';
import Profile from './pages/user/Profile';
import Applications from './pages/user/Applications';
import Messages from './pages/user/Messages';
import Settings from './pages/user/Settings';
import ProfilePic from './components/user/ProfilePic';
import { AppDispatch, RootState } from './redux/store';
import { makeErrorDisable } from './redux/reducers/user/userSlice';
import UpdateLoginDetails from './components/user/UpdateLoginDetails';
import CompanyRequest from './pages/admin/CompanyRequest';
import AdminDashboard from './pages/admin/AdminDashboard';
import AllUsers from './pages/admin/AllUsers';
import CompanyList from './pages/admin/CompanyList';
import Complaints from './pages/admin/Complaints';
import CompanySideBar from './components/company/CompanySideBar';
import WaitingPage from './pages/company/WaitingPage';
import PostJobSection from './components/company/PostJobSection';
import JobList from './pages/company/JobList';
import UpdateJobDetails from './pages/company/UpdateJobDetails';
import { useNavigate } from "react-router-dom"
import CompanyJobApplicants from './pages/company/CompanyJobApplicants';
import ApplicantDetails from './pages/company/ApplicantDetails';
import ApplicantPersonalInfo from './components/company/ApplicantPersonalInfo';
import ApplicantResume from './components/company/ApplicantResume';
import ApplicantHiringStage from './components/company/ApplicantHiringStage';
import ApplicantInterviewSchedule from './components/company/ApplicantInterviewSchedule';
import Notifications from './components/Notifications';
import EmployeeList from './pages/company/EmployeeList';
import Schedule from './pages/company/Schedule';
function App() {
  const { user, error } = useSelector((state: RootState) => state?.user);
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(makeErrorDisable())
      }, 10000);
    }
  }, [error, dispatch])

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user])


  const UserProtectedRoute = ({ element }: { element: ReactNode }) => {
    return user?.role === "user" ? element : <Navigate to="/login" />;
  }
  const CompanyProtectedRoute = ({ element }: { element: ReactNode }) => {
    return user?.role === "company" ? element : <Navigate to="/login" />;
  }
  const AdminProtectedRoute = ({ element }: { element: ReactNode }) => {
    return user?.role === "admin" ? element : <Navigate to="/login" />;
  }

  return (
    <div>
      <Toaster position='top-center' />
      <ToastContainer />
      <Notifications />
      <div>
        <Routes>
          {/* common routes */}
          <Route path='/' element={user?.role === "company" ? <Navigate to={'/company/dashboard'} /> : user?.role === "admin" ? <Navigate to={'/admin/dashboard'} /> : <Home />} />
          <Route path='/login' element={(user?.email && !user?.user?.email) ? <Navigate to={'/'} /> : user?.user?.email ? <Navigate to={'/otp'} /> : <Login />} />
          <Route path='/signup' element={(user?.email && !user?.user?.email) ? <Navigate to={'/'} /> : user?.user?.email ? <Navigate to={'/otp'} /> : <SignUp />} />
          <Route path='/jobs' element={<FindJobs />} />
          <Route path='/otp' element={user?.user?.email ? <Otp /> : <Navigate to={'/signup'} />} />
          <Route path='/jobs/:id' element={<JobDescription />} />
          <Route path='/company-register' element={<CompanyRegister />} />
          <Route path='/update-email/otp' element={user?.newEmail ? <Otp /> : <Navigate to="/login" />} />

          {/* company routes */}
          {(user?.stage === "pending" || user?.stage === "rejected" || user?.stage === "reapplied") ? <Route path='/company/dashboard' element={<CompanyProtectedRoute element={<WaitingPage />} />} /> : <>
            <Route path='company' element={<CompanyProtectedRoute element={<CompanySideBar />} />}>
              <Route path='dashboard' element={<CompanyDashboard />} />
              <Route path='applicants' element={<JobApplicants />} />
              <Route path='schedule' element={<Schedule />} />
              <Route path='employees' element={<EmployeeList />} />
              <Route path='applicants/:id' element={<CompanyJobApplicants />} />
              <Route path='applicants/:id/:userId' element={<ApplicantDetails />} >
                <Route path='profile' element={<ApplicantPersonalInfo />} />
                <Route path='resume' element={<ApplicantResume />} />
                <Route path='hiring-stage' element={<ApplicantHiringStage />} />
                <Route path='interview-schedule' element={<ApplicantInterviewSchedule />} />
              </Route>
              <Route path='post-job' element={<PostJobSection />} />
              <Route path='job-list' element={<JobList />} />
              <Route path='edit-job/:id' element={<UpdateJobDetails />} />
            </Route>
          </>
          }

          {/* user routes */}
          <Route path='user' element={<UserProtectedRoute element={<UserSidebar />} />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='profile' element={<Profile />} />
            <Route path='messages' element={<Messages />} />
            <Route path='applications' element={<Applications />} />
            <Route path='settings' element={<Settings />} >
              <Route path='edit-profile' element={<ProfilePic />} />
              <Route path='edit-login' element={<UpdateLoginDetails />} />
            </Route>
          </Route>

          {/* Admin Routes */}
          <Route path='admin' element={<AdminProtectedRoute element={<AdminSideBar />} />}>
            <Route path='dashboard' element={<AdminProtectedRoute element={<AdminDashboard />} />} />
            <Route path='companies' element={<AdminProtectedRoute element={<CompanyList />} />} />
            <Route path='all-users' element={<AdminProtectedRoute element={<AllUsers />} />} />
            <Route path='company-complaints' element={<AdminProtectedRoute element={<Complaints />} />} />
            <Route path='company-requests' element={<AdminProtectedRoute element={<CompanyRequest />} />} />
          </Route>
        </Routes>
      </div>

      {(user?.role === 'user') && <Footer />}
    </div >
  );
}

export default App;
