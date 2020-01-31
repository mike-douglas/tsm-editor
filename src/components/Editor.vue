<template>
  <div class="editor-container">
    <EditorEventLayer class="editor" ref="editor"
      v-bind:initial-content="content" />
    <div class="editor-status">
      <Tooltip class="tooltip" text="Reformats your string to make it more readable!">
        <label>
          <input class="check" type="checkbox" v-model="checked" />
          <span class="text">Beautify</span>
        </label>
      </Tooltip>
    </div>
  </div>
</template>

<script>
import EditorEventLayer from '@/components/EditorEventLayer.vue';
import Tooltip from '@/components/Tooltip.vue';

export default {
  name: 'Editor',
  components: {
    EditorEventLayer,
    Tooltip,
  },
  computed: {
    content() {
      return this.$store.state.formula;
    },
    checked: {
      get() {
        return this.$store.state.cleanUp;
      },
      set(value) {
        this.$store.commit('updateCleanUp', value);
        this.$gtag.event('toggleCleanup', {
          event_category: 'settings',
          event_label: 'default',
          value,
        });
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.editor-status {
  padding-left: 0;
  margin-top: $padding-sm;
}

.check {
  font-size: $ts-lg;
}

.text {
  vertical-align: middle;
  font-weight: bold;
}
</style>
