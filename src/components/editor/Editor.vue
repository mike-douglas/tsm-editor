<template>
  <div class="editor-container">
    <div class="editor-status right">
      <Tooltip class="tooltip" position="bottom-left"
        text="Reformats your string to make it more readable!">
        <label>
          <input class="check" type="checkbox" v-model="checked" />
          <span class="text">Beautify</span>
        </label>
      </Tooltip>
    </div>
    <EditorEventLayer class="editor" ref="editor"
      v-bind:initial-content="content" />
    <div class="editor-status">
      <Button type="xsmall link" icon="clipboard" :on-click="copyToClipboard">
        Copy to Clipboard
      </Button>
    </div>
  </div>
</template>

<script>
import EditorEventLayer from '@/components/editor/EditorEventLayer.vue';
import Tooltip from '@/components/Tooltip.vue';
import Button from '@/components/Button.vue';

export default {
  name: 'Editor',
  components: {
    EditorEventLayer,
    Tooltip,
    Button,
  },
  computed: {
    content() {
      return this.$store.state.priceString;
    },
    checked: {
      get() {
        return this.$store.state.cleanUpFlag;
      },
      set(value) {
        this.$store.commit('setCleanupFlag', value);
        this.$gtag.event('toggleCleanup', {
          event_category: 'settings',
          event_label: 'default',
          value,
        });
      },
    },
  },
  methods: {
    copyToClipboard() {
      if (this.$store.state.selectCallback) {
        this.$store.state.selectCallback();
        document.execCommand('copy');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.editor-status {
  padding-left: 0;
  margin: $padding-sm 0;
}

.check {
  font-size: $ts-lg;
}

.text {
  vertical-align: middle;
  font-weight: bold;
}

.right {
  text-align: right;
}

</style>
