import React from 'react'
import Link from 'next/link'
import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useRouter } from "next/router"
function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { login } = useAuth()
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setError('')
            await login(email, password)
            router.push('/')
        } catch (error) {
          switch (error.code) {
            case 'auth/invalid-email':
              setError('Invalid email address format.')
              break;
            case 'auth/user-disabled':
              setError('This account has been disabled.')
              break;
            case 'auth/user-not-found':
              setError('No user found with this email address.')
              break;
            case 'auth/wrong-password':
              setError('Invalid password.')
              break;
            default:
              setError('An error occurred. Please try again.')
            
        }

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
        <div className="max-w-md w-full space-y-8 mt-20"> {/* Increased top margin */}
            <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Login
                </h2>
            </div>
            <form className="mt-8 space-y-8" onSubmit={handleSubmit}> {/* Increased gap between inputs */}
                <input type="hidden" name="remember" value="true" />
                <div className="rounded-md shadow-sm space-y-4"> {/* Removed -space-y-px, added space-y-4 */}
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                
              />
            </div>
          </div>
          {error && <p className='text-red-500 text-center'>{error}</p>}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-2 text-center">
                <Link legacyBehavior href={`/signup`}>
                    <a className="font-medium text-black hover:text-amber-500">
                        Don&apos;t have an account? Sign up
                    </a>
                </Link>
            </div>
            <div className="mt-2 text-center">
                <Link legacyBehavior href={`/forgotPassword`}>
                    <a className="font-medium text-black hover:text-amber-500">
                        Forgot Password?
                    </a>
                </Link>
            </div>
        </div>
    </div>
    </>
  )
}

export default Login