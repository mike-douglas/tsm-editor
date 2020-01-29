<template>
  <div class="reference">
    <section>
      <h2>Functions</h2>
      <FunctionReference
        v-for="(func, index) in functions"
        v-bind:key="'function' + index"
        v-bind:item="func" />
    </section>
    <section>
      <h2>Symbols</h2>
      <SymbolReference
        v-for="(symbol, index) in specialFeatures"
        v-bind:key="'feat' + index"
        v-bind:item="symbol" />
      <SymbolReference
        v-for="(symbol, index) in symbols"
        v-bind:key="'symbol' + index"
        v-bind:item="symbol" />
    </section>
  </div>
</template>

<script>
import { functions, symbols, specialFeatures } from '@/lib/definitions';

import FunctionReference from '@/components/FunctionReference.vue';
import SymbolReference from '@/components/SymbolReference.vue';

export default {
  name: 'CommandReference',
  components: {
    FunctionReference,
    SymbolReference,
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
</style>
