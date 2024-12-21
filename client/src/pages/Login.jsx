import React, { useState } from 'react'

import useLogin from '../hooks/useLogin'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loading, error, login] = useLogin()

    return (
        <div className='flex flex-col'>
            { loading && <div>Loading...</div>}
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            { error && <div>{error}</div>}
            <button disabled={loading} onClick={() => login(email, password)}>login</button>
        </div>
    )
}

export default Login
