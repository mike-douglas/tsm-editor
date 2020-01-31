/* eslint-disable no-console */
import Vue from 'vue';
import Vuex from 'vuex';

import { serializeAndSave, deserialize } from '@/lib/serializer';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    debug: true,
    formula: 'dbminbuyout([Ghost Iron Ore]) matprice([Ink of Dreams]) dbmarket + convert(dbminbuyout, item:79251)',
    lastSave: null,
  },
  mutations: {
    save(state, newValue) {
      state.formula = newValue;
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
