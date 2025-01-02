import React, { useState } from 'react'

import useLogin from '../hooks/useLogin'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { loading, error, login } = useLogin()

    const disabled = loading || !email || !password

    const onSubmit = (e) => {
        e.preventDefault()
        login(email, password)
    }

    return (
        <div className='flex justify-center items-center w-full h-full bg-secondary-variant'>
            <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={onSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input value={email} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error && 'border-error'}`} id="email" type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input value={password} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${error && 'border-error'}`} id="password" type="password" placeholder="******************" onChange={(e) => setPassword(e.target.value)} />
                    {error && <p className="text-error text-xs italic">{error}</p>}
                </div>
                <div className="flex items-center justify-between">
                    <button disabled={disabled} className="primary-btn" type="submit">
                        Login
                    </button>
                    <a className="inline-block align-baseline font-bold text-xs text-primary hover:text-[#111b38]" href="#">
                        Forgot password?
                    </a>
                </div>
            </form>
        </div>
    )
}

export default Login
