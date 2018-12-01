import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';

class App extends Component {
  render() {
    return <h1>yhack</h1>
  }
}


// Retrieve Firebase Messaging object.
const messaging = firebase.messaging();


export default App;
