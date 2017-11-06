import TeamNamesMap from './data/NBA_Team_Names.json';

function genTeamTuples(key = false) {
  const TeamNames = key ? Object.keys(TeamNamesMap) : Object.values(TeamNamesMap);
  return TeamNames.reduce((arr, teamA) => {
    const teamBList = TeamNames.filter(teamName => teamName !== teamA);
    const tuples = teamBList.map(teamB => {
      return [teamA, teamB];
    });
    return [...arr, ...tuples];
  }, []);
}

export default genTeamTuples;
