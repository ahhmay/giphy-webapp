import React, {useState} from 'react';
import DialogPopup from '../DialogPopup/DialogPopup';
import './Gif.css';

const Gif =({gif}) => {
    const [openDialog, setOpenDialog] = useState(false);

    const openGifDialogPopup = () => {
        setOpenDialog(old => !old);
    }

    return (
        <>
            <img
                key={gif.id}
                src={gif.images.fixed_height.url}
                alt={gif.username}
                className="gifStyle"
                onClick={() => openGifDialogPopup()}
            />
            {
                openDialog ? <DialogPopup gifId={gif.id} gifUrl={gif.images.fixed_height.url} gifUsername={gif.username} openDialog={openDialog}/> : <></>
            }
        </>
    )
}

export default Gif;