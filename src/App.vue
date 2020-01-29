<template>
  <div id="app" :style="styles" class="flex-panel-row">
    <section id="editor" class="panel">
      <h1>Formula Editor</h1>
      <p>
        Use the boxes below to write a TSM price formula.
      </p>
      <Editor />
    </section>
    <section id="reference" class="panel">
      <CommandReference />
    </section>
  </div>
</template>

<script>
import styles from '@/lib/styles';

import Editor from './components/Editor.vue';
import CommandReference from './components/CommandReference.vue';

export default {
  name: 'app',
  components: {
    Editor,
    CommandReference,
  },
  data() {
    return {
      styles,
    };
  },
};
</script>

<style>
body {
  background-color: rgb(28, 28, 28);
}

#app {
  margin: 0;
  padding: 0;
  font-family: var(--page-font);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-normal);
}

h1 {
  font-size: var(--size-large);
}

h2 {
  font-size: var(--size-medium);
}

.panel {
  padding: var(--padding);
}

.symbol {
  color: rgb(115, 209, 248);
}

.function {
  color: rgb(0, 191, 161);
}

.parens {
  color: orange;
}

.maths {
  color: rgb(38, 145, 211);
}

.gold {
  color: orange;
}

.silver {
  color: silver;
}

.copper {
  color: rgb(228, 183, 125);
}

.item {
  color: rgb(205, 117, 185);
}
</style>

<style scoped>
#editor {
  flex-grow: 1;
}

#reference {
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 15em;
}

.flex-panel-row {
  display: flex;
  flex-direction: row;
}
</style>
