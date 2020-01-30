<template>
  <div class="editor-container">
    <EditorEventLayer class="editor" ref="editor"
      v-bind:initial-content="content" />
    <div class="panel editor-status">
      <Button icon="clipboard" type="small link" class="copy-to-clipboard">
        Copy to Clipboard
      </Button>
    </div>
  </div>
</template>

<script>
import EditorEventLayer from '@/components/EditorEventLayer.vue';
import Button from '@/components/Button.vue';

export default {
  name: 'Editor',
  components: {
    EditorEventLayer,
    Button,
  },
  data() {
    return {
      content: 'DBMarket + DBRegionMark',
    };
  },
};
</script>

<style lang="scss" scoped>
.editor-status {
  padding-left: 0;
}
</style>
