import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Head from 'next/head'
import { useAuth } from '@/context/AuthContext'
import Image from 'next/image'

export default function Home() {
    const { currentUser } = useAuth();
  return (
   <>
    <Head>
        <title>CareerHub AI | Home</title>
        <meta name="description" content="CareerHub AI is a free AI-powered career discovery platform that helps you find the right career path, get the salary you deserve, and go further in your career." />
        <meta name="keywords" content="CareerHub AI, CareerHubAI, CareerHub, Career Hub, CareerHub.ai, CareerHubAI.com, CareerHub AI.com." />
        <meta property="og:title" content="CareerHub AI | Home" />
        <meta property="og:description" content="CareerHub AI is a free AI-powered career discovery platform that helps you find the right career path, get the salary you deserve, and go further in your career." />
        <meta property="og:image" content="https://careerhub.ai/og-image.png" />
        <meta property="og:url" content="https://careerhub-ai.com/" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
        
    </Head>




   <div className=''>


    <Header />


<div className="text-center pt-10">
    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black tracking-tighter mb-2 ">Upgrade Your Career With <span className='text-amber-500 underline'>The Power Of AI</span> </h1>
    <h2 className="text-sm md:text-xl lg:text-2xl font-semibold text-black opacity-70 text-center">
        Take your career to the next level with our advanced GPT-powered tools. 
        <br />
        We offer a wide range of tools to help you achieve your career goals.
        <br />
         Discover your career path, get a personalized career advice, know your market value, get you cover letter and prepare for your interview. 

        {/* Find the job you love, get the salary you deserve, and go further in your career.
        We offer a wide range of tools to help you achieve your career goals */}
        
    </h2>

    <a 
      href="https://www.producthunt.com/posts/careerhub-ai?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-careerhub&#0045;ai" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      <Image
        src={"https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=398003&theme=light"}
        alt="CareerHub&#0032;AI - One&#0045;stop&#0032;platform&#0032;for&#0032;your&#0032;career | Product Hunt" 
        style={{width: '250px', height: '54px'}} 
        width={350}
        height={104}
        className='mx-auto mt-10'
      />
    </a></div>

<div className="flex flex-col md:flex-row justify-around items-center p-1 md:space-y-0 space-y-4 md:space-x-4 mt-10 lg:m-5">
    {[{page: 'CareerPath', subtitle: 'let AI help you uncover career paths you might excel in based on your intrests.', title: 'Discover Career Paths', img: '/careerpath.png'}, 
    {page: 'Whydoyouwanttoworkhere', subtitle: 'Get a personalized answer to the most common job application and intervieq question', title: 'Why doy you want to work here?', img: '/whydopage.png'}, 
    {page: 'Salary', subtitle: 'Use AI to estimate your market value and how much you worth.', title: 'Know your worth', img: '/salary.png'}].map((i, index) => (
        <div key={index} className="border-4 border-white rounded-lg p-6 w-full md:w-87 h-auto text-center shadow-2xl border-2 border-black transition-colors duration-500 ease-in-out hover:border-black">
            <h3 className="text-2xl font-bold text-black mb-4">{i.title}</h3>
            <p className="text-black mb-6">{i.subtitle}</p>
            <Image className="w-17 h-17 rounded-full mx-auto mb-6 border-3 border-black" alt="Placeholder"
            src={i.img} width={100} height={100}
            />
            <div className="flex justify-center">
                <Link legacyBehavior href={`/${i.page}`}>
                    <a className="bg-black text-white rounded-3xl px-6 py-3 hover:bg-amber-600 hover:text-white transition-colors block text-center font-semibold w-1/2">Try now</a>
                </Link>
            </div>
        </div>
    ))}
</div>


<div className="flex flex-col md:flex-row justify-center items-center p-4 md:space-y-0 space-y-4 md:space-x-4">
    {[{page: 'coverLetter', subtitle: 'Get a personalized professional cover letter for your job application.', title: 'Cover Letter writer', img: '/coverpic.png'},
    {page: 'interview', subtitle: 'Get a personalized interview questions and answers for your job interview.', title: 'Interview prep', img: '/interview.png'},
    {page: 'CareerAdvise', subtitle: 'Share your career goals and get a personalized advice to propel you forward.', title: 'Career Advise', img: '/careeradvise.png'}, 
    {page: 'linkedin', subtitle: 'Get professional tailor made Linkedin posts to impress and grow your network', title: 'Linkedin Posts Generator', img: '/linkedin.png'}  
]
    .map((i, index) => (
        <div key={index} className="border-4 border-white rounded-lg p-8 w-full md:w-87 h-auto text-center shadow-2xl border-2 border-black transition-colors duration-500 ease-in-out hover:border-black">
            <h3 className="text-2xl font-bold text-black mb-4">{i.title}</h3>
            {/* {
                    // Display 'premium feature' badge if the user hasn't paid
                    !(currentUser && currentUser.hasPaid) && 
                    <span className="bg-red-500 text-white text-xs py-0.5 px-2 rounded-lg ml-2">Premium</span>
                } */}
            <p className="text-black mb-6">{i.subtitle}</p>
            <Image className="w-17 h-17 rounded-full mx-auto mb-6 border-3 border-black" alt="Placeholder"
            src={i.img} width={102} height={102}
            />
            <div className="flex justify-center">
                <Link legacyBehavior href={`/${i.page}`}>
                <a className="bg-black text-white rounded-3xl px-6 py-3 hover:bg-amber-600 hover:text-white transition-colors block text-center font-semibold w-1/2">{currentUser && currentUser.hasPaid ? 'Try now' : 'Get access'}</a>
                </Link>
                </div>
                </div>
    ))}
</div>

{/* <div className="flex flex-col md:flex-row justify-center items-center p-4 md:space-y-0 space-y-4 md:space-x-4 ">
    {[{page: 'coverLetter', subtitle: 'Get a personalized professional cover letter for your job application.', title: 'Cover Letter writer', img: '/coverpic.png'},
    {page: 'interview', subtitle: 'Get a personalized interview questions and answers for your job interview.', title: 'Interview prep', img: '/interview.png'},
    {page: 'Whydoyouwanttoworkhere', subtitle: 'Why do you want to work here?', title: 'Why doy you want to work here?', img: '/interview.png'}  
]
    .map((i, index) => (
        <div key={index} className="border-4 border-white rounded-lg p-12 w-full md:w-97 h-auto text-center shadow-2xl border-2 border-black transition-colors duration-500 ease-in-out hover:border-black">
            <h3 className="text-3xl font-bold text-black mb-4">{i.title}</h3>
            <p className="text-black mb-6">{i.subtitle}</p>
            <Image className="w-18 h-18 rounded-full mx-auto mb-6 border-3 border-black" alt="Placeholder"
            src={i.img} width={102} height={102}
            />
            <div className="flex justify-center">
                <Link legacyBehavior href={`/${i.page}`}>
                <a className="bg-black text-white rounded-3xl px-6 py-3 hover:bg-amber-600 hover:text-white transition-colors block text-center font-semibold w-1/2">{currentUser && currentUser.hasPaid ? 'Try now' : 'Get access'}</a>
                </Link>
                </div>
                </div>
    ))}
</div> */}


</div>

<Footer />





   </>
  )
}


// apply this to box div: style={{height: "calc(100vh - 200px)"}}