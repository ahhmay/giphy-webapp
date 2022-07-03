const axios = require("axios");

/***
 * Below function gets called in App.js component.
 * how ?
 * In axios call, axios.get('/.netlify/functions/get_trending_gifs')
 */
exports.handler = async (event, context) => {
    try {
        const { offset } = event.queryStringParameters;
        const response = await axios.get(`https://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_API_GIPHY_KEY}&limit=20&offset=${offset}`)
        return {
            statusCode: 200,
            body: JSON.stringify({ response: response.data }),
        }
    } catch (err) {
        return {
            statusCode: 404,
            body: "Cannot reach server\nERROR-\n" + err.toString(),
        };
    }
}