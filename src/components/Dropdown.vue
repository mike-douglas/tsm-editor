<template>
  <div class="dropdown" v-bind:style="positionCSS">
    <ul>
      <li>{{ position.x }}</li>
      <li>{{ position.y }} </li>
      <li>Option 1</li>
      <li>Option 2</li>
      <li>Option 3</li>
      <li>Option 4</li>
    </ul>
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
</style>
