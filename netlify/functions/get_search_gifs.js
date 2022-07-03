const axios = require("axios");

/***
 * Below function gets called by App.js component.
 * how ?
 * In axios call, axios.get('/.netlify/functions/get_search_gifs')
 */
exports.handler = async (event, context) => {
    try {
        const { q, offset } = event.queryStringParameters;
        console.log('event - ',event)
        const response = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_API_GIPHY_KEY}&q=${q}&limit=20&offset=${offset}&rating=g&lang=en`)
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