<template>
  <div id="app">
    <section id="editor" class="panel">
      <div class="hero">
        <h1>TSM Custom String Editor</h1>
      </div>
      <p>
        Paste an existing custom string below, or just start typing to try it out!
      </p>
      <Editor ref="editor" v-model="priceString" :cleanUpSyntax="cleanUpSyntax" />
    </section>
    <TabView :tabs="tabs" :defaultTab="defaultTab">
      <template slot="tab-head-reference">
        String Reference
      </template>
      <template slot="tab-panel-reference">
        <section id="reference" class="panel">
          <CommandReference />
        </section>
      </template>
      <template slot="tab-head-about">
        About
      </template>
      <template slot="tab-panel-about">
        <section id="about" class="panel">
          <About />
        </section>
      </template>
      <template slot="tab-head-news">
        News
      </template>
      <template slot="tab-panel-news">
        <section id="news" class="panel">
          <MarkdownContent />
        </section>
      </template>
    </TabView>
    <footer>
      Made with <Icon name="heart" /> by trenchy
    </footer>
  </div>
</template>

<script>
import Editor from '@/components/editor/Editor.vue';
import CommandReference from '@/components/reference/CommandReference.vue';
import TabView from '@/components/TabView.vue';
import About from '@/components/About.vue';
import MarkdownContent from '@/components/MarkdownContent.vue';
import Icon from '@/components/Icon.vue';

import {
  UPDATE_PRICESTRING, GET_PRICESTRING, SAVE_PRICESTRING,
  UPDATE_CLEANUPFLAG,
} from '@/lib/store';

export default {
  name: 'app',
  components: {
    Editor,
    CommandReference,
    TabView,
    About,
    Icon,
    MarkdownContent,
  },
  data() {
    return {
      defaultTab: 'reference',
      tabs: ['reference', 'about', 'news'],
    };
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

footer {
  font-size: $ts-sm;
  color: rgba(255, 255, 255, 0.2);
  background-color: $panel-background-active;
  padding: $padding-lg;
  text-align: center;
}

.hero {
  font-size: $ts-lg;
}

.hero > * {
  margin: 0;
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
  padding: 0;
}

h1 {
  font-size: $ts-xl;
}

h2 {
  font-size: $ts-lg;
  color: $txt-mid;
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

a:hover, a:active {
  color: $txt-action;
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
