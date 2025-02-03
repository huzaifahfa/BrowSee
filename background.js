import OpenAI from "openai";
const OpenAI = new OpenAI();

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action === "describeImage") {
      const apiKey = CONFIG.OPENAI_API_KEY;
      const imageBase64 = message.image;
      
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4-vision-preview",
          prompt: "Describe the item in the Facebook Marketplace listing in a detailed but neutral way.",
          image: imageBase64
        })
      });
      
      const data = await response.json();
      if (data && data.choices && data.choices[0].text) {
        sendResponse({ description: data.choices[0].text.trim() });
      } else {
        sendResponse({ description: "Sorry, I couldn't generate a description." });
      }
    }
    return true;
  });
  