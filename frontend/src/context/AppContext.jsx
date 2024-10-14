import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

 export const AppContext=createContext()
 const AppContextProvider=(props)=>{
    const [doctors,setDoctors]=useState([])
    const currencySymbol='$'
    const [userData,setUserData]=useState(false)
    const [token, setToken] = useState(
        localStorage.getItem("token") ? localStorage.getItem("token") : ""
      );
    const backendUrl = import.meta.env.VITE_BACKEND_URI;
    const getDoctorsData=async()=>{
        try {
            const {data}=await axios.post('http://localhost:3000'+'/api/doctor/doctor-list')
            if(data.success){
            setDoctors(data.doctors)
            }
            else{
                toast(data.message)
            }
        }
       
        catch (error) {
            toast(error.message)
            
        }
    }
    const loadUserData=async()=>{
        try {
            const {data}=await axios.get('http://localhost:3000'+'/api/auth/get-profile', {
                headers: {
                  Authorization: `Bearer ${token}`, // Pass token in headers
                },
              })
              if(data.success){
                setUserData(data.userData)
                console.log(data.dob)

              }else{
                toast(error.message)
              }
            
        } catch (error) {
            toast(error.message)
        }

    }
    useEffect(()=>{
        if(token){
            loadUserData()
            
        }else{
            setUserData(false)
        }
    },[token])
       
    const value={
        doctors,currencySymbol,getDoctorsData,setDoctors,token,setToken,userData,setUserData,loadUserData
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

 }
 export default AppContextProvider