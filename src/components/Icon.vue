<template>
  <img src="@/assets/icons/nope.svg" class="icon">
</template>

<script>
export default {
  name: 'Icon',
  props: {
    name: {
      type: String,
      default: 'nope',
    },
  },
};
</script>

<style scoped>
.icon {
  display: inline-block;
  width: 1.0em;
  height: 1.0em;
  filter: invert(1);
}

.nope {
  background: url('../assets/icons/nope.svg');
  background-size: 1.0em 1.0em;
  fill: white;
  filter: hue-rotate(220deg)
}
</style>
