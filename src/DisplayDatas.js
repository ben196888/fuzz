import React, { Component } from 'react';
import genTeamTuples from './genTeamTuples';
import getCombinations from './getCombinations';
import { getRSSelectionList, getSSSelectionList } from './getSelectionList';
import mapSelections from './mapSelections';

const SS_TEAM_TUPLES = genTeamTuples(false);
const RS_TEAM_TUPLES = genTeamTuples(true);
const TEAM_TUPLES_SIZE = SS_TEAM_TUPLES.length;
const POOL_SIZE = 1;
const EVENT_SIZE = 1;

class DisplayDatas extends Component {
  constructor() {
    super();

    this.state = {
      pool: [],
      SSEvents: [],
      RSEvents: [],
      results: [],
    };
  }

  render() {
    const SSEvents = this.state.SSEvents;
    const RSEvents = this.state.RSEvents;
    const SSTeamTuples = SSEvents.map(v => SS_TEAM_TUPLES[v]);
    const RSTeamTuples = RSEvents.map(v => RS_TEAM_TUPLES[v]);

    const queries = SSTeamTuples.map(teamTuple => getSSSelectionList(teamTuple))[0] || [];
    const choices = RSTeamTuples.map(teamTuple => getRSSelectionList(teamTuple))[0] || [];

    return (
      <div>
        <button onClick={() => {
          const pool = getCombinations(TEAM_TUPLES_SIZE, POOL_SIZE);
          this.setState({
            ...this.state,
            pool,
            SSEvents: [],
            RSEvents: [],
            results: [],
          });
        }}>
          Get Pool Candidates
        </button>
        <button onClick={() => {
          const pool = this.state.pool;
          if (pool.length !== POOL_SIZE) return;
          const RS = getCombinations(POOL_SIZE, EVENT_SIZE);
          const SS = getCombinations(POOL_SIZE, EVENT_SIZE);
          const RSEvents = RS.map(v => pool[v]);
          const SSEvents = SS.map(v => pool[v]);
          this.setState({
            ...this.state,
            RSEvents,
            SSEvents,
            results: [],
          });
        }}>
          Get RS and SS selections
        </button>
        <button onClick={() => {
          const results = mapSelections(queries, choices);
          this.setState(prevState => {
            return {
              ...prevState,
              results,
            };
          });
        }}>
          Get Selection Matching Result
        </button>
        <div>{`Team Tuples size: ${TEAM_TUPLES_SIZE}, Pool size: ${POOL_SIZE}, Selection size: ${EVENT_SIZE}`}</div>
        <div>{this.state.pool.reduce((s, v) => `${s}${v}, `, 'Pool Candidates: ')}</div>
        <div>{this.state.RSEvents.reduce((s, v) => `${s}${v}, `, 'RSEvents: ')}</div>
        <div>{this.state.SSEvents.reduce((s, v) => `${s}${v}, `, 'SSEvents: ')}</div>
        <div>
          {this.state.results.map((tuple, i) => {
            const bgStyle = tuple ? {} : { background: '#ccc' };
            return (
              <div key={i} style={bgStyle}>
                <span>{queries[i].name}</span>
                <span style={{float: 'right'}}>
                  {tuple ? `${tuple[0].name}, Mark: ${tuple[1]}` : 'Not Match'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default DisplayDatas;
