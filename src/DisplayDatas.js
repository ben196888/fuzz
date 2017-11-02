import React, { Component } from 'react';
import genTeamTuples from './genTeamTuples';
import getCombinations from './getCombinations';
import { getRSSelectionList, getSSSelectionList } from './getSelectionList';

const TEAM_TUPLES = genTeamTuples();
const TEAM_TUPLES_SIZE = TEAM_TUPLES.length;
const POOL_SIZE = 1;
const EVENT_SIZE = 1;

class DisplayDatas extends Component {
  constructor() {
    super();

    this.state = {
      pool: [],
      SSEvents: [],
      RSEvents: [],
    };
  }

  render() {
    const RSEvents = this.state.RSEvents;
    const SSEvents = this.state.SSEvents;
    const RSTeamTuples = RSEvents.map(v => TEAM_TUPLES[v]);
    const SSTeamTuples = SSEvents.map(v => TEAM_TUPLES[v]);

    console.log(RSTeamTuples.map(teamTuple => getRSSelectionList(teamTuple)));
    console.log(SSTeamTuples.map(teamTuple => getSSSelectionList(teamTuple)));

    return (
      <div>
        <button onClick={() => {
          const pool = getCombinations(TEAM_TUPLES_SIZE, POOL_SIZE);
          this.setState({
            ...this.state,
            pool,
            SSEvents: [],
            RSEvents: [],
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
          });
        }}>
          Get RS and SS selections
        </button>
        <div>{`Team Tuples size: ${TEAM_TUPLES_SIZE}, Pool size: ${POOL_SIZE}, Selection size: ${EVENT_SIZE}`}</div>
        <div>{this.state.pool.reduce((s, v) => `${s}${v}, `, 'Pool Candidates: ')}</div>
        <div>{this.state.RSEvents.reduce((s, v) => `${s}${v}, `, 'RSEvents: ')}</div>
        <div>{this.state.SSEvents.reduce((s, v) => `${s}${v}, `, 'SSEvents: ')}</div>
      </div>
    );
  }
}

export default DisplayDatas;
