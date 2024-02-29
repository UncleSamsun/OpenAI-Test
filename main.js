const apiKey = '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';

        // OpenAI API 엔드포인트
const apiUrl = 'https://api.openai.com/v1/chat/completions';

async function generateResponse() {
    const userInput = document.getElementById('userInput').value;

    const messages = [
        { role: 'system', content: 'You are a music recommendation machine.When you enter a keyword, 10 titles and singers should be displayed.' },
        { role: 'user', content: userInput },
        { role: 'assistant', content: 'Just answer in the format “title by singer”'},
      ];
      
      const requestData = {
        model: 'gpt-3.5-turbo', // 모델 선택
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
        console.log(result)
        console.log(result.choices[0].message.content)

        document.getElementById('output').innerText = result.choices[0].message.content;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('output').innerText = 'Error fetching response from OpenAI.';
    }
}