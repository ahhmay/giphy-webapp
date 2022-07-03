import React, { memo } from 'react';
import Gif from '../Gif/Gif';
import './GifContainer.css';

const GifContainer = (props) => {
    const {gifData} = props;

    return (
        <>
            <div className="grid-container mx-0 px-0">
                {
                    gifData?.map((gif, index) => {
                        return <Gif gif={gif} key={index}/>
                    })
                }
            </div>
            
        </>
    )
}
export default memo(GifContainer);