import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Main from './Main';
import Dashboard from './Dashboard';
import TextAnalysis from './TextAnalysis';


class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header"> */}
          <Header />
          <Main />
          <Dashboard />
          <TextAnalysis />
        {/* </header> */}
      </div>
    );
  }
}


export default App

