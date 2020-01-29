<template>
  <div class="reference">
    <section>
      <h2>Symbols</h2>
      <div v-for="(symbol, index) in symbols"
          v-bind:key="'symbol' + index">
        {{ symbol.name }}
      </div>
    </section>
    <section>
      <h2>Functions</h2>
      <div v-for="(func, index) in functions"
          v-bind:key="'function' + index">
        {{ func.name }}
      </div>
    </section>
  </div>
</template>

<script>
import { functions, symbols } from '@/lib/definitions';

export default {
  name: 'CommandReference',
  data() {
    return {
      symbols,
      functions,
    };
  },
};
</script>

<style scoped>
.reference {
  display: table-row;
}

section {
  display: table-cell;
  width: 50%;
}
</style>
