<template>
  <div class="dropdown panel" v-bind:style="positionCSS">
    <ul>
      <SymbolDropdown
        v-for="(item, index) in symbols"
        v-on:click="didChooseOption(item)"
        v-bind:item="item"
        v-bind:key="'symbol' + index"
        v-bind:class="index === selectedIndex ? 'selected' : ''" />
      <FunctionDropdown
        v-for="(item, index) in functions"
        v-on:click="didChooseOption(item)"
        v-bind:item="item"
        v-bind:key="'function' + index"
        v-bind:class="(index + symbols.length) === selectedIndex ? 'selected': ''" />
    </ul>
    <div class="hint">
      <Icon name="bulb" /> Hit enter or tab to insert. Select with arrow keys.
    </div>
    <div class="debug-panel panel" v-show="debug">
      <div>Selected Option: {{ selectedIndex }}</div>
      <div class="position">Position: {{ position.x }}, {{ position.y }}</div>
    </div>
  </div>
</template>

<script>
import { Position } from '@/lib/position';

import FunctionDropdown from '@/components/FunctionDropdown.vue';
import SymbolDropdown from '@/components/SymbolDropdown.vue';
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
    functions: {
      type: Array,
      default() {
        return [];
      },
    },
    symbols: {
      type: Array,
      default() {
        return [];
      },
    },
    onSelect: Function,
    selectedIndex: Number,
    debug: Boolean,
  },
  methods: {
    didChooseOption(item) {
      if (this.onSelect) {
        this.onSelect(item);
      }
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

<style lang="scss" scoped>
.dropdown {
  padding: 0;
  position: absolute;
  background-color: $dropdown-background;
  min-width: 20em;
  font-size: $ts-xs;
  font-family: $page-font;
  border: 1px solid $dropdown-border;
  box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.25);
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
