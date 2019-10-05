import React from 'react';
import "./index.css";
import GifTranslation from './components/GifTranslation';
const App = ({ title }) =>
    <div className='main'>
        <h3>{title}</h3>
        <GifTranslation/>
    </div>

export default App;