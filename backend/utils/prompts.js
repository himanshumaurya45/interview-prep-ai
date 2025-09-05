// utils/prompts.js
const conceptExplainPrompt = (question) => `
You are an AI that must return answers ONLY in JSON format.
Do NOT include explanations outside JSON. 
Return the result in this exact schema:

{
  "title": "string",
  "explanation": "string"
}

Question: ${question}
`;

const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => `
Generate ${numberOfQuestions} interview questions for a ${role} with ${experience} years of experience.
Focus on these topics: ${topicsToFocus}.
Return ONLY JSON in this schema:

{
  "questions": [
    {"question": "string", "answer": "string"}
  ]
}
`;
module.exports = { conceptExplainPrompt, questionAnswerPrompt };