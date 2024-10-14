import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointments = () => {
  const { dToken, appointments, getDoctorAppointments,completeAppointment,cancelAppointment } = useContext(DoctorContext);
  
  useEffect(() => {
    if (dToken) {
      getDoctorAppointments();
    }
  }, [dToken]);

  const { calculateAge, currency } = useContext(AppContext);

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='font-medium text-lg mb-3'>All Appointments</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p className='text-center'>Payment</p>
          <p className='text-center'>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {appointments.reverse().map((item, index) => (
          <div
            className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'
            key={index}
          >
            <p className='max-sm:hidden'>{index + 1}</p>
            <div className='flex items-center gap-2'>
              <img
                className='w-8 rounded-full bg-gray-300'
                src={item.userData.image || '/default-avatar.png'}
                alt=''
              />
              <p>{item.userData.name}</p>
            </div>

            {/* Payment Column */}
            <div className='text-xs inline border border-primary px-2 py-1 rounded-full text-center'>
              <p>{item.payment ? 'ONLINE' : 'CASH'}</p>
            </div>

            {/* Age Column */}
            <p className='text-center'>
              {calculateAge(item.userData.birthday)}
            </p>

            <p>{item.slotTime}</p>
            <p>{currency}{item.amount}</p>
            {item.cancelled?<p className='text-red-400 text-xs font-medium'>
              Cancelled
            </p>:item.isCompleted?<p className='text-green-400 text-xs font-medium'>
              Completed
            </p>:<div className='flex gap-2'>
              <img onClick={()=>cancelAppointment(item._id)}
                className='w-10 cursor-pointer'
                src={assets.cancel_icon}
                alt='Cancel'
              />
              <img onClick={()=>completeAppointment(item._id)}
                className='w-10 cursor-pointer'
                src={assets.tick_icon}
                alt='Approve'
              />
            </div>}
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
