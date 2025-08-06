import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Prompt is required." });
  }

  try {
    // Compose system instructions for survey question extraction
    const messages = [
      {
        role: "system",
        content: `You are a survey builder assistant. Given a user's prompt, return survey questions as structured JSON objects with these properties: id, text, type ("text", "multiple-choice", "rating"), and options (only for multiple-choice). Output only valid JSON inside an array called 'questions'.`,
      },
      { role: "user", content: prompt },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or "gpt-4" if you want to use GPT-4
      messages,
      temperature: 0.2,
    });

    // Parse the LLM's JSON output
    const responseText = completion.choices[0]?.message?.content ?? "";
    let questions;
    try {
      // Extract JSON from the model output
      const match = responseText.match(/\{[\s\S]*\}/) || responseText.match(/\[[\s\S]*\]/);
      questions = match ? JSON.parse(match[0]).questions ?? JSON.parse(match[0]) : [];
    } catch (err) {
      return res.status(500).json({ error: "Failed to parse LLM response.", details: responseText });
    }

    res.status(200).json({ questions });
  } catch (error) {
    res.status(500).json({ error: "LLM request failed.", details: error });
  }
}