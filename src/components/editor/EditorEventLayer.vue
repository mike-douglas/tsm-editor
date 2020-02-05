<template>
  <section class="editor-space" v-bind:style="{ height: containerHeight + 'px' }">
    <div class="editor-renderer">
      <Syntax :code="rawContent" />
    </div>
    <div class="editor-event" ref="editor"
      contenteditable="true"
      spellcheck="false"
      v-on:keydown="onKeyDown"
      v-on:keyup="onKeyUp"
      v-on:blur="onBlur"
      v-on:input="onInput"
      v-on:paste="onPaste"
      v-on:click="onClick">
    </div>
    <Dropdown class="dropdown"
        v-bind:visible="dropdownIsVisible"
        v-bind:position="dropdownPosition"
        v-bind:symbols="dropdownSymbolResults"
        v-bind:functions="dropdownFunctionResults"
        v-bind:on-select="onSelect"
        v-bind:selected-index="dropdownSelectedIndex" />
    <div class="pannel debug-panel" v-show="debug">
      <div>{{ rawContent }}</div>
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
import { reformatter } from '@/lib/stylizer';

import Dropdown from '@/components/dropdown/Dropdown.vue';
import Syntax from '@/components/Syntax.vue';

export default {
  name: 'EditorEventLayer',
  components: {
    Dropdown,
    Syntax,
  },
  props: {
    initialContent: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      debug: this.$store.state.debug,
      content: this.initialContent,
      rawContent: this.initialContent,
      containerHeight: 150,
      dropdownPosition: new Position(0, 0),
      dropdownSelectedIndex: 0,
      dropdownFunctionResults: [],
      dropdownSymbolResults: [],
      dropdownSearchTerm: '',
      keyPressCount: 0,
    };
  },
  computed: {
    dropdownIsVisible() {
      return this.dropdownFunctionResults.length > 0 || this.dropdownSymbolResults.length > 0;
    },
    dropdownCombinedResults() {
      return this.dropdownSymbolResults.concat(this.dropdownFunctionResults);
    },
  },
  mounted() {
    this.$refs.editor.innerText = this.content;
    this.resetContainerHeight();

    this.$store.commit('setSelect', () => {
      const range = document.createRange();
      range.selectNodeContents(this.$refs.editor);

      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    });
    this.$store.dispatch('loadFromLocation')
      .then((restored) => {
        this.$gtag.pageview({ page_path: window.location.pathname + window.location.hash });
        return this.$store.state.cleanUp === true ? reformatter(restored) : restored;
      })
      .then((restored) => {
        this.$refs.editor.innerText = restored;
        this.rawContent = restored;
        this.content = restored;
      }).catch(() => {});
  },
  methods: {
    reformatter,
    resetContainerHeight() {
      this.containerHeight = this.$refs.editor ? this.$refs.editor.scrollHeight : 100;
    },
    getCurrentCaretPosition() {
      const caret = getCaretPosition();

      return new Position(caret.x, caret.y);
    },
    onInput() {
      this.rawContent = this.$refs.editor.innerText;

      this.$store.commit('save', this.rawContent);
      this.$store.dispatch('saveToLocation');

      this.resetContainerHeight();
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
      if (this.dropdownIsVisible
          && (event.keyCode === keys.LEFT
          || event.keyCode === keys.RIGHT)) {
        this.hideDropdown();
        return true;
      }

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
      this.hideDropdown();
    },
    onPaste(event) {
      event.preventDefault();

      const newContent = event.clipboardData.getData('text/plain').replace(/\n/g, ' ');

      this.$refs.editor.innerText = this.$store.state.cleanUp === true
        ? reformatter(newContent)
        : newContent;
      this.onInput();
    },
    onClick() {
      this.hideDropdown();
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
      switch (keyCode) {
        case keys.UP:
          this.keyPressCount -= 1;
          break;

        case keys.DOWN:
          this.keyPressCount += 1;
          break;

        case keys.ESCAPE:
          this.hideDropdown();
          break;

        case keys.ENTER:
        case keys.TAB:
          this.onSelect(this.dropdownCombinedResults[this.dropdownSelectedIndex]);
          break;

        default:
          break;
      }

      const size = this.dropdownCombinedResults.length;
      this.dropdownSelectedIndex = (((this.keyPressCount % size) + size) % size);
    },
    onSelect(item) {
      const caret = getCurrentCaretRange();

      if (caret) {
        caret.setStart(caret.startContainer, caret.startOffset - this.dropdownSearchTerm.length);

        const rangeStart = caret.startOffset;

        this.rawContent = replaceTextInRange(this.$refs.editor.innerText, item.name, caret);
        this.$refs.editor.innerText = this.rawContent;

        this.$nextTick(() => {
          const { childNodes } = this.$refs.editor;
          const newCaret = document.createRange();

          newCaret.setStart(childNodes[0], rangeStart + item.name.length);

          setCaretRange(newCaret);
          this.hideDropdown();
          this.onInput();
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.editor-space {
  position: relative;
  font-family: $editor-font;
  font-size: $ts-normal;
  font-weight: bold;
  border: 3px solid $editor-border;
  background-color: $editor-background;
}

.dropdown {
  z-index: 3;
}

.editor-renderer, .editor-event {
  position: absolute;
  padding: $padding;
  top: 0em;
  left: 0em;
  bottom: 0em;
  right: 0em;
  line-height: 1.4em;
  word-wrap: break-word;
}

.editor-renderer {
  z-index: 1;
}

.editor-event {
  z-index: 2;
  color: transparent;
  caret-color: $txt-normal;
  outline-color: $editor-outline;
}

.debug-panel {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.85);
  min-height: 100px;
  font-size: 0.6em;
  padding: $padding;
}
</style>
