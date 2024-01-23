import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/user/Login';
import SignUp from './pages/user/SignUp';
import Home from './pages/user/Home';
import Footer from './components/user/Footer';
import FindJobs from './pages/user/FindJobs';
import JobDescription from './pages/user/JobDescription';
import CompanyRegister from './pages/company/CompanyRegister';
import CompanySideBar from './components/company/CompanySideBar';
import CompanyNavbar from './components/company/CompanyNavbar';
import CompanyDashboard from './pages/company/ComapnyDashboard';
import JobApplicants from './pages/company/JobApplicants';
import Otp from './pages/user/Otp';
import AdminSideBar from './components/admin/AdminSideBar';
import { useSelector } from 'react-redux';
import Dashboard from './pages/user/Dashboard';
import UserSidebar from './components/user/UserSidebar';
import { ToastContainer } from 'react-toastify';
import { ReactNode } from 'react';
import Profile from './pages/user/Profile';
import Applications from './pages/user/Applications';
import Messages from './pages/user/Messages';

function App() {
  const { user } = useSelector((state: any) => state?.user);


  const ProtectedRoute = ({ element }: { element: ReactNode }) => {

    return user ? element : <Navigate to="/login" />;
  }

  return (
    <div className=''>
      <ToastContainer />
      <div className='md:flex'>
        <Router>
          {user?.role === 'company' && <CompanySideBar />}
          {user?.role === 'admin' && <AdminSideBar />}
          <div className='flex-1'>
            {user?.role === 'company' && <CompanyNavbar />}
            <Routes>

              {/* common routes */}
              <Route path='/' element={<Home />} />
              <Route path='/login' element={(user && !user.user) ? <Navigate to={'/'} /> : user?.user ? <Navigate to={'/otp'} /> : <Login />} />
              <Route path='/signup' element={(user && !user.user) ? <Navigate to={'/'} /> : user?.user ? <Navigate to={'/otp'} /> : <SignUp />} />
              <Route path='/jobs' element={<FindJobs />} />
              <Route path='/otp' element={user ? <Otp /> : <Navigate to={'/signup'} />} />
              <Route path='/jobs/:id' element={<JobDescription />} />
              <Route path='/company-register' element={<CompanyRegister />} />


              {/* company routes */}
              <Route path='/company-dashboard' element={<CompanyDashboard />} />
              <Route path='/company-applicants/:id' element={<JobApplicants />} />

              {/* user routes */}
              <Route path='user' element={<ProtectedRoute element={<UserSidebar />} />}>
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='profile' element={<Profile />} />
                <Route path='messages' element={<Messages />} />
                <Route path='applications' element={<Applications />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </div>
      {(user?.role === 'user') && <Footer />}
    </div>
  );
}

export default App;
