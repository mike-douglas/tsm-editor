<template>
  <li class="dropdown-row panel" :style="styles">
    <span class="name" v-html="stylizeString(item.name)"></span>
    <p class="definition">
      {{ item.definition }}
    </p>
  </li>
</template>

<script>
import styles from '@/lib/styles';
import stylizeString from '@/lib/stylizer';

export default {
  name: 'SymbolDropdown',
  props: {
    item: Object,
  },
  methods: {
    stylizeString,
  },
  data() {
    return {
      styles,
    };
  },
};
</script>

<style scoped>
.dropdown-row {
  cursor: pointer;
  border-bottom: var(--sep-border) solid var(--sep-border-color);
}

.dropdown-row:hover {
  background-color: var(--float-bg-hover);
}

.definition {
  margin: 0;
  font-size: var(--size-extrasmall);
}
</style>
