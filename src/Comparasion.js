import React, { Component } from 'react';
import getRatios from './getRatios';

const KEYS = ['string1', 'string2'];
const DEFAULT_COM_OBJ = KEYS.reduce((arr, k) => ({...arr, k: ''}), {});
const DEFAULT_PARAMETERS = {
  sr: '0',
  pr: '0',
  tst: '100',
  tsr: '0',
  ptsr: '0',
  d: '0',
};
const DEFAULT_THRESHOLD = {
  threshold: '90',
};

class Comparasion extends Component {
  constructor() {
    super();
    this.getParamInputs = this.getParamInputs.bind(this);
    this.getThresholdInput = this.getThresholdInput.bind(this);
    this.getComparison = this.getComparison.bind(this);

    this.state = {
      list: [DEFAULT_COM_OBJ],
      ...DEFAULT_PARAMETERS,
      ...DEFAULT_THRESHOLD,
    };
  }

  getParamInputs() {
    return Object.keys(DEFAULT_PARAMETERS).map((k) => (
      <span key={k}>
        <label>{k}: {this.state[k]}</label>
        <input
          type="range"
          min="-100"
          max="100"
          step="5"
          value={this.state[k]}
          onChange={(e) => {
            e.stopPropagation();
            const value = e.target.value.trim();
            this.setState((prevState) => {
              return {
                ...prevState,
                [k]: value,
              };
            })
          }}
        />
      </span>
    ));
  }

  getThresholdInput() {
    return (
      <span>
        <label>Threshold</label>
        <input
          type="number"
          min="-100"
          max="100"
          step="1"
          value={this.state.threshold}
          onChange={(e) => {
            e.stopPropagation();
            const value = e.target.value.trim();
            this.setState((prevState) => {
              return {
                ...prevState,
                threshold: value,
              };
            })
          }}
        />
      </span>
    );
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
    const ratios = getRatios(string1, string2);
    const rate = Object.keys(DEFAULT_PARAMETERS).reduce((sum, k) => {
      const a = Number(this.state[k]);
      const b = Number(ratios[k]);
      return sum + a * b;
    }, 0);
    const mark = rate / 100;
    const matchDisplay = (mark >= this.state.threshold) ? 'Match' : 'Not Match';

    return (
      <li className="Li-compare" key={index}>
        Comparsion #{index}, {matchDisplay}, Mark: {mark}
        {inputs}
      </li>
    );
  }

  render() {
    const paramInputs = this.getParamInputs();
    const thresholdInput = this.getThresholdInput();
    const list = this.state.list;
    const comparisons = list.map(this.getComparison);

    return (
      <div>
        <div>
          <span className="Ul-param">{paramInputs}</span>
          {thresholdInput}
          <button onClick={() => {
            this.setState({
              list: [...list, DEFAULT_COM_OBJ],
            });
          }}>
            Add new comparison
          </button>
        </div>
        <ul className="Ul-compare">{comparisons}</ul>
      </div>
    );
  }
}

export default Comparasion;
