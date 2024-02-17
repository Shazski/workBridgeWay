import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/user/Login';
import SignUp from './pages/user/SignUp';
import Home from './pages/user/Home';
import Footer from './components/user/Footer';
import FindJobs from './pages/user/FindJobs';
import JobDescription from './pages/user/JobDescription';
import CompanyRegister from './pages/company/CompanyRegister';
// import CompanySideBar from './components/company/CompanySideBar';
// import CompanyNavbar from './components/company/CompanyNavbar';
import CompanyDashboard from './pages/company/ComapnyDashboard';
import JobApplicants from './pages/company/JobApplicants';
import Otp from './pages/user/Otp';
import AdminSideBar from './components/admin/AdminSideBar';
import { useDispatch, useSelector } from 'react-redux';
import Dashboard from './pages/user/Dashboard';
import UserSidebar from './components/user/UserSidebar';
import { ToastContainer } from 'react-toastify';
import { ReactNode, useCallback, useEffect } from 'react';
import Profile from './pages/user/Profile';
import Applications from './pages/user/Applications';
import Messages from './pages/user/Messages';
import Settings from './pages/user/Settings';
import ProfilePic from './components/user/ProfilePic';
import { AppDispatch } from './redux/store';
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
import Particles from 'react-tsparticles';
import { loadSlim } from "tsparticles-slim";

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const { user, error } = useSelector((state: any) => state?.user);
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(makeErrorDisable())
      }, 10000);
    }
  }, [error, dispatch])

  const UserProtectedRoute = ({ element }: { element: ReactNode }) => {
    return user?.role === "user" ? element : <Navigate to="/login" />;
  }
  const CompanyProtectedRoute = ({ element }: { element: ReactNode }) => {
    return user?.role === "company" ? element : <Navigate to="/login" />;
  }
  const AdminProtectedRoute = ({ element }: { element: ReactNode }) => {
    return user?.role === "admin" ? element : <Navigate to="/login" />;
  }

  const particlesInit = useCallback(async (engine: any) => {
    console.log(engine);

    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    // await loadFull(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: any | undefined) => {
    return new Promise<void>((resolve) => {
      console.log(container);
      // Additional initialization logic can go here
      resolve(container);
    });
  }, []);

  return (
    <div>
      <ToastContainer />
      <Router>
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
            {(user?.stage === "pending") ? <Route path='/company/dashboard' element={<CompanyProtectedRoute element={<WaitingPage />} />} /> : <>
              <Route path='company' element={<CompanyProtectedRoute element={<CompanySideBar />} />}>
                <Route path='dashboard' element={<CompanyDashboard />} />
                <Route path='applicants' element={<JobApplicants />} />
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
      </Router >

      {(user?.role === 'user') && <Footer />
      }
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "ffff"
            },
          },
          fpsLimit: 240,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 5,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#20DC49",
            },
            links: {
              color: "#20DC49",
              distance: 150,
              enable: true,
              opacity: 0.7,
              width: 0.8,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 6,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 1.7,
            },
            shape: {
              type: "star",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
        className='particles' />
    </div >
  );
}

export default App;
