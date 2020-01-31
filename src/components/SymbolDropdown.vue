<template>
  <li class="dropdown-row panel">
    <Syntax class="name" :code="item.name" />
    <Icon class="symbol" name="symbol" />
    <p class="definition">
      {{ item.definition }}
    </p>
  </li>
</template>

<script>
import Icon from '@/components/Icon.vue';
import Syntax from '@/components/Syntax.vue';

export default {
  name: 'SymbolDropdown',
  components: {
    Icon,
    Syntax,
  },
  props: {
    item: Object,
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
