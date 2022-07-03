import React, { useContext, memo } from 'react';
import ThemeContext from '../../common/ThemeContext';
import './ToggleTheme.css';

const ToggleTheme = ({toggleTheme}) => {
    const themeObject = useContext(ThemeContext);

    return (
        <>
            <button onClick={toggleTheme} className={`${themeObject.darkTheme ? 'darkButton' : 'lightButton'}`}>
                {
                    themeObject.darkTheme ? 'Switch to light' : 'Switch to dark'
                }
            </button>
        </>
    )
}
export default memo(ToggleTheme);