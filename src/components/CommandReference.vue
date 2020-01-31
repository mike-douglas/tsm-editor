<template>
  <div class="reference">
    <section class="functions">
      <h3><Icon name="function" /> Functions</h3>
      <section class="sub-panel">
        <FunctionReference class="function-row"
          v-for="(func, index) in functions"
          v-bind:key="'function' + index"
          v-bind:item="func" />
      </section>
    </section>
    <section class="symbols">
      <h3><Icon name="symbol" /> Variables</h3>
      <section class="sub-panel">
        <SymbolReference class="symbol-row"
          v-for="(symbol, index) in specialFeatures"
          v-bind:key="'feat' + index"
          v-bind:item="symbol" />
        <SymbolReference class="symbol-row"
          v-for="(symbol, index) in symbols"
          v-bind:key="'symbol' + index"
          v-bind:item="symbol" />
      </section>
    </section>
  </div>
</template>

<script>
import { functions, symbols, specialFeatures } from '@/lib/definitions';

import FunctionReference from '@/components/FunctionReference.vue';
import SymbolReference from '@/components/SymbolReference.vue';
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
      symbols,
      functions,
      specialFeatures,
    };
  },
};
</script>

<style scoped>
.functions {
  flex-grow: 1;
  flex-basis: 30%;
}

.symbols {
  flex-grow: 1;
  flex-basis: 70%;
}

.sub-panel {
  flex-direction: row;
  flex-wrap: wrap;
  display: flex;
}

.function-row {
  flex-basis: 50%;
}

.symbol-row {
  flex-basis: 30%;
  flex-grow: 0;
  flex-shrink: 0;
}
</style>
