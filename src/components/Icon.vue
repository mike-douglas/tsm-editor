<template>
  <span class="icon">
    <img v-if="name === 'function'" src="@/assets/images/function.svg" />
    <img v-if="name === 'symbol'" src="@/assets/images/symbol.svg" />
    <img v-if="name === 'heart'" src="@/assets/images/heart.svg" />
    <img v-if="name === 'clipboard'" src="@/assets/images/clipboard.svg" />
    <img v-if="name === 'zap'" src="@/assets/images/zap.svg" />
    <img v-if="name === 'info'" src="@/assets/images/info.svg" />
  </span>
</template>

<style scoped lang="scss">
.icon {
  vertical-align: middle;
  width: 1em;
  height: 1em;
}

.icon img {
  width: inherit;
  height: inherit;
}
</style>

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
