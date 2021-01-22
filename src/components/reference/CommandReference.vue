<template>
  <div class="reference">
    <p>
      Includes the functions and strings from TSM 4.0+.
    </p>
    <p>
      <input class="search" placeholder="Search" type="search" v-model="searchTerm">
    </p>
    <section class="functions">
      <h2><Icon class="icon" name="function" />Functions</h2>
      <section v-if="filteredFunctions.length > 0" class="sub-panel">
        <FunctionReference class="row function-row"
          v-for="(func, index) in filteredFunctions"
          :key="'function' + index"
          :item="func" />
      </section>
      <section v-else class="not-found">
        No functions found.
      </section>
    </section>
    <section class="symbols">
      <h2><Icon class="icon" name="symbol" />Variables</h2>
      <section v-if="filteredSpecials.length > 0 || filteredSymbols.length > 0" class="sub-panel">
        <SymbolReference class="row symbol-row"
          v-for="(symbol, index) in filteredSpecials"
          :key="'feat' + index"
          :item="symbol" />
        <SymbolReference class="row symbol-row"
          v-for="(symbol, index) in filteredSymbols"
          :key="'symbol' + index"
          :item="symbol" />
      </section>
      <section v-else class="not-found">
        No symbols found.
      </section>
    </section>
  </div>
</template>

<script>
import { functions, symbols, specialFeatures } from '@/lib/definitions';

import FunctionReference from '@/components/reference/FunctionReference.vue';
import SymbolReference from '@/components/reference/SymbolReference.vue';
import Icon from '@/components/Icon.vue';

export default {
  name: 'CommandReference',
  components: {
    FunctionReference,
    SymbolReference,
    Icon,
  },
  data() {
    return {
      searchTerm: '',
    };
  },
  computed: {
    filteredFunctions() {
      return this.searchTerm.length >= 2
        ? functions.filter(f => f.name.includes(this.searchTerm) === true, this)
        : functions;
    },
    filteredSymbols() {
      return this.searchTerm.length >= 2
        ? symbols.filter(s => s.name.includes(this.searchTerm) === true, this)
        : symbols;
    },
    filteredSpecials() {
      return this.searchTerm.length >= 2
        ? specialFeatures.filter(s => s.name.includes(this.searchTerm) === true, this)
        : specialFeatures;
    },
  },
};
</script>

<style lang="scss" scoped>
.icon {
  font-size: $ts-xl;
  margin-right: $padding-sm;
}

.search {
  font-size: $ts-normal;
  color: $txt-normal;
  padding: $padding-normal;
  border: 1px solid $editor-border;
  background-color: $editor-background;
  min-width: 30%;
  border-radius: $border-radius;
}

.not-found {
  color: adjust-color($txt-normal, $lightness: -50%);
  padding: $padding-normal;
}

.search:focus, .search:active {
  border-color: $editor-border;
}

.sub-panel {
  display: flex;
  flex-direction: ltr;
  flex-wrap: wrap;
}

.row {
  flex: 0 0 auto;
  width: 25%;
  min-height: 120px;
  margin: $padding-sm;
  padding: $padding-med $padding;
}

@media only screen and (max-width : $mobile-breakpoint) {
  .search {
    width: 100%;
  }

  .sub-panel {
    margin: 0;
    padding: 0;
    display: block;
  }

  .row {
    flex: none;
    width: auto;
    display: block;
  }
}
</style>
