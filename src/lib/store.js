/* eslint-disable no-console */
import { deserialize, serializeAndSave } from '@/lib/serializer';

const defaultValue = deserialize() || '50 % DBMarket';

console.log('Initial state: ', defaultValue);

const store = {
  debug: false,
  state: {
    formula: defaultValue,
  },
  setCurrentFormula(newValue) {
    if (this.debug) {
      console.log(`Old State: ${this.state.formula}`);
      console.log(`New State: ${newValue}`);
    }
    this.state.formula = newValue;
  },
  clearFormula() {
    if (this.debug) {
      console.log('Clearing current formula value');
    }
    this.state.formula = '';
  },
};

window.setInterval(() => {
  serializeAndSave(store.state.formula);
}, 3000);

export default store;
