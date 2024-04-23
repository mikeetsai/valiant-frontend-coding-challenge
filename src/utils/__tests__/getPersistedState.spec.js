import { getPersistedState } from '@/utils';

const key = 'unit-test';

describe('getPersistedState', () => {
  it('returns the persisted state', async () => {
    localStorage.setItem(key, JSON.stringify({ test: 'test' }));

    const result = await getPersistedState(key);
    expect(result).toEqual({ test: 'test' });
  });
});
