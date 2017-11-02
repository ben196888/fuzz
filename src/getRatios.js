import fuzz from 'fuzzball';

const OPTIONS = {
  full_process: false,
};

function getRatios(string1, string2) {
  const sr = fuzz.ratio(string1, string2, OPTIONS);
  const pr = fuzz.partial_ratio(string1, string2, OPTIONS);
  const tst = fuzz.token_set_ratio(string1, string2, OPTIONS);
  const tsr = fuzz.token_sort_ratio(string1, string2, OPTIONS);
  const ptsr = fuzz.partial_token_sort_ratio(string1, string2, OPTIONS);
  const d = fuzz.distance(string1, string2, OPTIONS);

  return { sr, pr, tst, tsr, ptsr, d };
};

export default getRatios;
