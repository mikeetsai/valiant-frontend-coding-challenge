import { setPersistedState } from '@/utils';

const key = 'unit-test';

describe('setPersistedState', () => {
  it('sets the persisted state', async () => {
    await setPersistedState(key, { test: 'test' });

    const result = JSON.parse(localStorage.getItem(key));
    expect(result).toEqual({ test: 'test' });
  });
});
