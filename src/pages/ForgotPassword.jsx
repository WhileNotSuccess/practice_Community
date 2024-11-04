import React, { useState } from 'react'
import { useAuth } from '../hooks/auth'

const ForgotPassword = () => {
  const { forgotPassword } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/',
})

const [email, setEmail] = useState('')
const [errors, setErrors] = useState([])
const [status, setStatus] = useState(null)

const submitForm = event => {
    event.preventDefault()

    forgotPassword({ email, setErrors, setStatus })
}

return (
    <>
        <div className="mb-4 text-sm text-gray-600">
            Forgot your password? No problem. Just let us know your email
            address and we will email you a password reset link that
            will allow you to choose a new one.
        </div>

        <form onSubmit={submitForm}>
            {/* Email Address */}
            <div>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    className="block mt-1 w-full"
                    onChange={event => setEmail(event.target.value)}
                    required
                    autoFocus
                />

             
            </div>

            <div className="flex items-center justify-end mt-4">
                <button>Email Password Reset Link</button>
            </div>
        </form>
    </>
)
}

export default ForgotPassword