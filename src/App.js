import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Main from './Main';
import Dashboard from './Dashboard';
import TextAnalysis from './TextAnalysis';


class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null // <-- add this line
    }
  }

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

