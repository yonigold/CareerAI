import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

const interview = async (req) => {
    const { jobTitle, company, jobDescription } = await req.json();
    const prompt = `Given that the user is interviewing for a ${jobTitle} position at ${company} with the following job description: ${jobDescription},
         What are 3 behavioral questions that they should prepare for? respond like you are talking to the user.
         Respond with the questions and the best way to answer them.
         Always format your response like this:
            Question 1: <question>
            Answer: <answer>
            Question 2: <question>
            Answer: <answer>
            Question 3: <question>
            Answer: <answer>
        `;
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
              model: "gpt-3.5-turbo",
              messages: [ 
                {
                  role: "user",
                  content: prompt,
                },
                {
                  role: "system",
                  content:
                    "Act as a professional HR manager with expertise in behavioral interviewing.",
                },
              ],
              max_tokens: 700,
              temperature: 0,
            }),
          });
      
          if (!response.ok) {
            throw new Error(response.statusText);
          }
      
          const data = await response.json();
      
          return new Response(
            JSON.stringify({ response: data.choices[0].message.content }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        } catch (error) {
          console.log(error);
          return new Response(
            JSON.stringify({ error: "An error occurred processing your request" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      };

export default interview;