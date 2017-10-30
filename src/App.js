import React, { Component } from 'react';
import getRatios from './getRatios';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      string1: '',
      string2: '',
    };
  }

  getRatiosData() {
    const { string1, string2 } = this.state;
    return getRatios(string1, string2);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="lo
            go" />
          <h1 className="App-title">FuzzyWuzzy String compare</h1>
        </header>
        <p className="App-intro">
          <span>
            <label>String 1</label>
            <input onChange={(e) => {
              e.stopPropagation();
              const value = e.target.value.trim();
              this.setState({ string1: value });
            }} />
          </span>
          <span>
            <label>String 2</label>
            <input onChange={(e) => {
              e.stopPropagation();
              const value = e.target.value.trim();
              this.setState({ string2: value });
            }} />
          </span>
          <br />
          Ratios: {this.getRatiosData()}
        </p>
      </div>
    );
  }
}

export default App;
