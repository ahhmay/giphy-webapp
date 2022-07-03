import React, { useContext, memo } from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import ThemeContext from '../../common/ThemeContext';
import './DialogPopup.css';

const DialogPopup = ({gifUsername, gifUrl, openDialog}) => {
    const [open, setOpen] = React.useState(openDialog);
    const themeObject = useContext(ThemeContext);
    
    const toggleDialog = () => {
        setOpen(prev => !prev);
    };

    return (
        <>
        <Dialog className={`${themeObject.darkTheme ? 'dark':'light'}`} open={open} onClose={toggleDialog} >
            <DialogTitle>
                <span className="fs-4 font-weight-600">
                    {
                        gifUsername ? `@${gifUsername}` : ``
                    }
                </span>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <img src={gifUrl}/>
                </DialogContentText>
            </DialogContent>
        </Dialog>
        </>
    )
}
export default memo(DialogPopup);