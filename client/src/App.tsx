import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/user/Login'
import SignUp from './pages/user/SignUp'
import Home from './pages/user/Home'
import Footer from './components/user/Footer'
import FindJobs from './pages/user/FindJobs'
import JobDescription from './pages/user/JobDescription'
import CompanyRegister from './pages/company/CompanyRegister'
function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/jobs' element={<FindJobs/>} />
        <Route path='/jobs/:id' element={<JobDescription/>} />
        <Route path='/company-register' element={<CompanyRegister/>} />
      </Routes>
      <Footer/>
    </Router>
    </div>
  )
}

export default App
