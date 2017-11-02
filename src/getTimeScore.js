import moment from 'moment';

/**
 * We need a function to score the two time is close enough.
 * Therefore I create a function score of distance with following properties.
 * ...... [WIP]
 * This function is base on exponential distribution y = lambda * e^(-lambda * x)
 * for scoring the time distance.
 * Where y as score s, x as distance d and lambda as 100.
 * We convert the probability p (0 <= p <= 0.01) by 10000 to score s (0 <= s <= 100).
 * Then we get the score of distance by s = 100 * e^(-d/100).
 * p = 1/100 * e^(-d/100)
 * s = 10000 * p
 *   = 10000 * 1/100 * e^(-d/100) = 100 * e^(-d/100)
 */
const getScoreFromDistance = (distance) => Math.round(100 * Math.E**(-distance / 100));

export default function getTimeScore(time1, time2, options = {
  base: 'm',
}) {
  const parsedTime1 = moment(time1);
  const parsedTime2 = moment(time2);
  const diffMS = Math.abs(parsedTime1.diff(parsedTime2));
  const diffS = diffMS / 1000;
  const diffM = diffS / 60;
  const diffH = diffM / 60;
  const diffD = diffH / 24;
  switch(options.base) {
  case 'ms':
    return getScoreFromDistance(diffMS);
  case 's':
    return getScoreFromDistance(diffS);
  case 'm':
    return getScoreFromDistance(diffM);
  case 'h':
    return getScoreFromDistance(diffH);
  case 'd':
    return getScoreFromDistance(diffD);
  default:
    return getScoreFromDistance(diffM);
  }
}
