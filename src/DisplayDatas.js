import React, { Component } from 'react';
import { getSSData, getRSData } from './getData';

class DisplayDatas extends Component {
  constructor() {
    super();
    this.getDisplayEventFromObj = this.getDisplayEventFromObj.bind(this);

    this.state = {
      SSData: {},
      RSData: {},
    };
  }

  componentDidMount() {
    const SSData = getSSData();
    const RSData = getRSData();
    this.setState({
      ...this.state,
      SSData,
      RSData,
    });
  }

  getDisplayEventFromObj(eventObj) {
    const markets = eventObj.Markets || [];
    const eventName = <div>{eventObj.FixtureName}</div>;
    const combinedSelectionNames = markets.map(market => {
      const marketName = market.Name;
      const selections = market.Selections || [];
      const selectionNames = selections.map(selection => {
        const selectionName = selection.Name;
        return <div key={selection.Id}>{`${marketName} ${selectionName}`}</div>
      });
      return (
        <div key={market.Id}>
          {selectionNames}
        </div>
      )
    });

    return (
      <div>
        {eventName}
        {combinedSelectionNames}
      </div>
    )
  }


  render() {
    const SSEventObj = this.state.SSData;
    const RSEventObj = this.state.RSData;
    const SSDisplay = this.getDisplayEventFromObj(SSEventObj);
    const RSDisplay = this.getDisplayEventFromObj(RSEventObj);

    return (
      <div>
        <div style={{float: 'left'}}>{SSDisplay}</div>
        <div style={{float: 'right'}}>{RSDisplay}</div>
      </div>
    );
  }
}

export default DisplayDatas;
