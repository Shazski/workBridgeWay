import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/user/Login'
import SignUp from './pages/user/SignUp'
import Home from './pages/user/Home'
import Footer from './components/user/Footer'
import FindJobs from './pages/user/FindJobs'
import JobDescription from './pages/user/JobDescription'
import CompanyRegister from './pages/company/CompanyRegister'
import CompanySideBar from './components/company/CompanySideBar'
import CompanyNavbar from './components/company/CompanyNavbar'
import ComapnyDashboard from './pages/company/ComapnyDashboard'
import JobApplicants from './pages/company/JobApplicants'
import Otp from './pages/user/Otp'
import AdminSideBar from './components/admin/AdminSideBar'
import { useSelector } from 'react-redux'
function App() {
  const { user } = useSelector((state: any) => state?.user)
  const company = false
  const admin = false
  return (
    <div className=''>
      <div className='md:flex'>
        <Router>
          {company && <CompanySideBar />}
          {admin && <AdminSideBar />}
          <div className='flex-1'>
            {company && <CompanyNavbar />}
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={(user && !user.user) ? <Navigate to={'/'} /> : user?.user ? <Navigate to={'/otp'} /> : <Login />} />
              <Route path='/signup' element={(user && !user.user) ? <Navigate to={'/'} /> : user?.user ? <Navigate to={'/otp'} /> : <SignUp />} />
              <Route path='/jobs' element={<FindJobs />} />
              <Route path='/otp' element={user ? <Otp /> : <Navigate to={'/signup'} />} />
              <Route path='/jobs/:id' element={<JobDescription />} />
              <Route path='/company-register' element={<CompanyRegister />} />
              <Route path='/company-dashboard' element={<ComapnyDashboard />} />
              <Route path='/company-applicants/:id' element={<JobApplicants />} />
            </Routes>
          </div>
        </Router>
      </div>
      {(user.role === "user") && <Footer />}
    </div>
  )
}

export default App
