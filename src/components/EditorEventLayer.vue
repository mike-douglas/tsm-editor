<template>
  <div class="editor-event-layer" ref="editor"
    contenteditable="true"
    v-on:keydown="onKeyDown"
    v-on:keyup="onKeyUp"
    v-on:blur="onBlur"
    v-on:input="onInput">
    {{ content }}
  </div>
</template>

<script>
import { getCaretPosition, Position } from '@/lib/position';
import { tokenizeByWord } from '@/lib/tokenizer';
import { isControlKey } from '@/lib/keys';

export default {
  name: 'EditorEventLayer',
  props: {
    content: {
      type: String,
      default: '',
    },
    lookupWord: Function,
    navKeyHandler: Function,
    inputHandler: Function,
  },
  mounted() {
    this.$refs.editor.innerText = this.content;
  },
  methods: {
    getCurrentCaretPosition() {
      const caret = getCaretPosition(window.getSelection());

      return new Position(caret.x, caret.y);
    },
    onInput(event) {
      this.$emit('input', event.target.innerText);

      if (this.inputHandler) {
        this.inputHandler(event.target.innerText);
      }
    },
    onKeyDown(event) {
      if (this.navKeyHandler && isControlKey(event.keyCode)) {
        this.navKeyHandler(event.keyCode);

        event.preventDefault();
        event.stopPropagation();
        return false;
      }
      return true;
    },
    onKeyUp(event) {
      const currentValue = event.target.innerText;

      // Todo: Stop if ESCAPE, UP, DOWN, etc.

      if (this.lookupWord && currentValue && currentValue.length > 2) {
        const words = tokenizeByWord(currentValue);

        if (words.length > 0 && words[words.length - 1].length > 2) {
          this.lookupWord(this.getCurrentCaretPosition(), words[words.length - 1]);
        }
      }

      return true;
    },
    onBlur() {
    },
  },
};
</script>
