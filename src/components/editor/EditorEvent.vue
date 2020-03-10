<template>
  <div ref="editor" contenteditable="true" spellcheck="false"
    @input="onInput"
    @keydown="onKeyDown"
    @keyup="onKeyUp"
    @click="onClick"
    @blur="onBlur">
  </div>
</template>

<script>
import EditorEventBus, { events } from '@/components/editor/eventbus';
import { getCaretPosition, getCurrentCaretRange, setCaretRange } from '@/lib/position';
import { isControlKey } from '@/lib/keys';
/**
 * This component collects the input events of the editor. It passes events using
 * the event bus that are used to coordinate rendering content and suggesting options in
 * the dropdown based on what users typed.
 */
export default {
  name: 'EditorEvent',
  data: () => ({
    content: '',
  }),
  mounted() {
    /**
     * The only event we listen for in this component. Sets the internal state of
     * the component's editor and selection.
     */
    EditorEventBus.$on(events.SET_EDITOR_STATE, (state) => {
      if (state.string) {
        this.content = state.string;
        this.$refs.editor.innerText = state.string;
        EditorEventBus.$emit(events.EDITOR_INPUT, state.string);
      }
      if (state.caret) {
        this.$nextTick(() => {
          const c = document.createRange();
          c.setStart(this.$refs.editor.childNodes[0], state.caret.start);
          c.setEnd(this.$refs.editor.childNodes[0], state.caret.start + state.caret.length);

          setCaretRange(c);
        });
      }
    });
  },
  methods: {
    /**
     * When the contenteditable region is changed, fire the following events:
     * 1. Emit the new height of the region
     * 2. Emit that the editor has collected new input
     * 3. Emit that the caret has moved
     */
    onInput(event) {
      this.content = event.target.innerText;
      EditorEventBus.$emit(events.EDITOR_SCROLLHEIGHT_CHANGED, event.target.scrollHeight);
      EditorEventBus.$emit(events.EDITOR_INPUT, event.target.innerText);
      EditorEventBus.$emit(events.EDITOR_CARET_CHANGED, {
        position: getCaretPosition(),
        range: getCurrentCaretRange(),
      });
    },
    onKeyDown(event) {
      const isControl = isControlKey(event.keyCode);

      EditorEventBus.$emit(events.EDITOR_KEYDOWN, {
        event,
        isControlKey: isControl,
      });

      if (isControl) {
        event.preventDefault();
        event.stopPropagation();
      }

      return !isControl;
    },
    onKeyUp(event) {
      EditorEventBus.$emit(events.EDITOR_KEYUP, {
        event,
        isControlKey: isControlKey(event.keyCode),
      });

      return false;
    },
    onPaste(event) {
      event.preventDefault();

      const newContent = event.clipboardData.getData('text/plain').replace(/\n/g, ' ');
      EditorEventBus.$emit(events.EDITOR_INPUT, newContent);

      return false;
    },
    onClick(event) {
      EditorEventBus.$emit(events.EDITOR_CLICK, event);

      return false;
    },
    onBlur(event) {
      EditorEventBus.$emit(events.EDITOR_BLUR, event);

      return false;
    },
  },
};
</script>
