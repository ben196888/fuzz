import fuzz from 'fuzzball';

const processor = choice => choice.name.toLowerCase();

const options = {
  scorer: (Q, C, O) => {
    const q = Q.proc_sorted;
    const c = C.proc_sorted;
    const o = {
      ...O,
      full_process: false,
      proc_sorted: true,
      tokens: [Q.tokens, C.tokens],
    };
    const tst = fuzz.token_set_ratio(q, c, o);
    const tsr = fuzz.token_sort_ratio(q, c, o);
    return (tst + tsr)/2;
  },
  full_process: false,
  proc_sorted: true,
  cutoff: 60,
  limit: 1,
};

function mapSelections(queries, choices) {
  if (queries.length === 0 || choices.length === 0) return [];
  const startTime = performance.now();
  choices.forEach(choice => {
    const c = processor(choice);
    choice.tokens = fuzz.unique_tokens(c);
    choice.proc_sorted = fuzz.process_and_sort(c);
  });
  queries.forEach(query => {
    const q = processor(query);
    query.tokens = fuzz.unique_tokens(q);
    query.proc_sorted = fuzz.process_and_sort(q);
  })
  const procTime = performance.now();
  const results = queries.map(query => fuzz.extract(query, choices, options)[0]);
  const queriesTime = performance.now();
  console.log(procTime - startTime, queriesTime - procTime);
  return results;
}

export default mapSelections;
