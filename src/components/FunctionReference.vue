<template>
  <div :style="styles">
    <span class="name" v-html="stylizeString(item.name)"></span>
    <span class="arguments">({{ item.args.join(' ,') }})</span>
    <p class="definition">
      {{ item.definition }}
    </p>
  </div>
</template>

<script>
import styles from '@/lib/styles';
import stylizeString from '@/lib/stylizer';

export default {
  name: 'FunctionReference',
  props: {
    item: Object,
  },
  methods: {
    stylizeString,
  },
  data() {
    return {
      styles,
    };
  },
};
</script>

<style scoped>
.name {
  display: inline-block;
}

.arguments {
  color: var(--text-faded);
}

.name, .arguments {
  font-weight: bold;
  font-family: var(--panel-font);
}

.definition {
  font-size: var(--size-small);
  margin: var(--padding-small) 0 var(--padding-extralarge) 0;
}
</style>
