import React from 'react';
import "./index.css";
import GifTranslation from './components/GifTranslation';
const App = ({ title }) =>
    <div>
        <h3 className='title'>{title}</h3>
        <div className='main'>
            <GifTranslation />
        </div>
    </div>

export default App;