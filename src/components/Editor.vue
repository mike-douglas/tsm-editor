<template>
  <div>
    <div class="editor" contenteditable="true"
        v-on:keydown="onKeyDown"
        v-on:keyup="onKeyUp">
      This is some content.
    </div>
    <Dropdown visible="false" />
  </div>
</template>

<script>
import { getCaretPosition } from '@/lib/position';
import Dropdown from '@/components/Dropdown.vue';

export default {
  name: 'Editor',
  components: {
    Dropdown,
  },
  props: {
    content: String,
  },
  methods: {
    onKeyDown() {
      // const position = getCaretPosition(window.getSelection());
    },
    onKeyUp() {
      // const position = getCaretPosition(window.getSelection());
    },
  },
};
</script>

<style scoped>
.editor {
  min-height: 3em;
  border: 1px solid lightgrey;
  padding: 1em;
}
</style>
