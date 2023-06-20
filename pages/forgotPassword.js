import { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'

function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const { resetPassword } = useAuth()
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setError('')
            setMessage('')
            await resetPassword(email)
            setMessage('Check your inbox for further instructions')
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <>
    <div className="flex flex-row justify-between items-center p-4 lg:mr-5 lg:ml-5">
    <h1 className="text-2xl lg:text-4xl font-bold text-black tracking-tight">CareerHub <span className='text-amber-500'>AI</span> </h1>
    <div className="flex gap-4">
        <button className="hover:text-amber-500 text-gray-500 font-bold py-2 px-4 rounded">
        <Link legacyBehavior href={`/`}>
                    <a className="">Home</a>
                </Link>
        </button>

    </div>
</div>
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-6 px-4 sm:px-6 lg:px-4">
    <div className="max-w-md w-full space-y-8">
        <div>
            <h2 className="mt-3 text-center text-3xl font-extrabold text-gray-900">
                Forgot Password
            </h2>
            {message && <p className='text-green-500 text-center'>{message}</p>}
            {error && <p className='text-red-500 text-center'>{error}</p>}
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
                <div>
                    <label htmlFor="email-address" className="sr-only">
                        Email address
                    </label>
                    <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>
            <div>
                <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Reset Password
                </button>
            </div>
        </form>
    </div>
</div>
</>
  )
}

export default ForgotPassword