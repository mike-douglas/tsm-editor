<template>
  <section class="editor-space" v-bind:style="{ ...styles, height: containerHeight + 'px' }">
    <div class="editor-renderer">
      <span class="ide" v-html="renderedContent"></span>
    </div>
    <div class="editor-event" ref="editor"
      contenteditable="true"
      spellcheck="false"
      v-on:keydown="onKeyDown"
      v-on:keyup="onKeyUp"
      v-on:blur="onBlur"
      v-on:input="onInput"
      v-text="content">
    </div>
    <Dropdown class="dropdown"
        v-bind:visible="dropdownIsVisible"
        v-bind:position="dropdownPosition"
        v-bind:symbols="dropdownSymbolResults"
        v-bind:functions="dropdownFunctionResults"
        v-bind:on-select="onSelect"
        v-bind:selected-index="dropdownSelectedIndex" />
    <div class="pannel debug-panel" v-show="debug">
      {{ renderedContent }}
    </div>
  </section>
</template>

<script>
import {
  setCaretRange, getCaretPosition, getCurrentCaretRange,
  replaceTextInRange, Position,
} from '@/lib/position';
import { tokenizeByWord } from '@/lib/tokenizer';
import { findMatches } from '@/lib/definitions';
import keys, { isControlKey } from '@/lib/keys';
import stylizeString from '@/lib/stylizer';
import styles from '@/lib/styles';

import Dropdown from '@/components/Dropdown.vue';

export default {
  name: 'EditorEventLayer',
  components: {
    Dropdown,
  },
  props: {
    initialContent: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      styles,
      debug: false,
      content: this.initialContent,
      rawContent: this.initialContent,
      containerHeight: 100,
      dropdownPosition: new Position(0, 0),
      dropdownSelectedIndex: 0,
      dropdownFunctionResults: [],
      dropdownSymbolResults: [],
      dropdownSearchTerm: '',
    };
  },
  computed: {
    dropdownIsVisible() {
      return this.dropdownFunctionResults.length > 0 || this.dropdownSymbolResults.length > 0;
    },
    dropdownCombinedResults() {
      return this.dropdownSymbolResults.concat(this.dropdownFunctionResults);
    },
    renderedContent() {
      return stylizeString(this.rawContent);
    },
  },
  mounted() {
    this.$refs.editor.innerText = this.content;
  },
  methods: {
    getCurrentCaretPosition() {
      const caret = getCaretPosition();

      return new Position(caret.x, caret.y);
    },
    onInput() {
      this.rawContent = this.$refs.editor.innerText;
      this.containerHeight = this.$refs.editor ? this.$refs.editor.scrollHeight : 100;
    },
    onKeyDown(event) {
      if (isControlKey(event.keyCode)) {
        if (this.dropdownIsVisible) {
          this.onNavigationKeyPress(event.keyCode);
        }

        event.preventDefault();
        event.stopPropagation();
        return false;
      }
      return true;
    },
    onKeyUp(event) {
      if (isControlKey(event.keyCode)) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }

      const caret = getCurrentCaretRange();

      if (caret) {
        const currentValue = event.target.innerText.substr(0, caret.startOffset);

        if (currentValue && currentValue.length > 2) {
          const words = tokenizeByWord(currentValue);

          if (words.length > 0 && words[words.length - 1].length > 1) {
            this.performWordLookup(this.getCurrentCaretPosition(), words[words.length - 1]);
          }
        }
      }

      return true;
    },
    onBlur() {
    },
    hideDropdown() {
      this.dropdownSelectedIndex = 0;
      this.dropdownFunctionResults = [];
      this.dropdownSymbolResults = [];
    },
    performWordLookup(position, text) {
      const bounds = this.$el.getBoundingClientRect();
      const { symbols, functions } = findMatches(text);

      this.dropdownPosition = new Position(position.x - bounds.left, position.y - bounds.top);
      this.dropdownFunctionResults = functions;
      this.dropdownSymbolResults = symbols;
      this.dropdownSearchTerm = text;
    },
    onNavigationKeyPress(keyCode) {
      let selectedIndex = this.dropdownSelectedIndex;

      switch (keyCode) {
        case keys.KEY_UP:
          selectedIndex -= 1;
          break;

        case keys.KEY_DOWN:
          selectedIndex += 1;
          break;

        case keys.KEY_ESCAPE:
          selectedIndex = 0;
          this.hideDropdown();
          break;

        case keys.KEY_ENTER:
        case keys.KEY_TAB:
          this.onSelect(this.dropdownCombinedResults[selectedIndex]);
          break;

        default:
          break;
      }

      this.dropdownSelectedIndex = Math.min(
        this.dropdownCombinedResults.length - 1,
        Math.max(0, selectedIndex),
      );
    },
    onSelect(item) {
      const caret = getCurrentCaretRange();

      if (caret) {
        caret.setStart(caret.startContainer, caret.startOffset - this.dropdownSearchTerm.length);

        const rangeStart = caret.startOffset;

        this.content = replaceTextInRange(this.$refs.editor.innerText, item.name, caret);

        this.rawContent = this.content;
        this.$refs.editor.innerText = this.content;

        this.$nextTick(() => {
          const { childNodes } = this.$refs.editor;
          const lastLineNode = childNodes[childNodes.length - 1];

          const newCaret = document.createRange();
          newCaret.setStart(lastLineNode, rangeStart + item.name.length);

          setCaretRange(newCaret);
          this.hideDropdown();
        });
      }
    },
  },
};
</script>

<style scoped>
.editor-space {
  position: relative;
  font-family: var(--panel-font);
  font-size: var(--size-normal);
  font-weight: bold;
  border: var(--panel-border) solid var(--panel-border-color);
  background-color: var(--panel-bg);
}

.dropdown {
  z-index: 3;
}

.editor-renderer, .editor-event {
  position: absolute;
  padding: var(--padding);
  top: 0em;
  left: 0em;
  bottom: 0em;
  right: 0em;
}

.editor-renderer {
  z-index: 1;
}

.editor-event {
  z-index: 2;
  color: transparent;
  caret-color: var(--text-normal);
}

.debug-panel {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.85);
  min-height: 100px;
  font-size: 0.8em;
}
</style>
