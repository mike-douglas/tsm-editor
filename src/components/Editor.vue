<template>
  <div class="editor-container">
    <EditorRenderLayer class="editor"
      v-bind:content="content"/>
    <EditorEventLayer class="editor" ref="editor"
      v-bind:content="content"
      v-bind:lookup-word="performWordLookup"
      v-bind:input-handler="onInput"
      v-bind:nav-key-handler="onNavigationKeyPress"
      v-bind:key="'event' + eventKey" />
    <Dropdown
        v-bind:visible="dropdownIsVisible"
        v-bind:position="dropdownPosition"
        v-bind:symbols="dropdownSymbolResults"
        v-bind:functions="dropdownFunctionResults"
        v-bind:on-select="onSelect"
        v-bind:selected-index="dropdownSelectedIndex" />
  </div>
</template>

<script>
import { setCaretPosition, Position } from '@/lib/position';
import { findMatches } from '@/lib/definitions';
import keys from '@/lib/keys';

import Dropdown from '@/components/Dropdown.vue';
import EditorRenderLayer from '@/components/EditorRenderLayer.vue';
import EditorEventLayer from '@/components/EditorEventLayer.vue';

export default {
  name: 'Editor',
  components: {
    Dropdown,
    EditorRenderLayer,
    EditorEventLayer,
  },
  data() {
    return {
      caretPosition: new Position(0, 0),
      content: 'Sample Content',
      renderKey: 1,
      eventKey: 1,
      dropdownPosition: new Position(0, 0),
      dropdownSelectedIndex: 0,
      dropdownFunctionResults: [],
      dropdownSymbolResults: [],
    };
  },
  computed: {
    dropdownIsVisible() {
      return this.dropdownFunctionResults.length > 0 || this.dropdownSymbolResults.length > 0;
    },
    dropdownCombinedResults() {
      return this.dropdownSymbolResults.concat(this.dropdownFunctionResults);
    },
    currentContent() {
      return this.content;
    },
  },
  methods: {
    hideDropdown() {
      this.dropdownSelectedIndex = 0;
      this.dropdownFunctionResults = [];
      this.dropdownSymbolResults = [];
    },
    performWordLookup(position, text) {
      const bounds = this.$el.getBoundingClientRect();
      const { symbols, functions } = findMatches(text);

      this.dropdownPosition = new Position(position.x, position.y - bounds.top);
      this.dropdownFunctionResults = functions;
      this.dropdownSymbolResults = symbols;
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
    onInput() {
      // this.renderKey += 1;
    },
    onSelect(item) {
      this.content = `${this.content} ${item.name}`;
      // this.eventKey += 1;

      this.$nextTick(() => {
        const { childNodes } = this.$refs.editor.$refs.editor;
        const lastLineNode = childNodes[childNodes.length - 1];

        setCaretPosition(
          window.getSelection(),
          lastLineNode,
          lastLineNode.textContent.length,
        );

        this.hideDropdown();
      });
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
