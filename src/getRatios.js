import fuzz from 'fuzzball';

function getRatios(string1, string2) {
    const sr = fuzz.ratio(string1, string2);
    const pr = fuzz.partial_ratio(string1, string2);
    const tst = fuzz.token_set_ratio(string1, string2);
    const tsr = fuzz.token_sort_ratio(string1, string2);
    const d = fuzz.distance(string1, string2);

    const result = `SR: ${sr}, PR: ${pr}, TST: ${tst}, TSR: ${tsr}, D: ${d}`;
    return result;
};

export default getRatios;
