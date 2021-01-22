<template>
  <div id="app">
    <section id="editor" class="panel">
      <div class="hero">
        <h1>TSM Price String Editor</h1>
      </div>
      <p>
        Paste your string below or just start typing to try it out!
      </p>
      <h1>Editor</h1>
      <Editor ref="editor" v-model="priceString" :cleanUpSyntax="cleanUpSyntax" />
    </section>
    <section id="reference" class="panel">
      <h1>String Reference</h1>
      <CommandReference />
    </section>
    <footer>
      Made with ❤️ by trenchy
    </footer>
  </div>
</template>

<script>
import Editor from '@/components/editor/Editor.vue';
import CommandReference from '@/components/reference/CommandReference.vue';

import {
  UPDATE_PRICESTRING, GET_PRICESTRING, SAVE_PRICESTRING,
  UPDATE_CLEANUPFLAG,
} from '@/lib/store';

export default {
  name: 'app',
  components: {
    Editor,
    CommandReference,
  },
  computed: {
    priceString: {
      get() {
        return this.$store.getters.priceString;
      },
      set(newValue) {
        this.$store.commit(UPDATE_PRICESTRING, newValue);
        this.$store.dispatch(SAVE_PRICESTRING, newValue);
      },
    },
    cleanUpSyntax: {
      get() {
        return this.$store.getters.cleanUpSyntax;
      },
      set(newValue) {
        this.$store.commit(UPDATE_CLEANUPFLAG, newValue);
      },
    },
  },
  mounted() {
    this.$store.dispatch(GET_PRICESTRING).then((restoredString) => {
      this.$gtag.pageview({ page_path: window.location.pathname + window.location.hash });
      this.priceString = restoredString;
    });
  },
};
</script>

<style lang="scss" scoped>
#reference {
  margin-top: $padding-lg;
}

footer {
  font-size: $ts-sm;
  color: rgba(255, 255, 255, 0.2);
  text-align: center;
}

.hero {
  font-size: $ts-lg;
}

.hero > * {
  margin: 0;
}

.syntax-cleanup {
  font-size: $ts-sm
}

.editor-status {
  margin-bottom: $padding-sm;
}

.text {
  vertical-align: middle;
  font-weight: bold;
}

.right {
  text-align: right;
}
</style>

<style lang="scss">
body {
  background: $page-background;
  font-size: 115%;
  padding: 0;
  margin: 0;
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
  // margin: 0 0 $padding 0;
  padding: 0;
}

h1 {
  font-size: $ts-lg;
}

h2 {
  font-size: $ts-med;
}

h3 {
  font-size: $ts-med;
  color: $txt-faded;
}

.panel {
  padding: $padding;
}

p {
  line-height: $line-height;
}

a {
  color: $txt-mid;
  font-weight: bold;
}

@media only screen and (max-width : $mobile-breakpoint) {
  .hero {
    text-align: center;
  }

  .hero p {
    font-size: $ts-tiny;
  }

  .panel {
    padding: $padding-sm;
  }
}
</style>
