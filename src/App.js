import React, { Component } from 'react';
import getRatios from './getRatios';
import logo from './logo.svg';
import './App.css';

const KEYS = ['string1', 'string2'];
const DEFAULT_COM_OBJ = KEYS.reduce((arr, k) => ({...arr, k: ''}), {});

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
    const inputs = KEYS.map((k) => (
      <div key={`${index}_${k}`}>
        <label>{k}</label>
        <input className="Input-compare" onChange={(e) => {
          e.stopPropagation();
          const value = e.target.value.trim();
          const list = this.state.list;
          list[index] = {
            ...list[index],
            [k]: value,
          };
          this.setState({ list });
        }} />
      </div>
    ));
    return (
      <li key={index}>
        {inputs}
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
          }}>
            Add new comparison
          </button>
          <ul className="Ul-compare">{comparisons}</ul>
        </div>
      </div>
    );
  }
}

export default App;
