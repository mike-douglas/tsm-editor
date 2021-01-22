<template>
  <div>
    <Syntax class="name" :code="`${item.name}(${item.args.join(', ')})`" />
    <span class="definition" v-html="definition">
    </span>
  </div>
</template>

<script>
import marked from 'marked';
import Syntax from '@/components/Syntax.vue';

export default {
  name: 'FunctionReference',
  components: {
    Syntax,
  },
  props: {
    item: Object,
  },
  computed: {
    definition() {
      return marked(this.item.definition);
    },
  },
};
</script>

<style lang="scss" scoped>
.name {
  color: $txt-faded;
  font-weight: bold;
  font-size: $ts-med;
  display: block;
  padding-bottom: $padding-sm;
  border-bottom: 1px solid adjust-color($editor-border, $alpha: -0.8);
}

.definition {
  font-size: $ts-normal;
  line-height: $line-height;
}
</style>
