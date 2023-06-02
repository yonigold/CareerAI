import Link from 'next/link'
import BuyMeACoffee from './BuyMeACoffee'

function Header() {
  return (
    <div className="flex flex-row justify-between items-center p-4 lg:mr-5 lg:ml-5">
    <h1 className="text-2xl lg:text-4xl font-bold text-black tracking-tight">CareerHub <span className='text-amber-500'>AI</span> </h1>
    <div className="flex gap-4">
        <button className="hover:text-amber-500 text-gray-500 font-bold py-2 px-4 rounded">
        <Link legacyBehavior href={`/`}>
                    <a className="">Home</a>
                </Link>
        </button>
        <button className="bg-black hover:bg-amber-600 text-white font-bold py-1 px-3 lg:py-3 lg:px-3 text-sm lg:text-md rounded-3xl">
          <a href="https://bmc.link/yoni7022">
            Buy me a Pizza 🍕</a>
        </button>


    </div>
</div>
  )
}

export default Header