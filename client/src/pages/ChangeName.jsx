import React, { useEffect, useState } from 'react'

import useChangeName from '../hooks/useChangeName'
import useAuth from '../state/useAuth'

const ChangeName = () => {

  const [firstName, setFirstName] = useState('')
  const [secondName, setSecondName] = useState('')

  const [loading, error, change_name] = useChangeName()

  const UserData = useAuth((state) => state.UserData)

  const onSubmit = (e) => {
    e.preventDefault()
    change_name(firstName, secondName)
  }

  const disabled = loading || !firstName || !secondName || (UserData.name.firstName === firstName && UserData.name.secondName === secondName)

  useEffect(() => {
    setFirstName(UserData.name.firstName)
    setSecondName(UserData.name.secondName)
  }, [])

  return (
    <div className='flex justify-center items-center w-full h-full bg-secondary-variant'>
      <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={onSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
            First Name
          </label>
          <input value={firstName} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${error && 'border-error'}`} id="firstName" type="text" placeholder="First Name..." onChange={(e) => setFirstName(e.target.value)} />
          {error && <p className="text-error text-xs italic">{error}</p>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="secondName">
            SecondName
          </label>
          <input value={secondName} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${error && 'border-error'}`} id="secondName" type="text" placeholder="Second Name..." onChange={(e) => setSecondName(e.target.value)} />
          {error && <p className="text-error text-xs italic">{error}</p>}
        </div>
        <div className="flex items-center justify-between gap-1">
          <button disabled={disabled} className="primary-btn" type="submit">
            Change Name
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
