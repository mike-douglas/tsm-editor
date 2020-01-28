<template>
  <div class="editor-container">
    <div class="editor" contenteditable="true"
        v-on:keydown="onKeyDown"
        v-on:keyup="onKeyUp"
        v-on:blur="onBlur"
        v-text="content">
    </div>
    <Dropdown
        v-bind:visible="showDropdown"
        v-bind:position="caretPosition"
        v-bind:symbols="symbols"
        v-bind:functions="functions"
        v-bind:on-select="onSelect"
        v-bind:selected-index="selectedIndex" />
  </div>
</template>

<script>
import { getCaretPosition, Position } from '@/lib/position';
import { tokenizeByWord } from '@/lib/tokenizer';
import { findMatches } from '@/lib/definitions';

import Dropdown from '@/components/Dropdown.vue';

export default {
  name: 'Editor',
  components: {
    Dropdown,
  },
  props: {
    content: {
      default: 'Hello',
      type: String,
    },
  },
  data() {
    return {
      caretPosition: new Position(0, 0),
      symbols: [],
      functions: [],
      selectedIndex: 0,
    };
  },
  computed: {
    showDropdown() {
      return this.symbols.length > 0 || this.functions.length > 0;
    },
  },
  methods: {
    onKeyDown(event) {
      const boundingRect = this.$el.getBoundingClientRect();
      const c = getCaretPosition(window.getSelection());

      this.caretPosition = new Position(c.x, c.y - boundingRect.top);

      const KEY_UP = 38;
      const KEY_DOWN = 40;
      const KEY_ESCAPE = 27;

      switch (event.keyCode) {
        case KEY_UP:
          this.selectedIndex = Math.max(0, this.selectedIndex - 1);
          break;

        case KEY_DOWN:
          this.selectedIndex = Math.min(
            this.functions.length + this.symbols.length - 1,
            this.selectedIndex + 1,
          );
          break;

        case KEY_ESCAPE:
          this.selectedIndex = 0;
          this.functions = [];
          this.symbols = [];
          break;

        default:
          break;
      }

      if (event.keyCode === KEY_UP || event.keyCode === KEY_DOWN) {
        event.preventDefault();
        event.stopPropagation();

        return false;
      }

      return true;
    },
    onKeyUp(event) {
      const currentValue = event.target.innerText;

      // Todo: Stop if ESCAPE, UP, DOWN, etc.

      if (currentValue && currentValue.length > 2) {
        const words = tokenizeByWord(currentValue);

        if (words.length > 0 && words[words.length - 1].length > 2) {
          const results = findMatches(words[words.length - 1]);

          this.symbols = results.keywords;
          this.functions = results.functions;
        }
      }
    },
    onBlur() {
      this.symbols = [];
      this.functions = [];
    },
    onSelect(item) {
      this.symbols = [];
      this.functions = [];
      this.content += item.name;
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
