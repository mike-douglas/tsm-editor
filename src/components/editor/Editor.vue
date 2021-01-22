<template>
  <div class="editor-container">
    <div class="editor" :style="{ height: containerHeight + 'px' }">
      <Dropdown class="dropdown"
        @change="onDropdownSelect"
        v-model="dropdownSelection"
        :position="dropdownPosition"
        :visible="dropdownIsVisible"
        :results="dropdownCompletions" />
      <EditorRender ref="editor" class="editor-render" />
      <EditorEvent class="editor-event" :shouldReformat="cleanUpSyntax" />
    </div>
    <div class="editor-status">
      <Button type="xsmall link" icon="clipboard" :onClick="copyToClipboard">
      Copy to Clipboard
      </Button>
      <Tooltip
        class="tooltip"
        position="bottom-left"
        text="Clean up your TSM string to make it more readable">
        <label class="syntax-cleanup">
          <input type="checkbox" v-model="cleanUpSyntax" />
          <span class="text">Clean up Syntax</span>
        </label>
      </Tooltip>
    </div>
  </div>
</template>

<script>
import EditorEventBus, { events } from '@/components/editor/eventbus';
import EditorRender from '@/components/editor/EditorRender.vue';
import EditorEvent from '@/components/editor/EditorEvent.vue';
import Dropdown from '@/components/dropdown/Dropdown.vue';
import Button from '@/components/Button.vue';
import Tooltip from '@/components/Tooltip.vue';

import keys from '@/lib/keys';
import {
  Position, replaceTextInRange,
} from '@/lib/position';
import { tokenizeByWord } from '@/lib/tokenizer';
import { findMatches } from '@/lib/definitions';

/**
 * The main editor component maintains the state of the editor, updates the
 * child components, and coordinates the display of syntax highlighted text,
 * suggestions in the autocomplete, and marshalling data back up through the
 * two-way binding mechanism implemented in the v-model.
 */
