/* eslint-disable no-console */
import Vue from 'vue';
import Vuex from 'vuex';

import { serializeAndSave, deserialize } from '@/lib/serializer';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    debug: false,
    formula: 'check(first(Crafting, DBMarket, DBRegionMarketAvg), max(0.25 * avg(Crafting, DBMarket, DBRegionMarketAvg), 1.5 * VendorSell))',
    lastSave: null,
    cleanUp: true,
  },
  mutations: {
    save(state, newValue) {
      state.formula = newValue;
    },
    updateCleanUp(state, newValue) {
      state.cleanUp = newValue;
    },
    clearSaveTimeout(state) {
      state.lastSave = null;
    },
    startNewTimeout(state, newValue) {
      state.lastSave = newValue;
    },
  },
  actions: {
    async loadFromLocation() {
      return deserialize();
    },
    async saveToLocation({ commit, state }) {
      if (state.lastSave) {
        window.clearTimeout(state.lastSave);
        commit('clearSaveTimeout');

        if (state.debug) {
          console.log('Canceled save...');
        }
      }

      const t = window.setTimeout(() => {
        serializeAndSave(state.formula).catch(console.log);

        if (state.debug) {
          console.log('Saved...');
        }
      }, 1000);

      commit('startNewTimeout', t);
    },
  },
});
