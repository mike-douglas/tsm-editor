<template>
  <div class="editor-container">
    <EditorEventLayer class="editor" ref="editor"
      v-bind:initial-content="content" />
  </div>
</template>

<script>
import EditorEventLayer from '@/components/EditorEventLayer.vue';

export default {
  name: 'Editor',
  components: {
    EditorEventLayer,
  },
  computed: {
    content() {
      return this.$store.state.formula;
    },
  },
};
</script>

<style lang="scss" scoped>
.editor-status {
  padding-left: 0;
}
</style>
