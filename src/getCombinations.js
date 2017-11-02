import range from 'lodash/range';
import random from 'lodash/random';

function getCombinations(n, m) {
  return range(n - m, n).reduce((arr, j) => {
    const t = random(0, j);
    return arr.includes(t) ? [...arr, j] : [...arr, t];
  }, []);
}

export default getCombinations;
