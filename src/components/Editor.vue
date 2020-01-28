<template>
  <div class="editor-container">
    <div class="editor" contenteditable="true"
        v-on:keydown="onKeyDown"
        v-on:keyup="onKeyUp">
      This is some content.
    </div>
    <Dropdown v-bind:visible="showDropdown" v-bind:position="caretPosition" />
  </div>
</template>

<script>
import { getCaretPosition, Position } from '@/lib/position';
import Dropdown from '@/components/Dropdown.vue';

export default {
  name: 'Editor',
  components: {
    Dropdown,
  },
  props: {
    content: String,
  },
  data() {
    return {
      caretPosition: new Position(0, 0),
      showDropdown: false,
    };
  },
  methods: {
    onKeyDown() {
      const boundingRect = this.$el.getBoundingClientRect();
      const c = getCaretPosition(window.getSelection());

      this.caretPosition = new Position(c.x, c.y - boundingRect.top);
    },
    onKeyUp() {
    },
  },
};
</script>

<style scoped>
.editor-container {
  position: relative;
}

.editor {
  min-height: 3em;
  border: 1px solid lightgrey;
  padding: 1em;
}
</style>
