import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Home() {
  return (
   <>
   <div className=''>


    <Header />


<div className="text-center pt-10">
    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black tracking-tighter mb-2 ">Upgrade Your Career With <span className='text-amber-500 underline'>The Power Of AI</span> </h1>
    <h2 className="text-md md:text-xl lg:text-2xl font-semibold text-black opacity-70 text-center">
        Take your career to the next level with our free GPT-powered tools. 
        <br />
        Find the job you love, get the salary you deserve, and go further in your career.
        
    </h2>
</div>

<div className="flex flex-col md:flex-row justify-around items-center p-4 md:space-y-0 space-y-4 md:space-x-4 mt-10 lg:m-5">
    {[{page: 'CareerPath', subtitle: 'let AI help you uncover career paths you might excel in based on your intrests.', title: 'Discover Career Paths', img: '/careerpath.png'}, 
      {page: 'CareerAdvise', subtitle: 'Share your career goals and get a personalized advice to propel you forward.', title: 'Career Advise', img: '/careeradvise.png'}, 
      {page: 'Salary', subtitle: 'Use AI to estimate your market value and how much you worth.', title: 'Know your worth', img: '/salary.png'}].map((i, index) => (
        <div key={index} className="border-4 border-white rounded-lg p-12 w-full md:w-97 h-auto text-center shadow-2xl transform transition-all hover:scale-110">
            <h3 className="text-3xl font-bold text-black mb-4">{i.title}</h3>
            <p className="text-black mb-6">{i.subtitle}</p>
            <img className="w-18 h-18 rounded-full mx-auto mb-6 border-3 border-black" alt="Placeholder"
            src={i.img}
            />
            <div className="flex justify-center">
                <Link legacyBehavior href={`/${i.page}`}>
                    <a className="bg-black text-white rounded-3xl px-6 py-3 hover:bg-amber-600 hover:text-white transition-colors block text-center font-semibold w-1/2">Try now</a>
                </Link>
            </div>
        </div>
    ))}
</div>


<div className="flex flex-col md:flex-row justify-center items-center p-4 md:space-y-0 space-y-4 md:space-x-4 mt-10">
    {['Resume Builder', 'Career Discovery'].map(i => (
        <div key={i} className="border-4 border-white rounded-lg p-12 w-3/5 md:w-2/5 h-auto text-center shadow-2xl transform transition-all hover:scale-110">
            <h3 className="text-3xl font-bold text-black mb-4 text-center">{i}</h3>
            <p className="text-black text-xl mb-6">Coming Soon</p>
            {/* <div className="flex justify-center">
                <Link legacyBehavior href={`/${i}`}>
                    <a className="bg-black text-white rounded-3xl px-6 py-3 hover:bg-amber-600 hover:text-white transition-colors block text-center font-semibold w-1/2">{i}</a>
                </Link>
            </div> */}
        </div>
    ))}
</div>


</div>

<Footer />





   </>
  )
}


// apply this to box div: style={{height: "calc(100vh - 200px)"}}