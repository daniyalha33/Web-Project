import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const DoctorDashboard = () => {
  const {dToken,dashData,setDashData,getDashboard}=useContext(DoctorContext)
  const {currency}=useContext(AppContext)
  useEffect(()=>{
    if(dToken){
      getDashboard()
    }
  },[dToken])
  return (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'>
      <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
        <img className='w-14' src={assets.earning_icon} alt="" />
        <div>
          <p className='text-xl font-semibold text-gray-600'>{currency}{dashData.earnings}</p>
          <p>Earnings</p>
        </div>
      </div>
      <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
        <img className='w-14' src={assets.appointments_icon} alt="" />
        <div>
          <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
          <p>Appointments</p>
        </div>
      </div>
      <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
        <img className='w-14' src={assets.patients_icon} alt="" />
        <div>
          <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
          <p>Patients</p>
        </div>
      </div>
      </div>
      <div className='bg-white'>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Bookings</p>
        </div>
        <div>
        {dashData?.latestAppointments?.length > 0 ? (
            dashData.latestAppointments.map((item, index) => (
              <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
                <img className='w-10 rounded-full' src={item.userData.image} alt="" />
                <div className='flex-1 text-sm'>
                  <p className='text-gray-800 font-medium'>{item.userData.name}</p>
                  <p className='text-gray-600'>{item.slotTime}</p>
                </div>
                {item.cancelled ? (
                  <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                ) : item.isCompleted ? (
                  <p className='text-green-400 text-xs font-medium'>Completed</p>
                ) : (
                  <div className='flex gap-2'>
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className='w-10 cursor-pointer'
                      src={assets.cancel_icon}
                      alt='Cancel'
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      className='w-10 cursor-pointer'
                      src={assets.tick_icon}
                      alt='Approve'
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className='text-center py-4'>No latest appointments available.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard
