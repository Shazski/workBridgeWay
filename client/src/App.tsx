import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/user/Login'
import SignUp from './pages/user/SignUp'
import Home from './pages/user/Home'
// import Footer from './components/user/Footer'
import FindJobs from './pages/user/FindJobs'
import JobDescription from './pages/user/JobDescription'
import CompanyRegister from './pages/company/CompanyRegister'
import CompanySideBar from './components/company/CompanySideBar'
import CompanyNavbar from './components/company/CompanyNavbar'
import ComapnyDashboard from './pages/company/ComapnyDashboard'
import JobApplicants from './pages/company/JobApplicants'
// import AdminSideBar from './components/admin/AdminSideBar'
function App() {
  return (
    <div className=''>
      <div className='md:flex'>
      <Router>
        <CompanySideBar />
        {/* <AdminSideBar /> */}
        <div className='flex-1'>
          <CompanyNavbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/jobs' element={<FindJobs />} />
            <Route path='/jobs/:id' element={<JobDescription />} />
            <Route path='/company-register' element={<CompanyRegister />} />
            <Route path='/company-dashboard' element={<ComapnyDashboard />} />
            <Route path='/company-applicants/:id' element={<JobApplicants />} />
          </Routes>
        </div>
      </Router>
      </div>
      {/* <Footer/> */}
    </div>
  )
}

export default App
