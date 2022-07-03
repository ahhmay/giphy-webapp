import React, { useContext, memo } from 'react';
import { debounce } from '../../common/common';
import ThemeContext from '../../common/ThemeContext';
import './SearchGif.css';
const DELAY = 500;

const SearchGif = ({setSearchQuery}) => {
    const themeObject = useContext(ThemeContext)

    const updatedState = (value) => {
        setSearchQuery(() => value)
    }

    const handleChange = (value) => {
        betterDebounce(value)
    }

    const betterDebounce = debounce(updatedState, DELAY);
    
    return (
        <div>
            <input
                type="text"
                className={`form-control ${themeObject.darkTheme ? 'darkInput' : 'lightInput'}`}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Search keywords"
                maxLength="30" />
        </div>
    )
}
export default React.memo(SearchGif);