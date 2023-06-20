import React from 'react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function ThankYou() {
    const router = useRouter()
    useEffect(() => {
        setTimeout(() => {
            router.push('/')
        }, 5000)
    }, [])
  return (
    <>
    <div className="flex flex-row justify-between items-center p-4 lg:mr-5 lg:ml-5">
        <h1 className="text-2xl lg:text-4xl font-bold text-black tracking-tight">CareerHub <span className='text-amber-500'>AI</span> </h1>
        <div className="flex gap-4">
            <button className="hover:text-amber-500 text-gray-500 font-bold py-2 px-4 rounded">
                <a href="/">Home</a>
            </button>
        </div>
    </div>
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-6 px-4 sm:px-6 lg:px-4">
        <div className="max-w-md w-full space-y-8 mt-20"> {/* Increased top margin */}
            <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Thank you for your purchase!
                </h2>
            </div>
            <div className="mt-8 flex justify-center">
                <div className="inline-flex rounded-md shadow">
                    <a href="/" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-500 hover:bg-amber-600">
                        Go back to homepage
                    </a>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default ThankYou