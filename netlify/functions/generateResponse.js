// netlify/functions/generateResponse.js

const fetch = require('node-fetch');

// netlify/functions/generateResponse.js

// exports.handler = async function (event, context) {
//     if (event.httpMethod === "POST") {
//       try {
//         // POST 메소드에 대한 처리 로직 추가
//         const requestBody = JSON.parse(event.body);
//         const userInput = requestBody.userInput;
  
//         const messages = [
//           { role: 'system', content: 'You are a music recommendation machine. When you enter a keyword, 10 titles and singers should be displayed.' },
//           { role: 'user', content: userInput },
//           { role: 'assistant', content: 'Just answer in the format “title by singer”'},
//         ];
  
//         const requestData = {
//           model: 'gpt-3.5-turbo',
//           messages: messages,
//         };
  
//         // OpenAI API 호출 등의 로직을 추가
  
//         return {
//           statusCode: 200,
//           body: JSON.stringify({ message: "Success" }),
//         };
//       } catch (error) {
//         console.error("Error:", error);
//         return {
//           statusCode: 500,
//           body: JSON.stringify({ error: "Internal Server Error" }),
//         };
//       }
//     } else {
//       return {
//         statusCode: 405,
//         body: JSON.stringify({ error: "Method Not Allowed" }),
//       };
//     }
//   };
  

exports.handler = async function (event, context) {
  const apiKey = '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';
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  const userInput = JSON.parse(event.body).userInput;

  console.log("input ok")

  const messages = [
    { role: 'system', content: 'You are a music recommendation machine. When you enter a keyword, 10 titles and singers should be displayed.' },
    { role: 'user', content: userInput },
    { role: 'assistant', content: 'Just answer in the format “title by singer”' },
  ];

  const requestData = {
    model: 'gpt-3.5-turbo',
    messages: messages,
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestData),
    });

    const result = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        title: result.choices[0].message.content,
      }),
    };
  } catch (error) {
    console.error('Error:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Error fetching response from OpenAI.',
      }),
    };
  }
};
