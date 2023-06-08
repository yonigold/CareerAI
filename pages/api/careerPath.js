import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

const careerPath = async (req) => {
  const { mostImportantJobPrefernce, jobPrefernces, moreJobDetails } =
    await req.json();
  const prompt = `Given that the user's most important job preference is ${mostImportantJobPrefernce},
     they have interests in ${jobPrefernces}, and they also value ${moreJobDetails},
     what are 2 suitable career paths for them? respond like you are talking to the user.
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
            role: "system",
            content:
              "Act as a professional career advisor with expertise in aligning individuals interests and preferences with suitable career paths.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 500,
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

export default careerPath;
