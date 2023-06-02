import { useState } from 'react'
import axios from 'axios'
import Header from '@/components/Header'
import Footer from '@/components/Footer'


function CareerPath() {
    const [mostImportantJobPrefernce, setMostImportantJobPrefernce] = useState('');
    const [jobPrefernces, setJobPrefernces] = useState('');
    const [moreJobDetails, setMoreJobDetails] = useState('');
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
        if (!mostImportantJobPrefernce.trim()) errorsFound.mostImportantJobPrefernce = 'Field is required';
        if (!jobPrefernces.trim()) errorsFound.jobPrefernces = 'Field is required';
        if (!moreJobDetails.trim()) errorsFound.moreJobDetails = 'Field is required';
        
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
        const { data } = await axios.post('/api/careerPath', {
            mostImportantJobPrefernce,
            jobPrefernces,
            moreJobDetails
        });
        setLoading(false);
        // console.log(data.response);
        const careerPaths = data.response.split(/\d\.\s/).filter(Boolean);
        // console.log(careerPaths);
        setResponse(careerPaths);

    } catch (error) {
        // console.log(error);
        setApiError('Something went wrong. Please try again later.');


    }
    }



  return (
    <>
    <div className='m-5'>
    <Header />

    <div className="text-center pt-10">
    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black tracking-tighter mb-2 ">Discover Your <span className='text-amber-600 underline'>Career Path</span> </h1>
    <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-black opacity-70 text-center">
        Simply answer a few questions and let AI help you uncover career paths you might excel in based on your intrests.
    </h2>
</div>


    <div className="flex justify-center p-4 flex-col items-center">
    <div className="w-4/5 lg:w-2/5 bg-white rounded-lg p-4 shadow-lg mb-4">
        <form onSubmit={handleSubmit}>
            <label className="block mb-2 text-black font-bold text-lg">
                What is the most important thing you are looking for in a job?
            </label>
            <select 
  className="mb-4 w-full p-2 border-2 border-black rounded-lg" 
  value={mostImportantJobPrefernce}
  onChange={(e) => setMostImportantJobPrefernce(e.target.value)}
>
                <option value=''>Select a preference...</option>
                <option>High salary</option>
                <option>Learning options</option>
                <option>Work life balance</option>
                <option>Job security</option>
                <option>Professional development opportunities</option>
                <option>Advancement opportunities</option>

            </select>
            <label className="block mb-2 text-black font-bold text-lg">
                What are your interests?
            </label>
            <textarea className="mb-4 w-full p-2 h-32 border-2 border-black rounded-lg "
            value={jobPrefernces}
            onChange={(e) => setJobPrefernces(e.target.value)}
            placeholder='Technology, Business, Finance, etc.'
            maxLength={200}
            ></textarea>
             {errors.jobPrefernces && <p className="text-red-500">{errors.jobPrefernces}</p>}
            <label className="block mb-2 text-black font-bold text-lg">What are your job prefernces?</label>
            <textarea className="w-full p-2 h-32 border-2 border-black rounded-lg"
            value={moreJobDetails}
            onChange={(e) => setMoreJobDetails(e.target.value)}
            placeholder='Company culture, work environment, etc.'
            maxLength={200}
            ></textarea>
            {errors.moreJobDetails && <p className="text-red-500">{errors.moreJobDetails}</p>}
            <button className="mt-4 bg-amber-500 text-white rounded-3xl px-6 py-2 hover:bg-amber-700 transition-colors">Submit</button>
        </form>
    </div>
    <div className="w-4/5 lg:w-2/5 bg-white border-2 border-black rounded-lg p-4 shadow-lg">
        <div id="api-response" className="w-full h-full">
        {loading ? (
                <p className="text-black= text-lg">Just a few moments...</p>
            ) : (
                response.map((careerPath, index) => (
                    <>
                    <p key={index} className="text-black text-lg">{`${index+1}. ${careerPath}`}</p>
                    <br/>
                </>
                ))
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

export default CareerPath