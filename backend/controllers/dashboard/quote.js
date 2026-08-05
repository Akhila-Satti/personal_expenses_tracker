// routes/dashboard/quote.js
const axios = require("axios");

const getQuote = async (req, res) => {
  
    const response = await axios.get(
      "https://api.api-ninjas.com/v2/quotes?categories=success",
      {
        headers: {
          "X-Api-Key": process.env.QUOTES_API_KEY,
        },
      }
    );
    
    return res.json(response.data[0]);
  
};

module.exports = getQuote;