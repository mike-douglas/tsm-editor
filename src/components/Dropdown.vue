<template>
  <div class="dropdown" v-bind:style="positionCSS">
    <ul>
      <li v-for="(item, index) in symbols"
          v-bind:key="'symbol' + index"
          v-on:click="didChooseOption(item)"
          v-bind:class="index === selectedIndex ? 'selected' : ''">
        <span class="name">{{ index }}: {{ item.name }}</span>
        <span class="definition">{{ item.definition }}</span>
      </li>
      <li v-for="(item, index) in functions"
          v-bind:key="'function' + index"
          v-on:click="didChooseOption(item)"
          v-bind:class="(index + symbols.length) === selectedIndex ? 'selected': ''">
        <span class="name">{{ index + symbols.length }} {{ item.name }}</span>
        (
          <span class="argument"
          v-for="(arg, i) in item.args"
          v-bind:key="arg">
            {{ arg }}
            <span v-if="i == functions.length - 1">,</span>
          </span>
        )
        <span class="definition">{{ item.definition }}</span>
      </li>
    </ul>
    <div>Selected Option: {{ selectedIndex }}</div>
    <div class="position">Position: {{ position.x }}, {{ position.y }}</div>
  </div>
</template>

<script>
import { Position } from '@/lib/position';

export default {
  name: 'Dropdown',
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
      return {
        position: 'absolute',
        left: `${this.position.x}px`,
        top: `${this.position.y}px`,
        visibility: this.visible ? 'visible' : 'hidden',
      };
    },
  },
};
</script>

<style scoped>
.dropdown {
  position: absolute;
  background-color: #ccc;
  min-width: 20em;
  min-height: 4em;
  padding: 1em;
}

li.selected {
  font-weight: bold;
}

</style>
