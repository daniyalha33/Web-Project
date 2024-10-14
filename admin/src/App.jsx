import React, { useContext } from 'react'
import Login from './pages/login'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import {Route,Routes} from 'react-router-dom'
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AddDoctor from './pages/Admin/AddDoctor';
import AllAppointments from './pages/Admin/AllAppointments';
import Dashboard from './pages/Admin/Dashboard';
import DoctorsList from './pages/Admin/DoctorsList';
import { DoctorContext } from './context/DoctorContext';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorProfile from './pages/Doctor/DoctorProfile';


const App = () => {
  const {adminToken}=useContext(AdminContext)
  const {dToken}=useContext(DoctorContext)
  return adminToken || dToken?(
    <div className='[#F8F9FD]'>
      <ToastContainer/>
      <Navbar/>
      <div className='flex items-start'><Sidebar/>
      <Routes>
      <Route path='/' element={<></>}/>
      <Route path='/add-doctor' element={<AddDoctor/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/doctors-list' element={<DoctorsList/>}/>
      <Route path='/all-appointments' element={<AllAppointments/>}/>
      <Route path='/doctor-appointments' element={<DoctorAppointments/>}/>
      <Route path='/doctor-dashboard' element={<DoctorDashboard/>}/>
      <Route path='doctor-profile' element={<DoctorProfile/>}/>
     </Routes>
      </div>
     
      
    </div>):(
    <>
    <Login/>
    <ToastContainer/>
    </>
  )
}

export default App
