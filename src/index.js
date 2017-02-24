import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCvfOO8OhsJ6Cmalo1XM56Ur88nTRjMwgc",
  authDomain: "eramal-ac22b.firebaseapp.com",
  databaseURL: "https://eramal-ac22b.firebaseio.com"
};
//storageBucket: "eramal-ac22b.appspot.com",
//messagingSenderId: "678138007903"
firebase.initializeApp(config);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
