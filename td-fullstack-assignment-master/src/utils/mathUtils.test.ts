/* eslint-env mocha */
import { describe, it } from '@jest/globals';

import { expect } from 'chai';
import { detectSums } from './mathUtils';

describe('Detect sums', () => {
  const testCases = [
    {
      input: [1, 2, 3],
      expected: [{ pA: 0, pB: 1, pSum: 2 }]
    },
    {
      input: [1, 2, 3, 4],
      expected: [
        { pA: 0, pB: 1, pSum: 2 }, // 1 + 2 = 3
        { pA: 0, pB: 2, pSum: 3 }  // 1 + 3 = 4
      ]
    },
    {
      input: [3, 0, 3],
      expected: [
        { pA: 0, pB: 1, pSum: 2 }, // 3 + 0 = 3
        { pA: 1, pB: 2, pSum: 0 }  // 0 + 3 = 3
      ]
    },
    {
      input: [1, 2, 4],
      expected: []
    },
    {
      input: [3, 0, 2],
      expected: []
    },
    {
      input: [1, 2, 3, 4, 5],
      expected: [
        { pA: 0, pB: 1, pSum: 2 }, // 1 + 2 = 3
        { pA: 0, pB: 2, pSum: 3 }, // 1 + 3 = 4
        { pA: 0, pB: 3, pSum: 4 }, // 1 + 4 = 5
        { pA: 1, pB: 2, pSum: 4 }  // 2 + 3 = 5
      ]
    },
    {
      input: [1, 2, 1, 3],
      expected: [
        { pA: 0, pB: 1, pSum: 3 }, // 1 + 2 = 3
        { pA: 0, pB: 2, pSum: 1 }, // 1 + 1 = 2
        { pA: 1, pB: 2, pSum: 3 }  // 2 + 1 = 3
      ]
    },
    {
      input: [1, 2, 1, 2, 3],
      expected: [
        { pA: 0, pB: 1, pSum: 4 }, // 1 + 2 = 3
        { pA: 0, pB: 2, pSum: 1 }, // 1 + 1 = 2
        { pA: 0, pB: 2, pSum: 3 }, // 1 + 1 = 2
        { pA: 0, pB: 3, pSum: 4 }, // 1 + 2 = 3
        { pA: 1, pB: 2, pSum: 4 }, // 2 + 1 = 3
        { pA: 2, pB: 3, pSum: 4 }  // 1 + 2 = 3
      ]
    }
  ];

  testCases.forEach(({ input, expected }) => {
    it(`should detect sums for input [${input}]`, () => {
      const result = detectSums(input);
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(expected.length);
      expect(result).to.deep.equal(expected);
    });
  });
});
