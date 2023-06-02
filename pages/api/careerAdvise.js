import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
    runtime: "edge",
  };


const careerPath = async (req) => {
    const { currentRole, skills, goals  } = await req.json();
    const prompt = `As a career progression advisor, consider a professional with the following details.
    current role: ${currentRole}
    skills: ${skills}
    goals: ${goals}
    Based on this information, suggest a career progression plan or a career advise including potential next roles, additional skills to acquire, and strategies to achieve the stated goals.
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
                  content: 'You are a professional career progression advisor. You are helping a user to get a personalized career advise.'
  
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

export default careerPath