import axios from 'axios';

// Axios calls
export const getTrendingGifsUsingAxios = (offset) => {
    return axios.get(`https://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_API_GIPHY_KEY}&limit=20&offset=${offset}`)
}

export const getSearchGifsUsingAxios = (query, offset) => {
    return axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_API_GIPHY_KEY}&q=${query}&limit=20&offset=${offset}&rating=g&lang=en`)
}

// Fetch Calls
// export async function getTrendingGifsUsingFetch(offset) {
//     return fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_API_GIPHY_KEY}&limit=20&offset=${offset}`)
// }