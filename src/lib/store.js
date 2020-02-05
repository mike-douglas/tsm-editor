/* eslint-disable no-console */
import Vue from 'vue';
import Vuex from 'vuex';

import { serializeAndSave, deserialize } from '@/lib/serializer';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    debug: false,
    priceString: 'check(first(Crafting, DBMarket, DBRegionMarketAvg), max(0.25 * avg(Crafting, DBMarket, DBRegionMarketAvg), 1.5 * VendorSell))',
    saveTimeout: null,
    cleanUpFlag: true,
    selectCallback: null,
  },
  mutations: {
    saveString(state, newValue) {
      state.priceString = newValue;
    },
    setSelectCallback(state, newValue) {
      state.selectCallback = newValue;
    },
    setCleanupFlag(state, newValue) {
      state.cleanUpFlag = newValue;
    },
    clearSaveTimeout(state) {
      state.saveTimeout = null;
    },
    setSaveTimeout(state, newValue) {
      state.saveTimeout = newValue;
    },
  },
  actions: {
    async loadFromLocation() {
      return deserialize();
    },
    async saveToLocation({ commit, state }) {
      if (state.saveTimeout) {
        window.clearTimeout(state.saveTimeout);
        commit('clearSaveTimeout');

        if (state.debug) {
          console.log('Canceled save...');
        }
      }

      const t = window.setTimeout(() => {
        serializeAndSave(state.priceString).catch(console.log);

        if (state.debug) {
          console.log('Saved...');
        }
      }, 1000);

      commit('setSaveTimeout', t);
    },
  },
});
