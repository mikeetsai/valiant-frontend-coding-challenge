import { addCommasToNumber } from '@/utils';

describe('Add commas to number', () => {
  it('return commas in number and convert to string', () => {
    const result = addCommasToNumber(1384);
    expect(result).toEqual('1,384');
  });
});
