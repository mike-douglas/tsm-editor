<template>
  <i :class="`icon ${name}`"></i>
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

<style lang="scss" scoped>
.icon {
  font-family: "Batch";
  font-size: 1.0em;
  line-height: inherit;
  display: inline-block;
  font-style: normal;
  font-weight: normal !important;
}
</style>
