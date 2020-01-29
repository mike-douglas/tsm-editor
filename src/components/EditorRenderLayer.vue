<template>
  <div class="editor-render-layer">
    {{ renderedContent }}
  </div>
</template>

<script>
export default {
  name: 'EditorRenderLayer',
  props: {
    content: {
      type: String,
      default: '',
    },
  },
  computed: {
    renderedContent() {
      return this.content.toUpperCase();
    },
  },
};
</script>

<style scoped>
.editor-render-layer {
  display: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}
</style>
