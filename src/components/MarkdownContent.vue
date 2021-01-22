<template>
  <section class="content" v-html="content">
  </section>
</template>
<script>
export default {
  name: 'MarkdownContent',
  data() {
    return {
      // eslint-disable-next-line global-require
      content: require('@/../README.md'),
    };
  },
};
</script>

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
