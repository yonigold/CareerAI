import { useState } from 'react'
import axios from 'axios'
import Header from '@/components/Header'
import Footer from '@/components/Footer';
import WithPaidUser from '@/components/WithPaidUser'
import jsPDF from 'jspdf';

function Interview() {
  const [jobTitle, setJobTitle] = useState('')
  const [company, setCompany] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [response, setResponse] = useState([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    setResponse([])
    setApiError('')
    // form validation
    let errorsFound = {}
    if (!jobTitle.trim()) errorsFound.jobTitle = 'Field is required'
    if (!company.trim()) errorsFound.company = 'Field is required'
    if (!jobDescription.trim()) errorsFound.jobDescription = 'Field is required'

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
      const { data } = await axios.post('/api/interview', {
        jobTitle,
        company,
        jobDescription,
      })
      setLoading(false)
      // console.log(data.response);
      const interview = parseInterviewResponse(data.response)
      setResponse(interview)
    } catch (error) {
      console.log(error);
      setLoading(false)
      setApiError('An error occurred processing your request')
    }
  }

  const handleDownload = () => {
    const doc = new jsPDF();
    const content = response.map((item, index) => `Question ${index + 1}: ${item.question}\nAnswer: ${item.answer}`).join('\n\n');
    const splitText = doc.splitTextToSize(content, 180);
    doc.text(splitText, 10, 10);
    doc.save("interview.pdf");
}

const copyToClipboard = () => {
    const textToCopy = response.map((item, index) => `Question ${index + 1}: ${item.question}\nAnswer: ${item.answer}`).join('\n\n');
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        alert('Text copied to clipboard');
      })
      .catch(err => {
        alert('Error in copying text: ', err);
      });
};

  function parseInterviewResponse(response) {
    const regex = /(Question \d+:)(.*?)(Answer:)(.*?)(?=Question \d+:|$)/gs;
  let match;
  const parsedResponse = [];

  while ((match = regex.exec(response)) !== null) {
    if (match.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    parsedResponse.push({
      question: match[2].trim(),
      answer: match[4].trim(),
    });
  }

  return parsedResponse;
}


  return (
//    create a coming soon page
    <>
<Header />
<div className="text-center pt-10">
    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black tracking-tighter mb-2 ">Prepare for your <span className='text-amber-600 underline'>Behavioral job interview</span> </h1>
    <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-black opacity-70 text-center">
      Fill out the form and get 3 behavioral questions and answers to ace your interview.
      </h2>
</div>

<div className="flex justify-center p-4 flex-col items-center">
    <div className="w-4/5 lg:w-2/5 bg-white rounded-lg p-4 shadow-lg mb-4">
        <form onSubmit={handleSubmit}>
            <label className="block mb-2 text-black font-bold text-lg">Job Title</label>
            <input className="mb-4 w-full p-2 border-2 border-black rounded-lg"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder='Software Engineer, Product Manager, etc.'
            maxLength={200}
            ></input>
            {errors.jobTitle && <p className="text-red-500">{errors.jobTitle}</p>}
            <label className="block mb-2 text-black font-bold text-lg">
                Job Description
            </label>
            <textarea className="mb-4 w-full p-2 h-32 border-2 border-black rounded-lg "
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder='Paste the job description here'
            maxLength={800}
            ></textarea>
            {errors.jobDescription && <p className="text-red-500">{errors.jobDescription}</p>}
            <label className="block mb-2 text-black font-bold text-lg"> Company</label>
            <input className="mb-4 w-full p-2 border-2 border-black rounded-lg"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder='Google, Facebook, etc.'
            maxLength={200}
            ></input>
            <button className="mt-4 bg-amber-500 text-white rounded-3xl px-6 py-2 hover:bg-amber-700 transition-colors">Submit</button>
        </form>
    </div>
    <div className="w-4/5 lg:w-2/5 bg-white border-2 border-black rounded-lg p-4 shadow-lg">

        <div id="api-response" className="w-full h-full">
        {loading && <p className="text-black">Loading...</p>}
        {response && response.map((item, index) => (
          <>
    <div key={index}>
      <p className="text-black font-bold">{`Question ${index + 1}: ${item.question}`}</p>
      <p className="text-black">{`Answer: ${item.answer}`}</p>
    </div>
    </>

  ))}
    <div className="text-center">
        {response.length > 0 && <button className="mt-4 bg-amber-500 text-white rounded-3xl px-6 py-2 hover:bg-amber-700 transition-colors md:mr-4 mb-1 md:mb-0 " onClick={copyToClipboard}>Copy to clipboard</button>}
        {response.length > 0 && <button className="mt-4 bg-amber-500 text-white rounded-3xl px-6 py-2 hover:bg-amber-700 transition-colors" onClick={handleDownload}>Download PDF</button>}
    </div>
            {apiError && <p className="text-red-500">{apiError}</p>}

        </div>
    </div>
</div>



<Footer />
    </>
  )
}

export default WithPaidUser(Interview)