<template>
  <li class="dropdown-row panel" :style="styles">
    <span class="name" v-html="stylizeString(item.name)"></span>
    <Icon class="symbol" name="merge" />
    <p class="definition">
      {{ item.definition }}
    </p>
  </li>
</template>

<script>
import styles from '@/lib/styles';
import stylizeString from '@/lib/stylizer';

import Icon from '@/components/Icon.vue';

export default {
  name: 'SymbolDropdown',
  components: {
    Icon,
  },
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

.icon {
  float: right;
  font-size: var(--size-extrasmall);
  opacity: 0.5;
}

.definition {
  clear: both;
  margin: 0;
  font-size: var(--size-extrasmall);
}
</style>
