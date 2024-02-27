require('dotenv').config();
const axios = require('axios');

const apiKey = process.env.OPENAI_API_KEY;
const apiUrl = 'https://api.openai.com/v1/chat/completions';

const messages = [
  { role: 'system', content: 'You are a music recommendation machine.' },
  { role: 'user', content: 'recommend me one female indie song.' },
  { role: 'assistant', content: 'Just answer in the format “title by singer”'},
];

const requestData = {
  model: 'gpt-3.5-turbo', // 모델 선택
  messages: messages,
};

axios.post(apiUrl, requestData, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
  },
})
  .then(response => {
    console.log(response.data.choices[0].message.content);
    
    const { choices } = response.data;
    const [title, singer] = choices[0].message.content.split('by');
    console.log(title, singer)
  })
  .catch(error => {
    console.error('Error:', error.response ? error.response.data : error.message);
  });


// require('dotenv').config();
// const axios = require('axios');

// const apiKey = process.env.OPENAI_API_KEY;
// const apiUrl = 'https://api.openai.com/v1/completions'; // 엔드포인트 수정

// const prompt = 'recommend me one female indie song';

// const requestData = {
//     model: 'davinci-002', // 모델 선택
//     prompt: prompt,
//     temperature: 0,
//     max_tokens: 150,
// };

// axios.post(apiUrl, requestData, {
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${apiKey}`,
//   },
// })
//   .then(response => {
//     console.log(response.data.choices[0].text);
//   })
//   .catch(error => {
//     console.error('Error:', error.response ? error.response.data : error.message);
//   });
