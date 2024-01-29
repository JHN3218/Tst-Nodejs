const { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } = require('@google/generative-ai');

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env['Gemini_API_ky']);

module.exports.GeminiAI =
async (prompt, attitude = 0) => {
  if (!prompt) {
    console.log('No prompt provided.');
    return;
  }
  // For text-only input, use the gemini-pro model
  const generationConfig = 
    attitude==1? {
      // stopSequences: ["red"],
      // maxOutputTokens: 200,
      temperature: .5, //0-.9
      topK: 2,
      // topP: 1, //.95
    }:attitude==2? {
      // stopSequences: ["red"],
      // maxOutputTokens: 200,
      temperature: .9, //0-.9
      topK: 5,
      // topP: 1, //.95
    }: {
      // stopSequences: ["red"],
      // maxOutputTokens: 200,
      temperature: 0, //0-.9
      topK: 1,
      // topP: 1, //.95
  };

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
{
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
// {
//   category: HarmCategory.HARM_CATEGORY_DEROGATORY,
//   threshold: HarmBlockThreshold.BLOCK_NONE,
// },
// {
//   category: HarmCategory.HARM_CATEGORY_TOXICITY,
//   threshold: HarmBlockThreshold.BLOCK_NONE,
// },
// {
//   category: HarmCategory.HARM_CATEGORY_SEXUAL,
//   threshold: HarmBlockThreshold.BLOCK_NONE,
// },
];

  const model = genAI.getGenerativeModel({
    model: "gemini-pro",
    generationConfig,
    safetySettings,
  });

  const result = await model.generateContentStream(prompt);
  for await (const chunk of result.stream) {
    console.log(chunk.text());
  }
  // const response = await result.response;
  // const text = response.text();
  // console.log(text);
};