// Clone of the Microsoft Excel PMT function, see here for more information - https://support.microsoft.com/en-us/office/pmt-function-0214da64-9a63-4996-bc20-214433fa6441
const PMT = (rate:number, nper:number, pv:number, fv:number = 0, type:number = 0): number => {
  const pvif = Math.pow(1 + rate, nper);
  return rate === 0
    ? -(fv + pv) / nper
    : -(rate * (fv + (pvif * pv))) /
      ((-1 + pvif) * (1 + rate * (type)));
};

const addCommasToNumber = (x: number): string => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const getPersistedState = (key: string): any => {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
  return null;
};

const setPersistedState = (key: string, state: any): void => {
  localStorage.setItem(key, JSON.stringify(state));
};

export { PMT, addCommasToNumber, getPersistedState, setPersistedState };
