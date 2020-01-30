<template>
  <div id="app">
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
    <footer>
      Made with ❤️ by trenchy
    </footer>
  </div>
</template>

<script>

import Editor from '@/components/Editor.vue';
import CommandReference from '@/components/CommandReference.vue';

export default {
  name: 'app',
  components: {
    Editor,
    CommandReference,
  },
};
</script>

<style lang="scss">
body {
  background: $page-background url('~@/assets/noise.png');
  font-size: 115%;
}

#app {
  margin: 0;
  padding: 0;
  width: 100%;
  font-size: 1.0em;
  font-family: $page-font;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $txt-normal;
}

h1, h2, h3 {
  margin: 0 0 $padding 0;
  padding: 0;
}

h1 {
  font-size: $ts-lg;
}

h2 {
  font-size: $ts-med;
}

h3 {
  font-size: $ts-normal;
  color: $txt-faded;
}

.panel {
  padding: $padding;
}
</style>

<style lang="scss" scoped>
#reference {
  margin-top: $padding-lg;
  max-width: 60em;
}

footer {
  font-size: $ts-sm;
  color: rgba(255, 255, 255, 0.2);
  text-align: center;
}
</style>
