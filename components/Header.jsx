import Link from 'next/link'
import BuyMeACoffee from './BuyMeACoffee'
import { useAuth } from '@/context/AuthContext'
import { useState, useEffect } from 'react'


function Header() {
  const { logout, currentUser } = useAuth()
  const [hasPaid, setHasPaid] = useState(false)

  
  const handleLogout = () => {
    logout()
  }



  return (
    <div className="flex flex-row justify-between items-center p-4 lg:mr-5 lg:ml-5">
    <h1 className="text-2xl lg:text-4xl font-bold text-black tracking-tight">CareerHub <span className='text-amber-500'>AI</span> </h1>
    <div className="flex flex-col sm:flex-row gap-4 items-center">
      {currentUser ? (
        <>
          <button className="hover:text-amber-500 text-gray-500 font-bold py-2 px-4 rounded">
            <Link legacyBehavior href={`/`}>
                <a className="">Home</a>
            </Link>
          </button>

          {!currentUser.hasPaid && (
            <button>
              <Link legacyBehavior href={`/payment`}>
                <a className="bg-black hover:bg-amber-600 text-white font-bold py-1 px-3 lg:py-3 lg:px-3 text-sm lg:text-md rounded-3xl">
                  Premium Plan
                </a>
              </Link>
            </button>
          )}

          <button onClick={handleLogout}>
            <a className="bg-black hover:bg-amber-600 text-white font-bold py-1 px-3 lg:py-3 lg:px-3 text-sm lg:text-md rounded-3xl">
              Logout
            </a>
          </button>
          {/* <span className="text-gray-500 text-sm">
              Logged in as {currentUser.email}
            </span> */}
        </>
      ) : (
        <>
          <button className="hover:text-amber-500 text-gray-500 font-bold py-2 px-4 rounded">
            <Link legacyBehavior href={`/`}>
                <a className="">Home</a>
            </Link>
          </button>

          <button>
            <Link legacyBehavior href={`/signup`}>
              <a className="bg-black hover:bg-amber-600 text-white font-bold py-1 px-3 lg:py-3 lg:px-3 text-sm lg:text-md rounded-3xl">
                Get Full Access
              </a>
            </Link>
          </button>

          <button>
            <Link legacyBehavior href={`/login`}>
              <a className="bg-black hover:bg-amber-600 text-white font-bold py-1 px-3 lg:py-3 lg:px-3 text-sm lg:text-md rounded-3xl">
                Login
              </a>
            </Link>
          </button>
    
        </>
      )}
    </div>
  </div>
  )
}

export default Header