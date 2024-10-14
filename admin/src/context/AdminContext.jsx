import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("adminToken") ? localStorage.getItem("adminToken") : ""
  );
  const backendUrl = import.meta.env.VITE_BACKEND_URI;
  const [dashData,setDashData]=useState(false)
  const [doctors, setDoctors] = useState([]);
  const [appointments,setAppointments]=useState([])
  const getDashData=async()=>{
    try {
      const {data}=await axios.get(backendUrl+'/api/admin/dashData',{headers:{Authorization:`Bearer ${adminToken}`}})
      if(data.success){
        setDashData(data.dashData)

      }else{
        toast(data.message)
      }
    } catch (error) {
      toast(error.message)
      
    }
  }

 const cancelAppointment=async(appointmentId)=>{
  try {
    const {data}=await axios.post(backendUrl+'/api/admin/cancel-appointment',{appointmentId},{headers:{Authorization:`Bearer ${adminToken}`}})
    if(data.success){
      toast(data.message)
      getAllAppointments()
    }
  else{
    toast(data.message)
  }
  } catch (error) {
    toast(error.message)
  }
 }
  const getAllDoctors = async () => {
    try {
      if (!backendUrl || !adminToken) {
        throw new Error("Backend URL or Admin token is missing.");
      }

      const { data } = await axios.post(
        backendUrl+'/api/admin/all-doctors',
        {}, // Empty body
        {
          headers: {
            Authorization: `Bearer ${adminToken}`, // Pass token in headers
          },
        }
      );

      

      if (data.success) {
        setDoctors(data.doctors);
        console.log(data.doctors); // Print doctors list in console
      } else {
        toast.error(data.message); // Use error toast for non-success responses
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while fetching doctors.");
    }
  };
  const getAllAppointments=async()=>{
    try {
      const {data}=await axios.get(backendUrl+'/api/admin/appointments',{headers:{Authorization:`Bearer ${adminToken}`}})
      if(data.success){
        setAppointments(data.appointments)
        console.log(data.appointments)
      }else{
        toast(data.message)
      }
    } catch (error) {
      toast(error.message)
    }
  }
  const changeAvailability=async(docId)=>{
    try {
      const {data}=await axios.post(backendUrl+'/api/admin/change-availability',{docId},{
        headers: {
          Authorization: `Bearer ${adminToken}`, // Pass token in headers
        },
        
  
    });
    
      if(data.success){
        toast(data.message)
        getAllDoctors()
      }
      else{
        toast(data.message)
      }
      
    } catch (error) {
      toast(error.message)
      
    }
    
}

  const value = {
    adminToken,
    setAdminToken,
    backendUrl,
    doctors,
    getAllDoctors,
    appointments,setAppointments,
    changeAvailability,getAllAppointments,cancelAppointment,dashData,setDashData,getDashData
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
