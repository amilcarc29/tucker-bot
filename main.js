const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const port = 80;
const url = "https://api.telegram.org/bot";
const apiToken = "805755787:AAFzSjZOcCIEekNCmdJ44n0ZRMA7ergAxCY";
const weatherApiKey = "2e53218b7e31aa63d6596df481834fab";

const app = express();

// Configurations
app.use(bodyParser.json());

// Endpoints
app.post("/", (req, res) => {
  const chatID = req.body.message.chat.id;
  const messageSent = req.body.message.text;

  if (messageSent.match(/hello/gi)) {
    postMessage(chatID, "hello back 👋!");
  } else if (messageSent.match(/weather in ([a-zA-Z\s]+)/gi)) {
    getWeather(chatID, messageSent);
  } else {
    res.status(200).send({});
  }
});

async function getWeather(chatID, messageSent) {
  // const city = "Buenos Aires";
  const regexCity = /weather in ([a-zA-Z\s]+)/gi;
  let cityMatched = regexCity.exec(messageSent);
  let city = cityMatched && cityMatched.length > 1 ? cityMatched[1] : undefined;
  let response = await weatherApiCall(city);
  let weatherDescription = response.data.weather[0].description;
  return postMessage(chatID, weatherDescription);
}

weatherApiCall = city => {
  return axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApiKey}`
  );
};

postMessage = (chatID, message) => {
  return axios.post(`${url}${apiToken}/sendMessage`, {
    chat_id: chatID,
    text: message
  });
};

// Listening
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
