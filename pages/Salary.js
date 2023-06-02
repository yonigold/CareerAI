import { useState } from 'react'
import axios from 'axios'
import Header from '@/components/Header'
import Footer from '@/components/Footer';
function Salary() {

  const [currentRole, setCurrentRole] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');
  const [country, setCountry] = useState('');
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
    if (!currentRole.trim()) errorsFound.currentRole = 'Field is required';
    if (!experience.trim()) errorsFound.experience = 'Field is required';
    if (!country.trim()) errorsFound.country = 'Field is required';
    if (!education.trim()) errorsFound.education = 'Field is required';

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
    const { data } = await axios.post('/api/salary', {
      currentRole,
      experience,
      country,
      education
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
    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black tracking-tighter mb-2 ">Know Your <span className='text-amber-600 underline'>Worth</span></h1>
    <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-black opacity-70 text-center">
        Let AI estimate what you should be earning based on your experience, skills, and location.
    </h2>
</div>

    <div className="flex justify-center p-4 flex-col items-center">
    <div className="w-4/5 lg:w-2/5 bg-white rounded-lg p-4 shadow-lg mb-4">
        <form onSubmit={handleSubmit}>
            <label className="block mb-2 text-black font-bold text-lg">Your current role</label>
            <input className="mb-4 w-full p-2 border-2 border-black rounded-lg"
            value = {currentRole}
            onChange={(e) => setCurrentRole(e.target.value)}
            placeholder='e.g. Software Engineer'
            max={50}
          />
          {errors.currentRole && <p className="text-red-500">{errors.currentRole}</p>}
            <label className="block mb-2 text-black font-bold text-lg">What is your experience?</label>
            <input className="mb-4 w-full p-2 h-12 border-2 border-black rounded-lg"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder='e.g. 5 years'
            max={40}
            />
            {errors.experience && <p className="text-red-500">{errors.experience}</p>}
            <label className="block mb-2 text-black font-bold text-lg">What is your education?</label>
            <input className="mb-4 w-full p-2 h-12 border-2 border-black rounded-lg"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            placeholder='e.g. Bachelor degree in Computer Science'
            max={40}
            />
            {errors.education && <p className="text-red-500">{errors.education}</p>}
            <label className="block mb-2 text-black font-bold text-lg">Country</label>
            <input className="w-full p-2 h-12 border-2 border-black rounded-lg"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder='e.g. United States'
            max={40}
            />
            {errors.country && <p className="text-red-500">{errors.country}</p>}
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

export default Salary