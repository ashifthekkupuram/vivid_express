import React, { useEffect, useState } from 'react'

import useChangeUsername from '../hooks/useChangeUsername'
import useAuth from '../state/useAuth'

const ChangeUsername = () => {

    const [username, setUsername] = useState('')

    const { loading, error, change_username } = useChangeUsername()

    const UserData = useAuth((state) => state.UserData)

    const onSubmit = (e) => {
        e.preventDefault()
        change_username(username)
    }

    const disabled = loading || !username || (UserData.username === username)

    useEffect(() => {
        setUsername(UserData.username)
    }, [])

    return (
        <div className='flex justify-center items-center w-full h-full bg-secondary-variant'>
            <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={onSubmit}>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input value={username} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${error && 'border-error'}`} id="username" type="text" placeholder="Username..." onChange={(e) => setUsername(e.target.value)} />
                    {error && <p className="text-error text-xs italic">{error}</p>}
                </div>
                <div className="flex items-center justify-between gap-1">
                    <button disabled={disabled} className="primary-btn" type="submit">
                        Change Username
                    </button>
                    <a className="inline-block align-baseline font-bold text-xs text-primary hover:text-[#111b38]" href="#">
                        Back to Profile?
                    </a>
                </div>
            </form>
        </div>
    )
}

export default ChangeUsername
