<template>
  <li class="dropdown-row panel">
    <span class="name" v-html="stylizeString(`${item.name}(${item.args.join(', ')})`)"></span>
    <Icon class="function" name="curly" />
    <p class="definition">
      {{ item.definition }}
    </p>
  </li>
</template>

<script>
import stylizeString from '@/lib/stylizer';

import Icon from '@/components/Icon.vue';

export default {
  name: 'FunctionDropdown',
  components: {
    Icon,
  },
  props: {
    item: Object,
  },
  methods: {
    stylizeString,
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
  font-size: $ts-xs;
  opacity: 0.5;
}

.definition {
  clear: both;
  margin: 0;
  font-size: $ts-xs;
}
</style>
