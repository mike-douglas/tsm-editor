<template>
  <button :class="`button ${type}`" @click="handleClick">
    <Icon class="icon" v-show="icon && icon.length > 0 === true" :name="icon" />
    <span class="text"><slot /></span>
  </button>
</template>

<script>
import Icon from '@/components/Icon.vue';

export default {
  name: 'Button',
  components: {
    Icon,
  },
  props: {
    icon: String,
    onClick: Function,
    type: {
      type: String,
      default: 'normal',
    },
  },
  methods: {
    handleClick(event) {
      if (this.onClick) {
        this.onClick(event);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  cursor: pointer;
  font-size: $ts-normal;
}

.normal {
  border: $button-background;
  background-image: linear-gradient(
    $button-background,
    adjust-color($button-background, $lightness: -5%)
  );
  background-color: $button-background;
  color: adjust-color($button-background, $lightness: 65%);
  border-radius: $border-radius * 3;
  padding: $padding-med $padding-lg;
  outline: none;
  font-weight: bold;
}

.normal:hover {
  background-image: linear-gradient(
    $button-background-hover,
    adjust-color($button-background-hover, $lightness: -5%)
  );
  background-color: $button-background-hover;
  color: adjust-color($button-background, $lightness: 65%);
}

.normal .text {
  margin-left: $padding-sm;
  margin-right: $padding;
  vertical-align: middle;
}

.link {
  border: 0;
  margin: auto;
  padding: auto;
  background-color: transparent;
  outline: none;
  font-weight: bold;
  text-decoration: underline;
  color: $txt-mid;
}

.link:hover {
  color: $txt-action;
}

</style>
