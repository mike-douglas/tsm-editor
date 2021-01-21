<template>
  <div id="app">
    <section id="editor" class="panel">
      <div class="hero">
        <h1>TSM Price String Editor</h1>
        <p>Custom Price Strings Made Easy and Beautiful</p>
      </div>
      <p>
        Hi goblin! This tool makes it easy to create new custom price strings for the <a target="_new" href="https://www.tradeskillmaster.com/">TradeSkillMaster</a> addon in World of Warcraft. It provides some syntax highlighting as well as autocomplete features to make writing new formulas easy and readable.
      </p>
      <p>
        Paste your string below or just start typing to try it out!
      </p>
      <div class="editor-status right">
        <Tooltip class="tooltip" position="bottom-left"
          text="Reformats your string to make it more readable!">
          <label>
            <input class="check" type="checkbox" v-model="cleanUpSyntax" />
            <span class="text">Beautify</span>
          </label>
        </Tooltip>
      </div>
      <Editor ref="editor" v-model="priceString" :cleanUpSyntax="cleanUpSyntax" />
    </section>
    <section id="reference" class="panel">
      <h2>Reference</h2>
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
import Tooltip from '@/components/Tooltip.vue';

import {
  UPDATE_PRICESTRING, GET_PRICESTRING, SAVE_PRICESTRING,
  UPDATE_CLEANUPFLAG,
} from '@/lib/store';

export default {
  name: 'app',
  components: {
    Editor,
    CommandReference,
    Tooltip,
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
        this.$gtag.event('editorEvent', { action: 'cleanupSyntax' });
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
  max-width: 60em;
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

.hero .p {
  color: $txt-faded;
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

  h1 {
    font-size: $ts-sm;
  }

  .panel {
    padding: $padding-sm;
  }
}
</style>
