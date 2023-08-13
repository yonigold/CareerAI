import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
    runtime: "edge",
  };


const linkedin = async (req) => {
    const { role, postIdea, style } = await req.json();
    const prompt = `As a career coach, consider a candidate who want to post on Linkedin to grow and engage with this network with the following details:.
    role: ${role}
    post idea: ${postIdea}
    writing style: ${style}
    Given this information, provide a linkedin post.No nee to add any more details.Make sure the posts are not too long, and are engaging and interesting. 1-2 paragraphs is enough.
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
                  content: 'You are a professional career coach which is helping people to grow their network on Linkedin.'
  
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

export default linkedin