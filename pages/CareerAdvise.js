import { useState } from 'react'
import axios from 'axios'
import Header from '@/components/Header'
import Footer from '@/components/Footer';
import WithPaidUser from '@/components/WithPaidUser'

function CareerAdvise() {

  const [currentRole, setCurrentRole] = useState('');
  const [skills, setSkills] = useState('');
  const [goals, setGoals] = useState('');
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setResponse([]);
    setApiError('');

    // form validation
    let errorsFound = {};
    if (!skills.trim()) errorsFound.skills = 'Field is required';
    if (!goals.trim()) errorsFound.goals = 'Field is required';

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
    const { data } = await axios.post('/api/careerAdvise', {
      currentRole,
      skills,
      goals
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
    <h1 className="text-3xl md:text-5xl lg:text-6xl  font-bold text-black tracking-tighter mb-2 ">
      Get a personalized <span className='text-amber-600 underline'>Career Advise</span> 
    </h1>
    <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-black opacity-70 text-center">
        Simply answer a few questions and get a personalized advice to take your career to the next step.
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
            <label className="block mb-2 text-black font-bold text-lg">What are your skills?</label>
            <textarea className="mb-4 w-full p-2 h-32 border-2 border-black rounded-lg"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder='e.g. Python, Java, React, etc.'
            maxLength={200}
            ></textarea>
            {errors.skills && <p className="text-red-500">{errors.skills}</p>}
            <label className="block mb-2 text-black font-bold text-lg">What is your career Goal?</label>
            <textarea className="w-full p-2 h-32 border-2 border-black rounded-lg"
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            placeholder='e.g. Become a Software Architect'
            maxLength={200}
            ></textarea>
            {errors.goals && <p className="text-red-500">{errors.goals}</p>}
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



export default WithPaidUser(CareerAdvise)