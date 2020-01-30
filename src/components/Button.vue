<template>
  <button :style="styles" v-bind:class="`button ${type}`" v-on:click="handleClick">
    <Icon class="icon" v-show="icon && icon.length > 0 === true" v-bind:name="icon" />
    <span class="text"><slot /></span>
  </button>
</template>

<script>
import styles from '@/lib/styles';

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
      default: 'action',
    },
  },
  methods: {
    handleClick(event) {
      if (this.onClick) {
        this.onClick(event);
      }
    },
  },
  data() {
    return {
      styles,
    };
  },
};
</script>

<style scoped>
.small {
  font-size: var(--size-small);
}

.medium {
  font-size: var(--size-medium);
}

.large {
  font-size: var(--size-large);
}

.button {
  border: 1px solid darkgray;
  border-radius: 0.25em;
  padding: var(--padding-normal) var(--padding-extralarge);
  background: grey url('~@/assets/noise.png');
  color: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0);
  text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.15);
  outline: none;
}

.button:hover {
  border: 1px solid lightgray;
  background-color: lightgray;
  box-shadow: 0px 0px 8px rgba(255, 255, 255, 0.25);
  text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.35);
  cursor: pointer;
}

.button:active:hover {
  background-image: url('~@/assets/noise_active.png');
}

.button .text {
  display: inline-block;
  margin-left: var(--padding);
  margin-right: var(--padding);
}

.button .icon {
  padding-right: var(--padding-small);
}

.link {
  background: none;
  border: 0;
  color: var(--link-light);
  padding: 0;
}

.link .icon {
  margin-left: auto;
}

.link .text {
  text-decoration: none;
}

.link:hover {
  padding: 0;
  border: 0;
  background: none;
  box-shadow: none;
}

.link:hover .text {
  text-decoration: underline;
}

.action {
  color: #FADEE1;
  font-weight: bold;
}

.action {
  border: 1px solid var(--button-action-border-color);
  background-color: var(--button-action-color);
}

.action:hover {
  border: 1px solid var(--button-action-hover-border-color);
  background-color: var(--button-action-color);
}

.action:hover:active {
  background-color: var(--button-action-click-color);
}

.light {
  color: white;
  font-weight: bold;
}

.light {
  border: 1px solid var(--button-light-border-color);
  background-color: var(--button-light-color);
}

.light:hover {
  border: 1px solid var(--button-light-hover-border-color);
  background-color: var(--button-light-color);
}

.light:hover:active {
  background-color: var(--button-light-click-color);
}
</style>
