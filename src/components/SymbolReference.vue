<template>
  <div>
    <Syntax class="name" :code="item.name" />
    <p class="definition">
      {{ item.definition }}
    </p>
  </div>
</template>

<script>
import Syntax from '@/components/Syntax.vue';

export default {
  name: 'SymbolReference',
  components: {
    Syntax,
  },
  props: {
    item: Object,
  },
};
</script>

<style lang="scss" scoped>
.name {
  font-weight: bold;
  font-size: $ts-normal;
}

.definition {
  font-size: $ts-sm;
  margin: $padding-sm 0 $padding-xl 0;
}
</style>
