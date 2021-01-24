<template>
  <li class="dropdown-row panel">
    <Icon class="icon" name="symbol" />
    <Syntax class="name" :code="item.name" />
    <span class="definition" v-html="definition">
    </span>
  </li>
</template>

<script>
import Icon from '@/components/Icon.vue';
import Syntax from '@/components/Syntax.vue';

import marked from 'marked';

export default {
  name: 'SymbolDropdown',
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
  margin-bottom: 0;
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

::v-deep .definition p {
  margin: 0;
}
</style>
