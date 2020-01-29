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
  data() {
    return {
      content: 'Sample Content',
    };
  },
};
</script>

<style scoped>
</style>
