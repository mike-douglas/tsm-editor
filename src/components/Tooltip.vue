<template>
  <span class="tooltip">
    <slot />
    <span :class="`tooltip-text ${position}`">{{ text }}</span>
  </span>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    text: String,
    position: {
      type: String,
      default: 'bottom-right',
    },
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
}

.tooltip-text::after {
  content: ' ';
  position: absolute;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  bottom: 100%;
}

.tooltip:hover .tooltip-text {
  visibility: visible;
}

.bottom-right {
  top: 125%;
  left: 50%;
  margin-left: -3.25em;
}

.bottom-right::after {
  left: 25%;
  border-color: transparent transparent $dropdown-background transparent;
}

.top-right {
  bottom: 125%;
  left: 50%;
}

.top-right::after {
  left: 25%;
  top: 100%;
  border-color: $dropdown-background transparent transparent transparent;
}

.bottom-left {
  top: 125%;
  left: -100%;
  margin-left: -3.25em;
}

.bottom-left::after {
  left: 85%;
  bottom: 100%;
  border-color: transparent transparent $dropdown-background transparent;
}

</style>
