import SSData from './data/SS_NBA_Sample.json';
import RSData from './data/RS_NBA_Sample.json';
import pick from 'lodash/pick';

const getSSSelections = selections => {
  const propsShouldPick = ['Id', 'Tags.name'];
  return selections.map(selection => {
    const props = pick(selection, propsShouldPick);
    const Id = props.Id;
    const Name = props.Tags.name;
    return {
      Id,
      Name,
    };
  });
};

const getSSMarkets = markets => {
  const propsShouldPick = ['Id', 'Tags.name', 'Selections'];
  return markets.map(market => {
    const props = pick(market, propsShouldPick);
    const Id = props.Id;
    const Name = props.Tags.name;
    const Selections = getSSSelections(props.Selections);
    return {
      Id,
      Name,
      Selections,
    };
  });
};

const getSSParticipants = participants => {
  return participants.map(participant => {
    const propsShouldPick = ['Name', 'Tags.HomeOrAway'];
    const props = pick(participant, propsShouldPick);
    return {
      Name: props.Name,
      Side: props.Tags.HomeOrAway.toLowerCase(),
    };
  });
};

const getSSEvent = object => {
  const propsShouldPick = ['Id', 'FixtureName', 'StartTime', 'Markets', 'Participants'];
  const props = pick(object, propsShouldPick);
  const Markets = getSSMarkets(props.Markets);
  const Participants = getSSParticipants(props.Participants);
  return {
    ...props,
    Markets,
    Participants,
  };
};

export function getSSData() {
  const result = getSSEvent(SSData);
  return result;
}

const getRSSelections = selections => {
  const propsShouldPick = ['id', 'name', 'side', 'handicap'];
  return selections.map(selection => {
    const props = pick(selection, propsShouldPick);
    const Id = props.id;
    const Side = (props.side) ? (props.side.toLowerCase() === 'h') ? '<TEAM_HOME>': '<TEAM_AWAY>' : '';
    const Handicap = (props.handicap) ? `${props.handicap}` : '';
    const Name = `${props.name} ${Handicap}`;
    return {
      Id,
      Name,
    };
  });
}

const getRSMarkets = markets => {
  const propsShouldPick = ['id', 'name', 'market_type', 'selections'];
  return markets.map(market => {
    const props = pick(market, propsShouldPick);
    const Id = props.id;
    const Name = props.name;
    const MarketType = props.market_type;
    const Selections = getRSSelections(props.selections);
    return {
      Id,
      Name,
      Selections,
    };
  });
};

const getRSParticipants = participants => {
  return participants.map(participant => {
    const propsShouldPick = ['side', 'name'];
    const props = pick(participant, propsShouldPick);
    const Name = props.name;
    const Side = props.side.toLowerCase();
    return {
      Name,
      Side,
    };
  });
};

const getRSEvent = object => {
  const propsShouldPick = ['id', 'name', 'start_time', 'markets', 'participants'];
  const props = pick(object, propsShouldPick);
  const Id = props.id;
  const FixtureName = props.name;
  const StartTime = props.start_time;
  const Markets = getRSMarkets(props.markets);
  const Participants = getRSParticipants(props.participants);
  return {
    Id,
    FixtureName,
    StartTime,
    Markets,
    Participants,
  };
};

export function getRSData() {
  const result = getRSEvent(RSData.event);
  return result;
}
