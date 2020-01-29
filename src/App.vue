<template>
  <div id="app" :style="styles">
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

import Editor from '@/components/Editor.vue';
import CommandReference from '@/components/CommandReference.vue';

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
  width: 100%;
  font-family: var(--page-font);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-normal);
}

h1, h2, h3 {
  margin: 0 0 var(--padding-normal) 0;
  padding: 0;
}

h1 {
  font-size: var(--size-large);
}

h2 {
  font-size: var(--size-medium);
}

h3 {
  font-size: var(--size-normal);
  color: var(--text-faded);
}

.panel {
  padding: var(--padding);
}

.token {
  font-family: var(--panel-font);
}

.symbol {
  color: rgb(115, 209, 248);
}

.function, .parens {
  color: rgb(0, 191, 161);
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
#reference {
  margin-top: var(--padding-large);
}
</style>
