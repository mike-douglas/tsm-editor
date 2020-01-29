<template>
  <div :style="styles" class="editor-container">
    <EditorEventLayer class="editor" ref="editor"
      v-bind:initial-content="content" />
    <div class="panel editor-status">
      <button class="copy-to-clipboard">
        <Icon name="clipboard" /> Copy to Clipboard
      </button>
    </div>
  </div>
</template>

<script>
import styles from '@/lib/styles';

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
      styles,
    };
  },
};
</script>

<style scoped>
.editor-status {
  padding-left: 0;
}

.copy-to-clipboard {
  background-color: transparent;
  border: 0;
  font-size: var(--size-small);
  color: var(--link-light);
  padding: 0;
}
</style>
