import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
    runtime: "edge",
  };


const salary = async (req) => {
    const { currentRole, experience, country, education } = await req.json();
    const prompt = `As a salary advisor, consider a professional with the following details:.
    current role: ${currentRole}
    experience: ${experience}
    country: ${country}
    education: ${education}
    Given this information, provide a general salary range that could be expected for this role, based on the last available data. Also, explain in short the factors that typically influence the salary for this role.
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
                  content: 'You are a professional career and salary export.'
  
              },
              {
                  role: 'user',
                  content: prompt
              }
          ],
          max_tokens: 700,
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

export default salary