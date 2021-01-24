<template>
  <li class="dropdown-row panel">
    <Syntax class="name" :code="`${item.name}(${item.args.join(', ')})`" />
    <Icon class="icon" name="function" />
    <span class="definition" v-html="definition">
    </span>
  </li>
</template>

<script>
import Icon from '@/components/Icon.vue';
import Syntax from '@/components/Syntax.vue';

import marked from 'marked';

export default {
  name: 'FunctionDropdown',
  components: {
    Icon,
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
.dropdown-row {
  cursor: pointer;
  border-bottom: 1px solid $dropdown-separator;
}

.dropdown-row:hover {
  background-color: $dropdown-hover;
}

.icon {
  float: right;
  opacity: 0.5;
}

.name {
  font-size: $ts-normal;
}

.definition {
  clear: both;
  font-size: $ts-sm;
}
</style>
