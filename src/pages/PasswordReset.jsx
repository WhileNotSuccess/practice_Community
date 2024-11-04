import React, { useState, useEffect } from 'react'
import { useAuth } from '../hooks/auth'
import { useParams } from 'react-router-dom'
const PasswordReset = () => {
  const params = useParams()

    const { resetPassword } = useAuth({ middleware: 'guest' })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const submitForm = event => {
        event.preventDefault()

        resetPassword({
            email,
            password,
            password_confirmation: passwordConfirmation,
            setErrors,
            setStatus,
        })
    }

    useEffect(() => {
        setEmail(params.email)
      }, [params.email])

    return (
        <>
            <form onSubmit={submitForm}>
                {/* Email Address */}
                <div>
                    <label htmlFor="email">Email</label>

                    <input
                        id="email"
                        type="email"
                        value={email}
                        className="block mt-1 w-full"
                        onChange={event => setEmail(event.target.value)}
                        required
                        autoFocus
                    />
                </div>

                {/* Password */}
                <div className="mt-4">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        className="block mt-1 w-full"
                        onChange={event => setPassword(event.target.value)}
                        required
                    />

                </div>

                {/* Confirm Password */}
                <div className="mt-4">
                    <label htmlFor="passwordConfirmation">
                        Confirm Password
                    </label>

                    <input
                        id="passwordConfirmation"
                        type="password"
                        value={passwordConfirmation}
                        className="block mt-1 w-full"
                        onChange={event =>
                            setPasswordConfirmation(event.target.value)
                        }
                        required
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <button>Reset Password</button>
                </div>
            </form>
        </>
    )
}

export default PasswordReset