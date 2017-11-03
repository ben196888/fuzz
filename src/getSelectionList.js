import range from 'lodash/range';
import replace from 'lodash/replace';
import { getSSData, getRSData } from './getData';

const SSEventObj = getSSData();
const RSEventObj = getRSData();

function getFlattenSelectionTemplate(eventObj) {
  const markets = eventObj.Markets || [];
  return markets.reduce((arr, market) => {
    const marketId = market.Id;
    const marketName = market.Name;
    const selections = market.Selections || [];
    const selectionNames = selections.map(selection => {
      const selectionId = selection.Id;
      const selectionName = selection.Name;
      return {
        marketId,
        selectionId,
        name: `${marketName} ${selectionName}`,
      };
    });
    return [...arr, ...selectionNames];
  }, []);
}

const SSFlattenSelectionTemplate = getFlattenSelectionTemplate(SSEventObj);
const RSFlattenSelectionTemplate = getFlattenSelectionTemplate(RSEventObj);

const HOME_NAME = '<SPECIALTEAMHOMENAME>';
const AWAY_NAME = '<SPECIALTEAMAWAYNAME>';
const compare = (objA, objB) => {
  const a = (objA.name.includes(HOME_NAME) || objA.name.includes(AWAY_NAME));
  const b = (objB.name.includes(HOME_NAME) || objB.name.includes(AWAY_NAME));
  return b - a;
}

SSFlattenSelectionTemplate.sort(compare);
RSFlattenSelectionTemplate.sort(compare);

const PATTERN = [new RegExp('<SPECIALTEAMAWAYNAME>', 'g'), new RegExp('<SPECIALTEAMHOMENAME>', 'g')];

export function getSSSelectionList(teamTuple) {
  return SSFlattenSelectionTemplate.map(obj => {
    const name = range(2).reduce((oldName, i) => {
      return replace(oldName, PATTERN[i], teamTuple[i]);
    }, obj.name);
    return {
      ...obj,
      name,
    };
  });
}

export function getRSSelectionList(teamTuple) {
  return RSFlattenSelectionTemplate.map(obj => {
    const name = range(2).reduce((oldName, i) => {
      return replace(oldName, PATTERN[i], teamTuple[i]);
    }, obj.name);
    return {
      ...obj,
      name,
    };
  });
}
