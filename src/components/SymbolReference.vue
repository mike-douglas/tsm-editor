<template>
  <div :style="styles">
    <span class="name" v-html="stylizeString(item.name)"></span>
    <p class="definition">
      {{ item.definition }}
    </p>
  </div>
</template>

<script>
import styles from '@/lib/styles';
import stylizeString from '@/lib/stylizer';

export default {
  name: 'SymbolReference',
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
.name {
  font-weight: bold;
  font-family: var(--panel-font);
  font-size: var(--size-normal);
}

.definition {
  font-size: var(--size-small);
  margin: var(--padding-small) 0 var(--padding-extralarge) 0;
}
</style>
