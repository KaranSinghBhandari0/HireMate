export const Feedback = `
Based on the following interview conversation between an AI interviewer (assistant) and a candidate (user), analyze the candidate's performance.

Conversation:
{{conversation}}

Please provide:
1. A rating out of 10 for:
   - Technical Skills
   - Communication
   - Problem Solving
   - Experience
2. A short summary of the interview in 3 lines.
3. A final recommendation ("Recommended" or "Not Recommended").
4. A one-line message explaining the recommendation.

Format your response strictly in this JSON structure:

{
  "feedback": {
    "rating": {
      "technicalSkills": <number>,
      "communication": <number>,
      "problemSolving": <number>,
      "experience": <number>
    },
    "summary": "<an array of 3 size each containing a precise summary>",
    "recommendation": "<Recommended/Not Recommended>",
    "recommendationMsg": "<1-line reason>"
  }
}
`;
