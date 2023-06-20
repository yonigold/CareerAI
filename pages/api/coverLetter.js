import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
    runtime: "edge",
  };


const coverLetter = async (req) => {
    const { name, jobTitle, companyName, jobDescription, writingStyle, aboutMe  } = await req.json();
    const prompt = `As a career progression advisor consider a professional who is applying for a job with the following details.
    name: ${name}
    job title: ${jobTitle}
    company name: ${companyName}
    job description: ${jobDescription}
    writing style: ${writingStyle}
    about me: ${aboutMe}
    Based on this information, write a cover letter for a job application. 
    Divide the cover letter into the following sections:
- Intro
- Body
- Conclusion
Always Return the answer in the following format and in no other:
Intro: {write the introductory paragraph here}
Body: {write the body paragraphs here}
Conclusion: {write the concluding paragraph here}
    `;
    try {
      const response =  await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
              {
                  role: 'system',
                  content: 'You are a professional cover letter writer. You are helping a user to write a cover letter for a job application.'
  
              },
              {
                  role: 'user',
                  content: prompt
              }
          ],
          max_tokens: 900,
          temperature: 0,
          })
          
      });

      if (!response.ok) {
          throw new Error(response.statusText);
      }

      const data = await response.json();
      console.log(data);
      return new Response(JSON.stringify({ response: data.choices[0].message.content }), { status: 200, headers: { 'Content-Type': 'application/json' }});
    } catch (error) {
      console.log(error);
      return new Response(JSON.stringify({ error: 'An error occurred processing your request' }), { status: 500, headers: { 'Content-Type': 'application/json' }});
    }
}

export default coverLetter 