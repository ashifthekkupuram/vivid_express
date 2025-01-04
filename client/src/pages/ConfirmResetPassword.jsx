import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import useConfirmResetPassword from '../hooks/useConfirmResetPassword'
import api from '../api/axios'
import Spinner from '../components/Spinner'

const ConfirmResetPassword = () => {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const { loading, error, confirm_reset_password } = useConfirmResetPassword()

    const { token } = useParams()

    const navigate = useNavigate()

    const { status, error: queryError } = useQuery({
        queryKey: ['resetPassword', token],
        queryFn: async () => {
            const response = await api.get(`/resetPassword/${token}`)
            return response.data
        }
    })

    const disabled = loading || !password || !confirmPassword

    const onSubmit = (e) => {
        e.preventDefault()
        confirm_reset_password(token, confirmPassword)
    }

    return (
        <div className='flex justify-center items-center w-full h-full bg-secondary-variant'>
            <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={onSubmit}>
                {status === 'loading' ? <Spinner /> : status === 'error' ? <div className='text-xl font-semibold text-error self-center justify-self-center'>{queryError.response?.data?.message || 'Internal Server Error'}</div> :
                    <>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                New Password
                            </label>
                            <input value={password} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error && 'border-error'}`} id="password" type="password" placeholder="******************" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                                Confirm New Password
                            </label>
                            <input value={confirmPassword} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error && 'border-error'}`} id="confirmPassword" type="password" placeholder="******************" onChange={(e) => setConfirmPassword(e.target.value)} />
                            {error && <p className="text-error text-xs italic">{error}</p>}
                            {((password && confirmPassword) && password !== confirmPassword) && <p className="text-error text-xs italic">Passwords not matching</p>}
                        </div>
                        <div className="flex items-center justify-between">
                            <button disabled={disabled} className="primary-btn" type="submit">
                                Send Email
                            </button>
                            {/* <a className="inline-block align-baseline font-bold text-xs text-primary hover:text-[#111b38]" href="#" onClick={() => navigate('/login')}>
                        Login?
                    </a> */}
                        </div>
                    </>
                }
            </form>
        </div>
    )
}

export default ConfirmResetPassword