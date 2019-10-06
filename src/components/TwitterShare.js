import React from 'react';
import { Button } from '@material-ui/core'

const TwitterShare = ({ url }) => {
const handleShare = () => {
    const twitterWindow = window.open('https://twitter.com/share?url=' + url, 'twitter-popup', 'height=350,width=600');
    if (twitterWindow.focus) twitterWindow.focus();
    return false;
}
return (
    <div>
        <Button variant="contained" color="primary" onClick={handleShare}>
            Tweet
        </Button>
    </div>
)}
export default TwitterShare;