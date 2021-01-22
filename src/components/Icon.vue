<template>
  <ion-icon class="icon" :name="iconName"></ion-icon>
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
  computed: {
    iconName() {
      const map = {
        function: 'code-working-outline',
        symbol: 'code-download-outline',
        clipboard: 'clipboard-outline',
        chevronLeft: 'chevron-forward-outline',
        book: 'book',
        bulb: 'bulb',
        about: 'information-circle',
        heart: 'heart',
      };

      return map[this.name];
    },
  },
};
</script>

<style scoped lang="scss">
.icon {
  vertical-align: middle;
}
</style>
