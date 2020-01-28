<template>
  <div class="dropdown" v-bind:style="{ left: position.x, top: position.y }">
    <ul>
      <li>Option 1</li>
      <li>Option 2</li>
      <li>Option 3</li>
      <li>Option 4</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    position: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style scoped>
.dropdown {
  position: relative;
  background-color: #ccc;
  min-width: 20em;
  min-height: 4em;
  padding: 1em;
}
</style>
