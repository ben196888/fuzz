import React, { Component } from 'react';
import Comparasion from './Comparasion';
import DisplayDatas from './DisplayDatas';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      tab: 0,
    };
  }

  render() {
    const Content = this.state.tab ? DisplayDatas : Comparasion;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">FuzzyWuzzy String compare</h1>
        </header>
        <div className="App-intro">
          <button onClick={() => {
            this.setState({
              ...this.state,
              tab: !this.state.tab,
            });
          }}>
            Swap Tab
          </button>
          <Content />
        </div>
      </div>
    );
  }
}

export default App;
