import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useResetPassword from '../hooks/useResetPassword'

const ResetPassword = () => {

    const [email, setEmail] = useState('')

    const { loading, error, reset_password } = useResetPassword()

    const navigate = useNavigate()

    const disabled = loading || !email

    const onSubmit = (e) => {
        e.preventDefault()
        reset_password(email)
    }

    return (
        <div className='flex justify-center items-center w-full h-full bg-secondary-variant'>
            <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={onSubmit}>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input value={email} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error && 'border-error'}`} id="email" type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                    {error && <p className="text-error text-xs italic">{error}</p>}
                </div>
                <div className="flex items-center justify-between">
                    <button disabled={disabled} className="primary-btn" type="submit">
                        Send Email
                    </button>
                    <a className="inline-block align-baseline font-bold text-xs text-primary hover:text-[#111b38]" href="#" onClick={() => navigate('/login')}>
                        Login?
                    </a>
                </div>
            </form>
        </div>
    )
}

export default ResetPassword