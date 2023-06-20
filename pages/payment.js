import axios from 'axios'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import  WithAuth  from '@/components/WithAuth';
import { httpsCallable } from "firebase/functions";
import { getFunctions } from "firebase/functions";



function Payment() {
    const { currentUser, refreshUser } = useAuth()
    const functions = getFunctions();
    const [error, setError] = useState('')
    const [Success, setSuccess] = useState('')
    const router = useRouter()



    useEffect(() => {
        if(currentUser?.hasPaid) {
            router.push('/')
        } else if (!currentUser) {
            router.push('/login')
        }
    }, [currentUser])

    
    const createOrder = async (data, actions) => {
        try {
            const idToken = await currentUser.getIdToken(true)
            const res = await axios.post('https://us-central1-careerhub-ai.cloudfunctions.net/createOrder', {}, {
                headers: { Authorization: `Bearer ${idToken}` }
            });
            return res.data.orderID
        } catch (err) {
            console.error(err)
            setError('Something went wrong')
        }
    };
    
           

    const onApprove = async (data, actions) => {
        try {
            const idToken = await currentUser.getIdToken(true)
            const res = await axios.post('https://us-central1-careerhub-ai.cloudfunctions.net/captureOrder', {
                orderID: data.orderID
            }, {
                headers: { Authorization: `Bearer ${idToken}` }
            });
            const updatePaymentStatus = httpsCallable(functions, 'updatePaymentStatus');
            await updatePaymentStatus({ userId: currentUser.uid, hasPaid: true });
            await refreshUser();
            setSuccess('Payment successful! Redirecting...')
            setTimeout(() => {
                router.replace('/thankyou').then(() => window.scrollTo(0, 0))
            }, 2000)
        } catch (err) {
            console.error(err)
            setError('Something went wrong')
        }
    };
        

  return (
    <>
    <div className="flex flex-row justify-between items-center p-4 lg:mr-5 lg:ml-5">
    <h1 className="text-2xl lg:text-4xl font-bold text-black tracking-tight">CareerHub <span className='text-amber-500'>AI</span> </h1>
    <div className="flex gap-4">
        <button className="hover:text-amber-500 text-gray-500 font-bold py-2 px-4 rounded">
        <Link legacyBehavior href={`/`}>
                    <a className="">Home</a>
                </Link>
        </button>

    </div>
</div>
        
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">

            <div className="max-w-md mx-auto">
                <div className="text-2xl font-extrabold text-center mb-4">
                    Premium Plan
                </div>
                <div className="text-gray-600 text-center mb-8">
                    Unlock all our premium features for just $5.99 lifetime.
                </div>

                <ul className="text-gray-600 text-lg leading-relaxed">
                    <li className="mb-2">- Full access to all resources</li>
                    <li className="mb-2">- The power of GPT-4</li>
                    <li className="mb-2">- Access to all future updates</li>
                    <li className="mb-6">- One time payment, Lifetime access</li>
                </ul>

                <div className="mt-8">
                    <PayPalScriptProvider options={{ "client-id": "AaR_Uj6xi1ZjAKawCaruhl4P7lscnNrLD0PqtrdrsWFykhJsGF8K4sW32sVlOXKvh5hU9W66rqVdNNsb" }}>
                        <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
                    </PayPalScriptProvider>
                </div>
                {error && <p className='text-red-500 text-center mt-4'>{error}</p>}
                {Success && <p className='text-green-500 text-center mt-4'>{Success}</p>}
            </div>
        </div>
    </div>
</div>
</>
  )
}

export default WithAuth(Payment)