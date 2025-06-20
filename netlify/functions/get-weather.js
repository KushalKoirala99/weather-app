const fetch = require('node-fetch')

exports.handler =  async function (e) {
    const API_KEY = process.env.VISUAL_CROSSING_KEY;
    console.log('API_KEY is:', process.env.VISUAL_CROSSING_KEY);

    const location = e.queryStringParameters.location;

    if(!location){
        return {
            statusCode: 400,
            body: JSON.stringify({error: 'Missing location parameter'})
        }
    }
}

 const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
    location
  )}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Weather data not found" }),
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error" }),
    };
  }
};