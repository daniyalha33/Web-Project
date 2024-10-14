import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorProfile = () => {
  const { dToken, profile, setProfile, getProfile ,backendUrl } = useContext(DoctorContext);
  const { currency} = useContext(AppContext);
  const [edit,setEdit]=useState(false)
  const updateProfile=async()=>{
    try {
      const updateData={
        address:profile.address,
        fees:profile.fees,
        avialable:profile.avialable
      }
      console.log(updateData)
      console.log(backendUrl)
      const {data}=await axios.post('http://localhost:3000'+'/api/doctor/update-profile',updateData,{
        headers: { Authorization: `Bearer ${dToken}` }
      })
      if(data.success){
        toast(data.message)
      }else{
        toast(data.message)
      }
    } catch (error) {
      toast(error.message)
      
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfile();
    }
  }, [dToken]);

  return profile && (
    <div>
      <div className='flex flex-col gap-4 m-5'>
        <div>
          <img className='bg-primary/80 w-full max-w-64 rounded-lg' src={profile.image} alt="" />
        </div>

        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profile.name}</p>
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            {profile.degree} - {profile.speciality}
            <button className='py-0.5 px-2 border rounded-full text-xs'>{profile.experience}</button>
          </div>
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About</p>
            <p className='text-xs text-gray-600 max-w-[700px] mt-1'>{profile.about}</p>
          </div>
          <p className='text-gray-600 font-medium mt-4'>Fees <span className='text-gray-800'>{currency}{edit?<input type="Number" onChange={(e)=>setProfile(prev=>({...prev,fees:e.target.value}))} value={profile.fees}/>:profile.fees}</span></p>
        </div>

        <div className='flex gap-2 py-2'>
          <p>Address</p>
          <p className='text-xs'>{edit?<input type="text" onChange={(e)=>setProfile(prev=>({...prev,address:{...prev.address,line1:e.target.value}}))} value={profile.address.line1}/>:profile.address.address1}
            <br />
            {edit?<input type="text" onChange={(e)=>setProfile(prev=>({...prev,address:{...prev.address,line2:e.target.value}}))} value={profile.address.line2}/>:profile.address.address2}
          </p>
        </div>

        <div className='flex gap-1 pt-2'>
          <input checked={profile.checked} onChange={()=>edit && setProfile(prev=>({...prev,avialable:!prev.avialable}))} type="checkbox" id="" />
          <label htmlFor="">Available</label>
        </div>

       
        <div className='flex justify-start'>
          {edit?<button onClick={updateProfile} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white'>Save</button>:<button onClick={()=>setEdit(true)} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white'>Edit</button>}
          
        </div>
        </div>
      </div>
   
  );
};

export default DoctorProfile;
