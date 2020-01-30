/* eslint-disable no-console */
const store = {
  debug: true,
  state: {
    formula: '50 % DBMarket',
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

export default store;
