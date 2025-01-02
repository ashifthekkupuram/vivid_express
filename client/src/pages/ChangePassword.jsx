import React, { useState } from 'react'

import useChangePassword from '../hooks/useChangePassword'

const ChangeName = () => {

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  const {loading, error, change_password} = useChangePassword()

  const onSubmit = (e) => {
    e.preventDefault()
    change_password(oldPassword, confirmNewPassword)
  }

  const disabled = loading || !oldPassword || !newPassword || !confirmNewPassword || ( newPassword !== confirmNewPassword )

  return (
    <div className='flex justify-center items-center w-full h-full bg-secondary-variant'>
      <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={onSubmit}>
        <div className="mb-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="oldPassword">
            Old Password
          </label>
          <input value={oldPassword} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${error && 'border-error'}`} id="oldPassword" type="password" placeholder="******************" onChange={(e) => setOldPassword(e.target.value)} />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
            New Password
          </label>
          <input value={newPassword} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${error && 'border-error'}`} id="newPassword" type="password" placeholder="******************" onChange={(e) => setNewPassword(e.target.value)} />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmNewPassword">
            Confirm New Password
          </label>
          <input value={confirmNewPassword} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${error && 'border-error'}`} id="confirmNewPassword" type="password" placeholder="******************" onChange={(e) => setConfirmNewPassword(e.target.value)} />
          {error && <p className="text-error text-xs italic">{error}</p>}
          {((newPassword && confirmNewPassword) && newPassword !== confirmNewPassword) && <p className="text-error text-xs italic">Password not mathing</p>}
        </div>
        <div className="flex items-center justify-between gap-1">
          <button disabled={disabled} className="primary-btn" type="submit">
            Change Password
          </button>
          <a className="inline-block align-baseline font-bold text-xs text-primary hover:text-[#111b38]" href="#">
            Back to Profile?
          </a>
        </div>
      </form>
    </div>
  )
}

export default ChangeName
