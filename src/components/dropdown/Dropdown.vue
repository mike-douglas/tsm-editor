<template>
  <div class="dropdown panel" :style="positionCSS">
    <ul>
      <SymbolDropdown
        v-for="(item, index) in results.symbols"
        @click.native="onClickItem(item)"
        @mouseover.native="onHoverItem(index)"
        :item="item"
        :key="'symbol' + index"
        :class="index === value ? 'selected' : ''" />
      <FunctionDropdown
        v-for="(item, index) in results.functions"
        @click.native="onClickItem(item)"
        @mouseover.native="onHoverItem(index + results.symbols.length);"
        :item="item"
        :key="'function' + index"
        :class="(index + results.symbols.length) === value ? 'selected': ''" />
    </ul>
    <div class="hint">
      <Icon name="info" /> Hit enter or tab to insert
    </div>
    <div class="debug-panel panel" v-show="debug">
      <div>Active Option: {{ selectedIndex }}</div>
      <div class="position">Position: {{ position.x }}, {{ position.y }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dropdown {
  padding: 0;
  position: absolute;
  background-color: $dropdown-background;
  min-width: 20em;
  max-width: 25em;
  font-size: $ts-xs;
  font-family: $page-font;
  border: 2px solid $dropdown-border;
  border-radius: $border-radius;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
}

.dropdown ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.selected {
  background-color: $dropdown-hover;
}

.hint {
  font-size: $ts-tiny;
  color: $txt-faded;
  padding: $padding;
  text-align: right;
}
</style>

<script>
import { Position } from '@/lib/position';

import FunctionDropdown from '@/components/dropdown/FunctionDropdown.vue';
import SymbolDropdown from '@/components/dropdown/SymbolDropdown.vue';
import Icon from '@/components/Icon.vue';

export default {
  name: 'Dropdown',
  components: {
    FunctionDropdown,
    SymbolDropdown,
    Icon,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    position: {
      type: Object,
      default() {
        return new Position(0, 0);
      },
    },
    value: Number,
    results: Object,
    debug: Boolean,
  },
  data: () => ({
    selectedIndex: {
      get: () => this.value,
      set: newValue => this.onHoverItem(newValue),
    },
  }),
  methods: {
    onClickItem(item) {
      this.$emit('change', item);
    },
    onHoverItem(index) {
      this.$emit('input', index);
    },
  },
  computed: {
    positionCSS() {
      let leftPosition = this.position.x;

      if (this.$el) {
        const bounds = this.$el.getBoundingClientRect();
        leftPosition = Math.min(leftPosition, window.innerWidth - bounds.width);
      }

      return {
        position: 'absolute',
        left: `${leftPosition}px`,
        top: `${this.position.y}px`,
        visibility: this.visible ? 'visible' : 'hidden',
      };
    },
  },
};
</script>
