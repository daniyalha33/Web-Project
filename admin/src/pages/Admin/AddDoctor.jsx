import React,{useContext, useState} from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'


const AddDoctor = () => {
  const {backendUrl,adminToken}=useContext(AdminContext)
  const [docImg,setDocImg]=useState(false)
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [education,setEducation]=useState('')
  const [speciality,setSpeciality]=useState('General Physician')
  const [address1,setAddress1]=useState('')
  const [address2,setAddress2]=useState('')
  const [fees,setFees]=useState('')
  const [about,setAbout]=useState('')
  const [experience,setExperience]=useState('1 Year')
  const [degree,setDegree]=useState('')
  const submitHandler=async(e)=>{
    e.preventDefault()
    try {
      if(!docImg){
        return toast.error('Image not selectd')
      }
      const formData=new FormData()
      formData.append('image',docImg)
      formData.append('name',name)
      formData.append('email',email)
      formData.append('password',password)
      formData.append('experience',experience)
      formData.append('speciality',speciality)
      formData.append('fees',Number(fees))
      formData.append('education',education)
      formData.append('about',about)
      formData.append('degree',degree)
      formData.append('address',JSON.stringify({'address1':address1,'address2':address2}))
  
  
    
    
    const {data}=await axios.post(backendUrl+'/api/admin/add-doctor',formData,{headers:{Authorization:`Bearer ${adminToken}`},})
    if(data.success){
      toast.success(data.message)
      setDocImg(false)
      setName('')
      setEmail('')
      setPassword('')
      setExperience('1 Year')
      setDegree('')
      setSpeciality('General Physician')
      setAbout('')
      setAddress1('')
      setAddress2('')
      setEducation('')
      setFees('')
    }else{
      toast.error(data.message)
    }
    } catch (error) {
      toast.error(error.message)
      
      console.log(error)
    }
    


  }

  return (
    <form className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium'>Add Doctor</p>
      <div className='bg-white px-8 py-8 w-full rounded max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>

          <label htmlFor="doc-id">
            <img className='w-16 rounded-full bg-gray-100 cursor-pointer' src={docImg?URL.createObjectURL(docImg):assets.upload_area} alt="" />
            
          </label>

          <input onChange={(e)=>setDocImg(e.target.files[0])} type="file" hidden id='doc-id' />
          <p>Upload doctor picture</p>
        </div>
        <div >
          <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Your Name</p>
              <input onChange={(e)=>setName(e.target.value)} value={name} className='border rounded px-3 py-2' type="text" placeholder='Name' name="" id="" required />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Email</p>
              <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border rounded px-3 py-2' type="text" placeholder='Email' name="" id="" required />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Password</p>
              <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border rounded px-3 py-2' type="text" placeholder='Doctor Password' name="" id="" required />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Experience</p>
              <select onChange={(e)=>setExperience(e.target.value)} value={experience} className='border rounded px-3 py-2' name="" id="" >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Fee</p>
              <input onChange={(e)=>setFees(e.target.value)} value={fees} className='border rounded px-3 py-2' type="number" placeholder='Doctor Fee' required />
            </div>
          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Speciality</p>
              <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality} className='border rounded px-3 py-2' name="" id="">
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>

              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Education</p>
              <input  onChange={(e)=>setEducation(e.target.value)} value={education} className='border rounded px-3 py-2' type="text" placeholder='Education' required />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Degree</p>
              <input  onChange={(e)=>setDegree(e.target.value)} value={degree} className='border rounded px-3 py-2' type="text" placeholder='Education' required />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Address</p>
              <input onChange={(e)=>setAddress1(e.target.value)} value={address1} className='border rounded px-3 py-2' type="text" placeholder='Address 1' required />
              <input onChange={(e)=>setAddress2(e.target.value)} value={address2} className='border rounded px-3 py-2' type="text" placeholder='Address 2' required />
            </div>
          </div>
          </div>
          <div >
            <p className='mt-4 mb-2'>About Doctor</p>
            <textarea onChange={(e)=>setAbout(e.target.value)} value={about} className='border rounded px-3 py-2 w-full' rows={5} placeholder='Write about doctor'></textarea>
          </div>
          <button onClick={submitHandler} type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-full'>Add Doctor</button>

        </div>
      </div>


    </form>
  )
}

export default AddDoctor
