import React, { useEffect, useState, useCallback, useRef } from 'react';
import SearchGif from './components/SearchGif/SearchGif';
import ToggleTheme from './components/ToggleTheme/ToggleTheme';
import GifContainer from './components/GifContainer/GifContainer';
import LoadingGif from './components/LoadingGif/LoadingGif';
import ThemeContext from './common/ThemeContext';
import axios from 'axios';
import './App.css';

function App() {
  console.log("in app.js ")
  const [gifData, setGifData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkTheme, setDarkTheme] = useState(true);
  const [loading, setLoading] = useState(true);
  const isTrue = useRef(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [triggerIntersectionObserver, setTriggerIntersectionObserver] = useState(false);
  const loader = useRef(null);

  /***
   * Netlify function gets called from here.
   */
  async function getGifs(offset) {
    setLoading(true)
    const response = searchQuery ? await axios.get(`/.netlify/functions/get_search_gifs?q=${searchQuery}&offset=${offset}`) : await axios.get(`/.netlify/functions/get_trending_gifs?offset=${offset}`)
    if(response.data.response) {
      setGifData(prev => {
        return [...prev, ...response.data.response.data]
      })
      setLoading(false)
    }
  }

  // Intersection Observer
  const handleObserver = useCallback((entries) => {
    const [target] = entries;
    if(isTrue.current) {
      isTrue.current = false;
      return;
    }
    if (target.isIntersecting && Math.floor(target.intersectionRatio) === 1) {
      setPageNumber(prev => prev + 20);
      setTriggerIntersectionObserver(prev => !prev);
    }
  }, []);

  useEffect(() => {
    getGifs(pageNumber)
  }, [triggerIntersectionObserver])

  useEffect(() => {
    setGifData([]);
    setPageNumber(0);
}, [searchQuery]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "10px",
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
    
    return () => {
      if (loader.current) {
          observer.unobserve(loader.current);
      }
    }
  }, []);
  
  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  }

  return (
    <ThemeContext.Provider value={{darkTheme: darkTheme}}>
      <div className={`App px-10 right-align ${darkTheme ? 'dark' : 'light'}`}>
        <div className="sticky container-fluid">
          <div className={`row pb-3 ${darkTheme ? 'dark' : 'light'}`}>
            <span className={`col-lg-4 col-md-4 col-sm-12 center-align mt-3 ${darkTheme ? 'darkTitle' : 'lightTitle'}`}>Giphy Infinite Scroll</span>
            <div className="col-lg-8 col-md-8 col-sm-12 right-align center-align mt-3">
              <SearchGif setSearchQuery={setSearchQuery}/>
              <ToggleTheme toggleTheme={toggleTheme}/>
            </div>
          </div>
          <div>
            {
              loading ? <div className="grad1"></div> : <hr className={`${darkTheme ? 'darkLine' : 'lightLine'}`}></hr>
            }
          </div>
        </div>
        <div className={`${darkTheme ? 'darkDiv' : 'lightDiv'}`}></div>
        <div className='space-around my-2 py-2 px-10'>
          <GifContainer gifData={gifData} />
        </div>
        <div ref={loader}>
          {
              loading ? <LoadingGif  darkTheme={darkTheme}/> : <></>
          }
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
export default App;