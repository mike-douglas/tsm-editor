<template>
  <div>
    <Syntax :code="content" :caret="caretPosition" />
  </div>
</template>

<script>
import EditorEventBus, { events } from '@/components/editor/eventbus';

import Syntax from '@/components/Syntax.vue';

/**
 * Renders the content of a string as part of the editor component.
 */
export default {
  name: 'EditorRender',
  components: {
    Syntax,
  },
  data: () => ({
    content: '',
    caretPosition: 0,
  }),
  mounted() {
    EditorEventBus.$on(events.EDITOR_INPUT, (newInput) => {
      this.content = newInput;
    });
    EditorEventBus.$on(events.EDITOR_CARET_CHANGED, ({ range }) => {
      this.caretPosition = range.startOffset;
    });
  },
};
</script>
