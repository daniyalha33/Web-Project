import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const { userData, setUserData, token, loadUserData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(true);
  const [image, setImage] = useState(false);

  const updateUserProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('email', userData.email);
      formData.append('birthday', userData.birthday);
      formData.append('phone', userData.phone);
      formData.append('address', userData.address); // Sending address line1 only for now
      formData.append('gender', userData.gender);
      image && formData.append('image', image);
      
      const { data } = await axios.post('http://localhost:3000/api/auth/update-profile', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        toast(data.message);
        loadUserData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast(data.message);
      }
    } catch (error) {
      toast(error.message);
    }
  };

  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      {isEdit ? (
        <label htmlFor="image">
          <img className="w-36 rounded opacity-75" src={image ? URL.createObjectURL(image) : userData.image} alt="" />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
        </label>
      ) : (
        <img className="w-36 rounded" src={userData.image} alt="" />
      )}

      {isEdit ? (
        <input
          className="max-w-60 bg-gray-50 mt-4 text-3xl font-medium"
          type="text"
          value={userData.name}
          onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
        />
      ) : (
        <p className="text-3xl font-medium text-neutral-800 mt-4">{userData.name}</p>
      )}
      <hr />
      <div>
        <p className="text-neutral-500 mt-3 underline">Contact Information</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700 ">
          <p className="font-medium">Email Id:</p>
          {isEdit ? (
            <input
              className="text-gray -500"
              type="email"
              value={userData.email}
              onChange={(e) => setUserData((prev) => ({ ...prev, email: e.target.value }))}
            />
          ) : (
            <p className="text-blue-500">{userData.email}</p>
          )}

          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              className="text-gray-500 max-w-52"
              type="text"
              value={userData.phone}
              onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
            />
          ) : (
            <p className="text-blue-500">{userData.phone}</p>
          )}

          <p>Address:</p>
          {isEdit ? (
            <div>
              <input
                className="text-gray-400"
                type="text"
                value={userData.address}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address:e.target.value,
                  }))
                }
              />
            </div>
          ) : (
            <p className="text-blue-500">
              {userData.address}
              
            </p>
          )}
        </div>
      </div>

      <div>
        <p className="text-neutral-500 underline mt-3">Basic Information</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              className="text-gray-500"
              onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
              value={userData.gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-blue-500">{userData.gender}</p>
          )}
          <p className="font-medium">Birthday:</p>
          {isEdit ? (
            <input
              className="text-gray-500"
              type="date"
              value={userData.birthday}
              onChange={(e) => setUserData((prev) => ({ ...prev, birthday: e.target.value }))}
            />
          ) : (
            <p className="text-blue-500">{userData.birthday}</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        {isEdit ? (
          <button
            className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-500"
            onClick={updateUserProfile}
          >
            Save Information
          </button>
        ) : (
          <button
            className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-500"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
