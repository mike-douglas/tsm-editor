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
      default: 'action normal',
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
.xsmall {
  font-size: $ts-xs;
}

.small {
  font-size: $ts-sm;
}

.medium {
  font-size: $ts-med;
}

.large {
  font-size: $ts-lg;
}

.normal {
  font-size: $ts-normal;
}

.button {
  border: 1px solid darkgray;
  border-radius: 0.25em;
  padding: $padding-normal $padding-normal;
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

.button .text {
  // display: inline-block;
  margin-left: $padding-sm;
  margin-right: $padding;
  vertical-align: middle;
}

.button .icon {
  font-size: 2.0em;
  vertical-align: middle;
}

.link {
  background: none;
  border: 0;
  color: $txt-light;
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
  color: $btn-action-txt;
  font-weight: bold;
}

.action {
  border: 1px solid $btn-action-border;
  background-color: $btn-action;
}

.action:hover {
  border: 1px solid $btn-action-hover-border;
  background-color: $btn-action-hover;
}

.action:hover:active {
  background-color: $btn-action-active;
}

.light {
  color: $btn-light-txt;
  font-weight: bold;
}

.light {
  border: 1px solid $btn-light-border;
  background-color: $btn-light;
}

.light:hover {
  border: 1px solid $btn-light-hover-border;
  background-color: $btn-light-hover;
}

.light:hover:active {
  background-color: $btn-light-active;
}
</style>