export default {
  name: 'Editor',
  components: {
    EditorRender,
    EditorEvent,
    Dropdown,
    Button,
    Tooltip,
  },
  props: {
    value: String,
  },
  data: () => ({
    cleanUpSyntax: true,
    // Maintain the height of the container based on the text entered in the Event component.
    containerHeight: 170,
    // Flag to determine if input event is coming from inside the editor or elsewhere.
    inputIsFromEditor: false,
    // The current search term that is used to find completions to display in the dropdown.
    dropdownSearchTerm: '',
    // Position of the dropdown based on the cursor position.
    dropdownPosition: new Position(0, 0),
    // The current selected entry in the dropdown.
    dropdownSelection: 0,
    // The set of suggestions based on the search term
    dropdownCompletions: { functions: [], symbols: [] },
    // Counter to maintain cycling through dropdown suggestions
    keyPressCount: 0,
    // The last known caret TextRange
    currentCaretRange: null,
  }),
  computed: {
    dropdownIsVisible() {
      return this.dropdownCompletions.functions.length > 0
        || this.dropdownCompletions.symbols.length > 0;
    },
  },
  mounted() {
    EditorEventBus.$emit(events.SET_EDITOR_STATE, { string: this.value });

    EditorEventBus.$on(events.EDITOR_SCROLLHEIGHT_CHANGED, this.onEditorScrollHeightChanged);
    EditorEventBus.$on(events.EDITOR_INPUT, this.onEditorInput);
    EditorEventBus.$on(events.EDITOR_CARET_CHANGED, this.onEditorCaretPositionChange);
    EditorEventBus.$on(events.EDITOR_KEYDOWN, this.onEditorKeyDown);
    EditorEventBus.$on(events.EDITOR_KEYUP, this.onEditorKeyUp);
    EditorEventBus.$on(events.EDITOR_BLUR, this.onEditorBlur);
  },
  watch: {
    value(newValue) {
      /*
       * If the change to this.value is from a v-model update from outside of the
       * component, we need to emit a state change event to the event and render
       * layers.
       */
      if (!this.inputIsFromEditor) {
        EditorEventBus.$emit(events.SET_EDITOR_STATE, { string: newValue });
      }

      this.inputIsFromEditor = false;
    },
  },
  methods: {
    /**
     * Fired when input comes from inside of the event layer. We set a flag
     * to indicate that the input is coming from the inner component so that
     * we don't emit the state change back to the event layer.
     */
    onEditorInput(newValue) {
      this.inputIsFromEditor = true;
      this.$emit('input', newValue);
    },
    /**
     * When the user enters text in the event layer that resizes the editable region,
     * we need to update this component and the render layer.
     */
    onEditorScrollHeightChanged(newHeight) {
      this.containerHeight = newHeight;
    },
    /**
     * Handle navigation of the visible dropdown. Up/down scrolls through the list,
     * escape dismisses it, tab/enter selects the item.
     */
    onEditorKeyDown({ event, isControlKey }) {
      if (this.dropdownIsVisible && isControlKey) {
        switch (event.keyCode) {
          case keys.UP:
            this.keyPressCount -= 1;
            break;

          case keys.DOWN:
            this.keyPressCount += 1;
            break;

          case keys.ESCAPE:
            this.dismissDropdown();
            break;

          case keys.ENTER:
          case keys.TAB:
            this.onDropdownSelect(
              this.dropdownCompletions.symbols.concat(
                this.dropdownCompletions.functions,
              )[this.dropdownSelection],
            );
            break;

          default:
            break;
        }

        const size = this.dropdownCompletions.functions.length
                      + this.dropdownCompletions.symbols.length;
        this.dropdownSelection = (((this.keyPressCount % size) + size) % size);
      }
    },
    /**
     * If the dropdown is visible and the user hits left or right, dismiss it.
     */
    onEditorKeyUp({ event }) {
      if (this.dropdownIsVisible
            && (event.keyCode === keys.LEFT
            || event.keyCode === keys.RIGHT)) {
        this.dismissDropdown();
      }
    },
    /**
     * When the caret position changes, do a keyword search through the
     * set of functions and variables.
     */
    onEditorCaretPositionChange({ range, position }) {
      this.currentCaretRange = range;

      const searchString = this.value.substr(0, range.startOffset);

      if (searchString && searchString.length > 2) {
        const words = tokenizeByWord(searchString);

        if (words.length > 0 && words[words.length - 1].length > 1) {
          const bounds = this.$el.getBoundingClientRect();

          this.dropdownSearchTerm = words[words.length - 1];
          this.dropdownCompletions = findMatches(this.dropdownSearchTerm);
          this.dropdownSelection = 0;
          this.dropdownPosition = new Position(position.x - bounds.left, position.y - bounds.top);
        }
      }
    },
    /**
     * Dismiss the dropdown when you click off
     */
    onEditorBlur() {
      setTimeout(() => {
        // this.dismissDropdown();
      }, 250);
    },
    /**
     * Reset the dropdown state so it's no longer visible.
     */
    dismissDropdown() {
      this.dropdownCompletions = { functions: [], symbols: [] };
      this.dropdownSelection = 0;
      this.keyPressCount = 0;
    },
    /**
     * Fired when an item in the dropdown is selected. This is triggered either from a
     * click event in the component or from a keyDown event which we handle above.
     */
    onDropdownSelect(item) {
      const caret = this.currentCaretRange.cloneRange();

      if (caret) {
        // Replace the current search term
        caret.setStart(
          caret.startContainer,
          Math.max(0, caret.startOffset - this.dropdownSearchTerm.length),
        );

        const rangeStart = caret.startOffset;
        const newString = replaceTextInRange(this.value, item.getCompletion(), caret);

        // On the next render, update the editor state with the new string and
        // set the caret to its new location. Then dismiss the dropdown.
        this.$nextTick(() => {
          EditorEventBus.$emit(events.SET_EDITOR_STATE, {
            string: newString,
            caret: {
              start: rangeStart + item.getCompletion().length,
              length: 0,
            },
          });
          this.dismissDropdown();
          this.$gtag.event('editorEvent', { action: 'dismissedDropdownWithSelection' });
        });
      }
    },
    copyToClipboard() {
      this.$gtag.event('editorEvent', { action: 'copyToClipboard' });
      EditorEventBus.$emit(events.SET_EDITOR_COPY_TO_CLIPBOARD);
    },
  },
};
</script>

<style lang="scss" scoped>
.editor {
  position: relative;
  font-family: $editor-font;
  font-size: $ts-med;
  font-weight: bold;
  border: 2px solid $editor-border;
  background-color: $editor-background;
  border-radius: $border-radius;
}

.editor-render, .editor-event {
  position: absolute;
  padding: $padding;
  top: 0em;
  left: 0em;
  bottom: 0em;
  right: 0em;
  line-height: 1.4em;
  word-wrap: break-word;
}

.editor-render {
  z-index: 1;
}

.editor-event {
  z-index: 2;
  color: transparent;
  caret-color: $txt-normal;
  outline-color: $editor-outline;
}

.dropdown {
  z-index: 3;
}

.editor-status {
  padding-left: 0;
  margin: $padding-med 0;
}

.tooltip {
  float: right;
}

.syntax-cleanup {
  font-size: $ts-sm;
}

.syntax-cleanup span {
  margin-left: $padding-sm;
}

.text {
  vertical-align: middle;
  font-weight: bold;
}

.right {
  text-align: right;
}
</style>
