import moment from 'moment';

const COMMOM = {
  minute: 0,
  second: 0,
  millisecond: 0,
};
const Day = [1, 2, 3];
const Time = [
  { hour: 11 },
  { hour: 11, minute: 30 },
  { hour: 12, minute: 30 },
  { hour: 13 },
  { hour: 14 },
];

const TODAY = moment();

const getEventTime = ({ poolIndex, tupleIndex }) => {
  const offsetDay = poolIndex % Day.length;
  const offsetTime = tupleIndex % Time.length;
  return moment(TODAY).add({ day: Day[offsetDay] }).set({
    ...COMMOM,
    ...Time[offsetTime],
  }).toISOString();
};

export default getEventTime;
