<template>
  <div>
    <span class="name" v-html="stylizeString(item.name)"></span>
    <p class="definition">
      {{ item.definition }}
    </p>
  </div>
</template>

<script>
import stylizeString from '@/lib/stylizer';

export default {
  name: 'SymbolReference',
  props: {
    item: Object,
  },
  methods: {
    stylizeString,
  },
};
</script>

<style lang="scss" scoped>
.name {
  font-weight: bold;
  font-family: $editor-font;
  font-size: $ts-normal;
}

.definition {
  font-size: $ts-sm;
  margin: $padding-sm 0 $padding-xl 0;
}
</style>
