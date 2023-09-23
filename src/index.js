import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Main from './Main';
import reportWebVitals from './reportWebVitals';
import musicFile from './music.mp3'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <audio controls>
        <source src={musicFile} type='audio/mp3' />
        Your browser does not support the audio element.
    </audio>
    <p className='rightMusicPlayerText'>Song: Going Crazy by TREASURE. You better play it.</p>
    <Main />
    {/* <App /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
