import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdOutlineEdit } from "react-icons/md"

import useAuth from '../state/useAuth'
import Avatar from '../assets/images/avatar.jpg'
import useChangeProfile from '../hooks/useChangeProfile'
import useRemoveProfile from '../hooks/useRemoveProfile'

const Profile = () => {

    const UserData = useAuth((state) => state.UserData)

    const [ loading, change_profile ] = useChangeProfile()
    const [ removeLoading, remove_profile ] = useRemoveProfile()

    const ImageField = useRef(null)

    const navigate = useNavigate()

    const onProfileChange = (e) => {
        const formData = new FormData()
        formData.append('profile', e.target.files[0])
        change_profile(formData)
    }

    const onRemoveProfile = () => {
        remove_profile()
    }

    const ChangeProfileisabled = loading
    const RemoveProfileisabled = removeLoading

    return (
        <div className='flex flex-col gap-2 p-2 md:px-32 w-full h-full bg-secondary-variant'>
            <div className='flex flex-col justify-center items-center gap-2 p-2 py-4 w-full bg-white rounded-2xl'>
                <div className='flex justify-center items-center relative'>
                    <img className='h-32 w-32 rounded-full border-2 border-primary transition-all hover:border-[#111b38]' src={UserData.profile ? `${import.meta.env.VITE_PROFILE_URL}/${UserData.profile}` : Avatar} alt="" />
                    <input ref={ImageField} className='hidden' type="file" onChange={onProfileChange} />
                    <button disabled={ChangeProfileisabled} className='primary-btn !rounded-full absolute bottom-2 right-2' onClick={() => ImageField.current.click()}><MdOutlineEdit /></button>
                </div>
                { UserData.profile && <div className='flex justify-center items-center'>
                    <button disabled={RemoveProfileisabled} className='primary-btn !bg-error' onClick={onRemoveProfile}>Remove Profile</button>
                </div> }
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
