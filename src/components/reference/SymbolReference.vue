<template>
  <div class="symbol">
    <Syntax class="name" :code="item.name" />
    <p class="definition">
      {{ item.definition }}
    </p>
  </div>
</template>

<script>
import Syntax from '@/components/Syntax.vue';
import { kwTags } from '@/lib/definitions';

export default {
  name: 'SymbolReference',
  components: {
    Syntax,
  },
  props: {
    item: Object,
  },
  computed: {
    tags() {
      if (!this.item.tags) {
        return [];
      }
      return this.item.tags.filter(t => t === kwTags.PRICE_SOURCE || t === kwTags.VALUE_SOURCE);
    },
  },
};
</script>

<style lang="scss" scoped>
.symbol {
  position: relative;
}

.name {
  font-weight: bold;
  font-size: $ts-med;
  display: block;
  padding-bottom: $padding-sm;
  border-bottom: 1px solid adjust-color($editor-border, $alpha: -0.8);
}

.definition {
  font-size: $ts-normal;
  line-height: $line-height;
  margin: $padding-sm 0 $padding-xl 0;
}
</style>
