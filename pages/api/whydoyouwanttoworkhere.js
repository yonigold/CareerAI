import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
    runtime: "edge",
  };


const whydoyouwanttoworkhere = async (req) => {
    const { company, companyDescription, role, roleDescription } = await req.json();
    const prompt = `As a career coach, consider a candidate who want to apply to a job with the following details:.
    company: ${company}
    company description: ${companyDescription}
    role: ${role}
    role description: ${roleDescription}
    Given this information, provide a specific answer to the question "Why do you want to work here?" that could be expected for this role and for this data. No nee to add any more details.
    `;
    try {
      const response =  await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
              {
                  role: 'system',
                  content: 'You are a professional career coach which is helping a candidate to prepare for an interview.'
  
              },
              {
                  role: 'user',
                  content: prompt
              }
          ],
          max_tokens: 1800,
          temperature: 0,
          })
          
      });

      if (!response.ok) {
          throw new Error(response.statusText);
      }

      const data = await response.json();

      return new Response(JSON.stringify({ response: data.choices[0].message.content }), { status: 200, headers: { 'Content-Type': 'application/json' }});
    } catch (error) {
      console.log(error);
      return new Response(JSON.stringify({ error: 'An error occurred processing your request' }), { status: 500, headers: { 'Content-Type': 'application/json' }});
    }
}

export default whydoyouwanttoworkhere 