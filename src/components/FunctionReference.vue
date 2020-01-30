<template>
  <div>
    <span class="name" v-html="stylizeString(`${item.name}(${item.args.join(', ')})`)"></span>
    <p class="definition">
      {{ item.definition }}
    </p>
  </div>
</template>

<script>
import stylizeString from '@/lib/stylizer';

export default {
  name: 'FunctionReference',
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
  color: $txt-faded;
  font-weight: bold;
  font-family: $editor-font;
  font-size: $ts-normal;
}

.definition {
  font-size: $ts-sm;
  margin: $padding-sm 0 $padding-xl 0;
}
</style>
