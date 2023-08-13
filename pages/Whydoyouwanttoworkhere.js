import { useState } from 'react'
import axios from 'axios'
import Header from '@/components/Header'
import Footer from '@/components/Footer';
function Whydoyouwanttoworkhere() {

  const [company, setCompany] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [role, setRole] = useState('');
  const [roleDescription, setDescription] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    setResponse('');
    setApiError('');

    // form validation
    let errorsFound = {};
    if (!company.trim()) errorsFound.company = 'Field is required';
    if (!companyDescription.trim()) errorsFound.companyDescription = 'Field is required';
    if (!role.trim()) errorsFound.role = 'Field is required';
    if (!roleDescription.trim()) errorsFound.roleDescription = 'Field is required';

    if (Object.keys(errorsFound).length > 0) {
        setErrors(errorsFound);
        // Set timeout to clear error messages after 5 seconds (5000 milliseconds)
        setTimeout(() => {
            setErrors({});
        }, 5000);
        return;
    }

    try {
    setLoading(true);
    const { data } = await axios.post('/api/whydoyouwanttoworkhere', {
        company,
        companyDescription,
        role,
        roleDescription
    });
    setLoading(false);
    console.log(data.response);
    setResponse(data.response)

  } catch (error) {
    console.log(error);
    setApiError('Something went wrong. Please try again later.');
  }
  }

  return (
    <>
    <div className='m-5'>
    <Header />

    <div className="text-center pt-10">
    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black tracking-tighter mb-2 ">Why do you want to work <span className='text-amber-600 underline'>here ?</span></h1>
    <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-black opacity-70 text-center">
    Simply fill out the form below and we will generate a specific answer to the question &ldquo;Why do you want to work here?&rdquo; One of the most common interview and application questions.
        
    </h2>
</div>

    <div className="flex justify-center p-4 flex-col items-center">
    <div className="w-4/5 lg:w-2/5 bg-white rounded-lg p-4 shadow-lg mb-4">
        <form onSubmit={handleSubmit}>
            <label className="block mb-2 text-black font-bold text-lg">Company</label>
            <input className="mb-4 w-full p-2 border-2 border-black rounded-lg"
            value = {company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder='e.g. Google'
            max={50}
          />
          {errors.company && <p className="text-red-500">{errors.company}</p>}
            <label className="block mb-2 text-black font-bold text-lg">Company Description</label>
            <textarea className="mb-4 w-full p-2 h-4 5 border-2 border-black rounded-lg"
            value={companyDescription}
            onChange={(e) => setCompanyDescription(e.target.value)}
            placeholder='e.g. Google is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, a search engine, cloud computing, software, and hardware.'
            max={400}
            
/>
            {errors.companyDescription && <p className="text-red-500">{errors.companyDescription}</p>}
            <label className="block mb-2 text-black font-bold text-lg">Role</label>
            <input className="mb-4 w-full p-2 h-12 border-2 border-black rounded-lg"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder='e.g. Data Scientist'
            max={40}
            />
            {errors.role && <p className="text-red-500">{errors.role}</p>}
            <label className="block mb-2 text-black font-bold text-lg">Role Description</label>
            <textarea className="w-full p-2 h-45 border-2 border-black rounded-lg"
            value={roleDescription}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='e.g. The Data Scientist will be responsible for designing and implementing various statistical and machine learning models for the purpose of predicting key business metrics, and recommending actions to improve business performance.'
            max={400}
            />
            {errors.roleDescription && <p className="text-red-500">{errors.roleDescription}</p>}
            <button className="mt-4 bg-amber-500 text-white rounded-3xl px-6 py-2 hover:bg-amber-700 transition-colors">Submit</button>
        </form>
    </div>
    <div className="w-4/5 lg:w-2/5 bg-white border-2 border-black rounded-lg p-4 shadow-lg">
        <div id="api-response" className="w-full h-full">
        {loading ? (
                <p className="text-black text-lg">Just a few moments...</p>
              ) : (
                <p className="text-black text-lg">{response}</p>
              )}
              {apiError && <p className="text-red-500">{apiError}</p>}

        </div>
    </div>
</div>
</div>

<Footer />

</>
  )
}

export default Whydoyouwanttoworkhere