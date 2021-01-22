<template>
  <li class="dropdown-row panel">
    <Icon class="icon" name="symbol" />
    <Syntax class="name" :code="item.name" />
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
  opacity: 0.5;
}

.name {
  font-size: $ts-normal;
}

.definition {
  clear: both;
  margin: $padding-sm 0 0 0;
  font-size: $ts-sm;
}
</style>
