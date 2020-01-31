<template>
  <span class="tooltip">
    <slot />
    <span class="tooltip-text">{{ text }}</span>
  </span>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    text: String,
  },
};
</script>

<style lang="scss" scoped>
.tooltip {
  position: relative;
}

.tooltip-text {
  visibility: hidden;
  width: 15em;
  background-color: $dropdown-background;
  color: $txt-normal;
  text-align: center;
  padding: $padding-sm;
  font-size: $ts-xs;
  border-radius: 0.5em;
  position: absolute;
  z-index: 4;
  top: 125%;
  left: 50%;
  margin-left: -3.25em;
}

.tooltip-text::after {
  content: ' ';
  position: absolute;
  bottom: 100%;
  left: 25%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent $dropdown-background transparent;
}

.tooltip:hover .tooltip-text {
  visibility: visible;
}
</style>
