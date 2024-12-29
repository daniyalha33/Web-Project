import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URI;
  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );
  const [appointments, setAppointments] = useState([]);
  const [dashData,setDashData]=useState(false)
  const [profile,setProfile]=useState(false)

  const getDoctorAppointments = async () => {
    try {
      console.log("Backend URL:", backendUrl);
      const { data } = await axios.get(backendUrl + '/api/doctor/appointments', {
        headers: { Authorization: `Bearer ${dToken}` }
      });
      if (data.success) {
        setAppointments(data.appointments);
        console.log("Appointments fetched:", data.appointments); // Ensure this logs correct data
      } else {
        toast(data.message);
      }
    } catch (error) {
      toast(error.message);
    }
  };
  const getProfile=async()=>{
    try {
        const {data}=await axios.get(backendUrl+'/api/doctor/profile', {
            headers: { Authorization: `Bearer ${dToken}` }
          })
          if(data.success){
            setProfile(data.docData)
          }else{
            toast(data.message)
          }
    } catch (error) {
        toast(data.message)
    }
  }
  const getDashboard=async()=>{
    try {
        const {data}=await axios.get(backendUrl+'/api/doctor/docDashboard',{
            headers: { Authorization: `Bearer ${dToken}` }
          })
          if(data.success){
            setDashData(data.dashData)
            console.log(data.dashData)
          }else{
            toast(data.message)
          }

        } catch (error) {
        toast(error.message)
    }
  }
  const completeAppointment=async(appointmentId)=>{
    try {
        const {data}=await axios.post(backendUrl+'/api/doctor/complete-appointment',{appointmentId}, {
            headers: { Authorization: `Bearer ${dToken}` }
          })
          if(data.success){
            toast(data.message)
            getDoctorAppointments()
          }else{
            toast(data.message)
          }
    } catch (error) {
        toast(error.message);
    }
  }
  const cancelAppointment=async(appointmentId)=>{
    try {
        const {data}=await axios.post(backendUrl+'/api/doctor/cancel-appointment',{appointmentId}, {
            headers: { Authorization: `Bearer ${dToken}` }
          })
          if(data.success){
            toast(data.message)
            getDoctorAppointments()
          }else{
            toast(data.message)
          }
    } catch (error) {
        toast(error.message);
    }
  }


  const value = {
    dToken, setDToken, appointments, getDoctorAppointments,completeAppointment,cancelAppointment,dashData,setDashData,getDashboard,getProfile,profile,setProfile
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
