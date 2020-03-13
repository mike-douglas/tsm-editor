/* eslint-disable no-console */
import Vue from 'vue';
import Vuex from 'vuex';

import { serializeAndSave, deserialize } from '@/lib/serializer';

Vue.use(Vuex);

export const UPDATE_PRICESTRING = 'UpdatePriceString';
export const UPDATE_CLEANUPFLAG = 'UpdateCleanupFlag';
export const UPDATE_SAVETIMEOUT = 'UpdateSaveTimeout';
export const UPDATE_DEBUG = 'UpdateDebugFlag';

export const GET_PRICESTRING = 'GetPriceString';
export const SAVE_PRICESTRING = 'SavePriceString';

export default new Vuex.Store({
  state: {
    debug: false,
    priceString: 'check(first(Crafting, DBMarket, DBRegionMarketAvg), max(0.25 * avg(Crafting, DBMarket, DBRegionMarketAvg), 1.5 * VendorSell))',
    saveTimeout: null,
    cleanUpFlag: true,
  },
  getters: {
    priceString: state => state.priceString,
    debug: state => state.debug,
    cleanUpSyntax: state => state.cleanUpFlag,
  },
  mutations: {
    [UPDATE_PRICESTRING](state, newString) {
      state.priceString = newString;
    },
    [UPDATE_CLEANUPFLAG](state, newFlag) {
      state.cleanUpFlag = newFlag;
    },
    [UPDATE_SAVETIMEOUT](state, newTimeout) {
      state.saveTimeout = newTimeout;
    },
    [UPDATE_DEBUG](state, newFlag) {
      state.debug = newFlag;
    },
  },
  actions: {
    async [GET_PRICESTRING]({ commit }) {
      const fulfilled = await deserialize()
        .then((restoredString) => {
          commit(UPDATE_PRICESTRING, restoredString);
          return restoredString;
        }).catch(() => {});

      return fulfilled;
    },
    async [SAVE_PRICESTRING]({ commit, state }) {
      if (state.saveTimeout) {
        window.clearTimeout(state.saveTimeout);
        commit(UPDATE_SAVETIMEOUT, null);

        if (state.debug) {
          console.log('Canceling pending save.');
        }
      }

      const t = window.setTimeout(() => {
        if (state.priceString !== undefined) {
          serializeAndSave(state.priceString).catch(console.log);

          if (state.debug) {
            console.log('Saved.');
          }
        }
      }, 1000);

      commit(UPDATE_SAVETIMEOUT, t);
    },
  },
});
