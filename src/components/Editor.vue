<template>
  <div class="editor-container">
    <button class="copy-to-clipboard"><Icon name="clipboard" /></button>
    <EditorEventLayer class="editor" ref="editor"
      v-bind:initial-content="content" />
  </div>
</template>

<script>
import EditorEventLayer from '@/components/EditorEventLayer.vue';
import Icon from '@/components/Icon.vue';

export default {
  name: 'Editor',
  components: {
    EditorEventLayer,
    Icon,
  },
  data() {
    return {
      content: 'DBMarket + DBRegionMark',
    };
  },
};
</script>

<style scoped>
.copy-to-clipboard {
  background-color: transparent;
  border: 0;
  font-size: var(--size-normal);
  color: var(--panel-border-color);
  padding: 0;
}
</style>
