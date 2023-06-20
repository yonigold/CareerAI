import React from 'react';
import { useState } from 'react'
import axios from 'axios'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WithPaidUser from '@/components/WithPaidUser'
import jsPDF from 'jspdf';

function CoverLetter() {
  const [name, setName] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [writingStyle, setWritingStyle] = useState('')
  const [aboutMe, setAboutMe] = useState('')
  const [response, setResponse] = useState()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    setResponse([])
    setApiError('')

    // form validation
    let errorsFound = {}
    if (!name.trim()) errorsFound.name = 'Field is required'
    if (!jobTitle.trim()) errorsFound.jobTitle = 'Field is required'
    if (!companyName.trim()) errorsFound.companyName = 'Field is required'
    if (!jobDescription.trim()) errorsFound.jobDescription = 'Field is required'
    if (!writingStyle.trim()) errorsFound.writingStyle = 'Field is required'
    if (!aboutMe.trim()) errorsFound.aboutMe = 'Field is required'

    if (Object.keys(errorsFound).length > 0) {
      setErrors(errorsFound)
      // Set timeout to clear error messages after 5 seconds (5000 milliseconds)
      setTimeout(() => {
        setErrors({})
      }, 5000)
      return
    }

    try {
      setLoading(true)
      const { data } = await axios.post('/api/coverLetter', {
        name,
        jobTitle,
        companyName,
        jobDescription,
        writingStyle,
        aboutMe,
      })
      setLoading(false)
      // console.log(data.response);
      const coverLetters = data.response
      setResponse(coverLetters)
    } catch (error) {
      console.log(error);
      setApiError('Something went wrong. Please try again later.')
    }
  }

  const formatResponse = (response) => {
    if (!response) return "";

    let formattedResponse = response;
    formattedResponse = formattedResponse.replace('Intro:', 'Intro:');
    formattedResponse = formattedResponse.replace('Body:', '\nBody:');
    formattedResponse = formattedResponse.replace('Conclusion:', '\nConclusion:');

  return formattedResponse;
}

function NewlineText(props) {
  const text = props.text;
  return text.split('\n').map((str, index) => <React.Fragment key={index}>{str}<br/></React.Fragment>);
}

  const downloadPDF = () => {
    const doc = new jsPDF();
    const splitTitle = doc.splitTextToSize(formatResponse(response), 180);
    doc.text(splitTitle, 10, 10);
    doc.save("coverLetter.pdf");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response)
      .then(() => {
        alert('Text copied to clipboard');
      })
      .catch(err => {
        alert('Error in copying text: ', err);
      });
  };


 



  return (
    <>
      <Header />
<div className="text-center pt-10">
    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black tracking-tighter mb-2 ">Get your <span className='text-amber-600 underline'>Cover letter</span> </h1>
    <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-black opacity-70 text-center">
      Get a personalized cover letter for your job application
    </h2>
</div>


    <div className="flex justify-center p-4 flex-col items-center">
    <div className="w-4/5 lg:w-2/5 bg-white rounded-lg p-4 shadow-lg mb-4">
        <form onSubmit={handleSubmit}>
            <label className="block mb-2 text-black font-bold text-lg">
                What is your name?
            </label>
            <input className="mb-4 w-full p-2 border-2 border-black rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='John Doe'
            maxLength={200}
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}

            <label className="block mb-2 text-black font-bold text-lg">
                What is the job title you are applying for?
            </label>
            <input className="mb-4 w-full p-2 border-2 border-black rounded-lg"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder='Software Engineer'
            maxLength={200}
            />
             {errors.jobPrefernces && <p className="text-red-500">{errors.jobPrefernces}</p>}
            <label className="block mb-2 text-black font-bold text-lg">
                What is the name of the company you are applying to?
            </label>
            <input className="mb-4 w-full p-2 border-2 border-black rounded-lg"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder='Google'
            maxLength={200}
            />
            {errors.companyName && <p className="text-red-500">{errors.companyName}</p>}
            <label className="block mb-2 text-black font-bold text-lg">
                What is the job description?
            </label>
            <textarea className="mb-4 w-full p-2 border-2 border-black rounded-lg"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder='Write a short description of the job you are applying for'
            maxLength={800}
            />
            {errors.jobDescription && <p className="text-red-500">{errors.jobDescription}</p>}
            <label className="block mb-2 text-black font-bold text-lg">
                What is your writing style?
            </label>
            <select 
  className="mb-4 w-full p-2 border-2 border-black rounded-lg"
  value={writingStyle}
  onChange={(e) => setWritingStyle(e.target.value)}
  >
    <option value="">Select your writing style</option>
    <option value="formal">Formal</option>
    <option value="casual">Casual</option>
    <option value="funny">Funny</option>

  </select>
  {errors.writingStyle && <p className="text-red-500">{errors.writingStyle}</p>}
            <label className="block mb-2 text-black font-bold text-lg">
                Tell me about yourself
            </label>
            <textarea className="mb-4 w-full p-2 border-2 border-black rounded-lg"
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
            placeholder='Write a short description of yourself'
            maxLength={400}
            />
            {errors.aboutMe && <p className="text-red-500">{errors.aboutMe}</p>}

            <button className="mt-4 bg-amber-500 text-white rounded-3xl px-6 py-2 hover:bg-amber-700 transition-colors">Submit</button>
        </form>
    </div>
    <div className="w-4/5 lg:w-2/5 bg-white border-2 border-black rounded-lg p-4 shadow-lg">
        <div id="api-response" className="w-full h-full">
        {loading ? (
                <p className="text-black= text-lg">Just a few moments...</p>
            ) : (
                response && (
                  <>
                    <h2 className="text-black text-lg">Here is your cover letter</h2>
                    <NewlineText text={formatResponse(response)} />     
                    <button className="mt-4 bg-amber-500 text-white rounded-3xl px-3 py-2 hover:bg-amber-700 transition-colors  md:mr-4 mb-1 md:mb-0 " onClick={downloadPDF}>Download PDF</button>
                    <button className="mt-4 bg-black text-white rounded-3xl px-3 py-2 hover:bg-amber-700 transition-colors" onClick={copyToClipboard}>Copy to clipboard</button>

                </>
                )
            )}
            {apiError && <p className="text-red-500">{apiError}</p>}

        </div>
    </div>
</div>



<Footer />
    
    </>
  )
}

export default WithPaidUser(CoverLetter)