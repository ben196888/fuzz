import TeamNames from './data/NBA_Team_Names.json';

function genTeamTuples() {
  return TeamNames.reduce((arr, teamA) => {
    const teamBList = TeamNames.filter(teamName => teamName !== teamA);
    const tuples = teamBList.map(teamB => {
      return [teamA, teamB];
    });
    return [...arr, ...tuples];
  }, []);
}

export default genTeamTuples;
