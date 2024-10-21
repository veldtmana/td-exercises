interface Matches {
  pA: number;
  pB: number;
  pSum: number;
}

// note: there may be more than one sum for a given pair of pA and pB
const sumIndexes = (array: number[], i: number, j: number, sumVal: number): number[] =>
  array.reduce<number[]>((sumIndexes, val, index) => {
    if (index === i || index === j) { return sumIndexes; } // skip pA and pB important for .e.g [3,0,3]
    if (val === sumVal) { return [...sumIndexes, index]; }
    return sumIndexes;
  }, []);


export const detectSums = (array: number[]): Matches[] =>
  array.reduce<Matches[]>((matches, pA, i) => {
    return [
      ...matches,
      ...array.reduce((valMatches, pB, j) => {
        if (i === j) { return valMatches; } // same index

        const newMatches = sumIndexes(array, i, j, pA + pB)
          .map((sumIndex) => ({ pA: i, pB: j, pSum: sumIndex }));

        return [...valMatches, ...newMatches];
      }, [] as Matches[]),
    ]
  }, [] as Matches[])
  .sort((a, b) => a.pA - b.pA || a.pB - b.pB)
  .reduce<Matches[]>((uniqueMatches, match) => {
    if (uniqueMatches.some(obj => obj.pA === match.pB && obj.pA === match.pB)) {
      return uniqueMatches; // skip duplicate
    }
    return [...uniqueMatches, match];
  }, [])

