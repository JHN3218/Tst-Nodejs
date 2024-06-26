const { fs } = require('fs');

const sysRole = 'As expert analysis in complete details with technical straight concise formal academic style';

const {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} = require('@google/generative-ai');

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env['Gemini_API_ky']);

module.exports.GeminiAI =
async (
    prompt,
    role = '',
    attitude = 0
) => {
  if (!prompt.trim().length) {
    console.log('No prompt provided.');
    return;
  }
  
  // For text-only input, use the gemini-pro model
  const generationConfig = 
    attitude==2? {
      // stopSequences: ["red"],
      // maxOutputTokens: 200,
      temperature: .9, //0-.9
      topK: 5,
      // topP: 1, //.95
    }:attitude==1? {
      // stopSequences: ["red"],
      // maxOutputTokens: 200,
      temperature: .5, //0-.9
      topK: 2,
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
    //   category: HarmCategory.HARM_CATEGORY_UNSPECIFIED,
    //   threshold: HarmBlockThreshold.BLOCK_NONE,
    // },
  ];
  
  // Converts local file information to a GoogleGenerativeAI.Part object.
  const fileToGenerativePart = (path, mimeType) => {
    return {
      inlineData: {
        data: Buffer.from(fs.readFileSync(path)).toString("base64"),
        mimeType
      },
    };
  };

  const model = genAI.getGenerativeModel({
    // The Gemini 1.5 models are versatile and work with most use cases
    model: "gemini-1.5-flash",
    generationConfig,
    safetySettings,
  });

  if (!role) role = sysRole;
  const result = await model.generateContentStream(role + ':\n' + prompt);
  for await (const chunk of result.stream) {
    console.log(chunk.text());
  }
  // const response = await reprocess.env['Anthropic_API_ky']sult.response;
  // const text = response.text();
  // console.log(text);
};


const OpenAI = require("openai");

const openai = new OpenAI({apiKey:process.env['OpenAI_API_ky']});

module.exports.OpenAI =
async (
  prompt,
  role = '',
) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: role || sysRole,
      },
    {
      role: "user",
      content: prompt,
    },
],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}


const Anthropic = require("@anthropic-ai/sdk");

const anthropic = new Anthropic({['x-api-key']:process.env['Anthropic_API_ky']});

module.exports.ClaudeAI =
async (
  prompt,
  role = '',
  modl = 'Sonnet',
) => {
  const model = {
    Opus: 'claude-3-opus-20240229',
    Sonnet: 'claude-3-5-sonnet-20240620',
    Haiku: 'claude-3-haiku-20240307',
  };
  await anthropic.messages.stream({
    model: model[modl],
    max_tokens: 1024,
    temperature: 0, // 0.0 (analytic) - 1.0 (creative)
    // stream: true,
    system: role || sysRole,
    messages: [{
      "role": "user",
      "content": [{
        "type": "text",
        "text": prompt
      }]
    }]
  }).on('text', (text) => {
    console.log(text);
  });
}
