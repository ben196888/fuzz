import React, { Component } from 'react';
import getRatios from './getRatios';
import logo from './logo.svg';
import './App.css';

const DEFAULT_COM_OBJ = {
  string1: '',
  string2: '',
};

class App extends Component {

  constructor() {
    super();

    this.getComparison = this.getComparison.bind(this);

    this.state = {
      list: [],
    };
  }

  getComparison(com_obj, index) {
    const { string1, string2 } = com_obj;
    return (
      <li key={index}>
        <span>
          <label>String 1</label>
          <input onChange={(e) => {
            e.stopPropagation();
            const value = e.target.value.trim();
            const list = this.state.list;
            list[index].string1 = value;
            this.setState({ list });
          }} />
        </span>
        <span>
          <label>String 2</label>
          <input onChange={(e) => {
            e.stopPropagation();
            const value = e.target.value.trim();
            const list = this.state.list;
            list[index].string2 = value;
            this.setState({ list });
          }} />
        </span>
        <br />
        Ratios: {getRatios(string1, string2)}
      </li>
    );
  }

  render() {

    const list = this.state.list;
    const comparisons = list.map(this.getComparison);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">FuzzyWuzzy String compare</h1>
        </header>
        <div className="App-intro">
          <button onClick={() => {
            this.setState({
              list: [...list, DEFAULT_COM_OBJ],
            });
          }}>Add new comparison</button>
          <ul>
            { comparisons }
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
