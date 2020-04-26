import { findMatches } from '@/lib/definitions.js';

describe('findMatches', () => {
  '*[]()/\\'.split('').forEach((testCase) => {
    it(`correctly parses formulas with ${testCase}`, () => {
      expect(findMatches(`DBMarket ${testCase} 100`)).toHaveProperty('functions');
    });
  });
});
