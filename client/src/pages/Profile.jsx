import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MdOutlineEdit } from "react-icons/md"

import useAuth from '../state/useAuth'
import Avatar from '../assets/images/avatar.jpg'

const Profile = () => {

    const UserData = useAuth((state) => state.UserData)

    const navigate = useNavigate()

    return (
        <div className='flex flex-col gap-2 p-2 md:px-32 w-full h-full bg-secondary-variant'>
            <div className='flex flex-col justify-center items-center gap-2 p-2 py-4 w-full bg-white rounded-2xl'>
                <div className='flex justify-center items-center relative'>
                    <img className='h-32 w-32 rounded-full border-2 border-primary transition-all hover:border-[#111b38]' src={Avatar} alt="" />
                    <button className='primary-btn !rounded-full absolute bottom-2 right-2'><MdOutlineEdit /></button>
                </div>
                <div className='flex justify-center items-center gap-1'>
                    <h1 className='text-xl font-semibold capitalize'>{UserData?.name.firstName} {UserData?.name.secondName}</h1>
                    <button className='primary-btn' onClick={() => navigate('/change-name')}><MdOutlineEdit /></button>
                </div>
                <div className='flex justify-center items-center gap-1'>
                    <h1 className='text-xl font-semibold capitalize'>{UserData?.username}</h1>
                    <button className='primary-btn' onClick={() => navigate('/change-username')}><MdOutlineEdit /></button>
                </div>
                <div className='flex justify-center items-center gap-1'>
                    <button className='primary-btn' onClick={() => navigate('/change-password')}>Change Password</button>
                </div>
            </div>
        </div>
    )
}

export default Profile
