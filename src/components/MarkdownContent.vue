<template>
  <section class="content" v-html="content">
  </section>
</template>

<style lang="scss" scoped>
.content {
  max-width: 50em;
  padding: $padding-normal;
}

.content li {
  line-height: $line-height;
  margin-bottom: $padding-normal;
}
</style>

<script>
const pageMap = {
  /* eslint-disable global-require, import/no-dynamic-require */
  updates: require('@/../CHANGELOG.md'),
  about: require('@/../ABOUT.md'),
  /* eslint-enable global-require, import/no-dynamic-require */
};

export default {
  name: 'MarkdownContent',
  props: {
    page: String,
  },
  computed: {
    content() {
      return pageMap[this.page];
    },
  },
};
</script>
