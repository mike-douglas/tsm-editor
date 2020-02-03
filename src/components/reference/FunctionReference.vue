<template>
  <div>
    <Syntax class="name" :code="`${item.name}(${item.args.join(', ')})`" />
    <p class="definition">
      {{ item.definition }}
    </p>
  </div>
</template>

<script>
import Syntax from '@/components/Syntax.vue';

export default {
  name: 'FunctionReference',
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
  color: $txt-faded;
  font-weight: bold;
  font-size: $ts-normal;
}

.definition {
  font-size: $ts-sm;
  margin: $padding-sm 0 $padding-xl 0;
}
</style>
