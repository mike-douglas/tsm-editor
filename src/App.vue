<template>
  <div id="app">
    <section ref="editor"
    id="editor"
    class="panel"
    :class="{ 'fixed-editor' : panelScrollTop > 0 }">
      <div class="hero">
        <h1>TSM Custom String Editor</h1>
      </div>
      <p>
        Paste an existing custom string below, or just start typing to try it out!
      </p>
      <Editor v-model="priceString" :cleanUpSyntax="cleanUpSyntax" />
    </section>
    <section id="panels" :style="{ 'margin-top': panelScrollTop + 'px' }">
      <TabView :tabs="tabs" :defaultTab="defaultTab">
        <template slot="tab-head-reference">
          String Reference
        </template>
        <template slot="tab-panel-reference">
          <section class="panel">
            <CommandReference />
          </section>
        </template>
        <template slot="tab-head-about">
          About
        </template>
        <template slot="tab-panel-about">
          <section class="panel">
            <MarkdownContent page="about" />
          </section>
        </template>
        <template slot="tab-head-updates">
          Updates
        </template>
        <template slot="tab-panel-updates">
          <section class="panel">
            <MarkdownContent page="updates" />
          </section>
        </template>
      </TabView>
    </section>
    <footer>
      Made with <Icon name="heart" /> by trenchy
    </footer>
  </div>
</template>

<style lang="scss" scoped>
footer {
  font-size: $ts-sm;
  color: $txt-faded;
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

#app {
  margin: 0;
  padding: 0;
  width: 100%;
  font-family: $page-font;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $txt-normal;
}

#editor {
  margin-bottom: $padding-lg;
}

.fixed-editor {
  background-color: $page-background;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
}
</style>

<style lang="scss">
body {
  background: $page-background;
  font-size: 115%;
  padding: 0;
  margin: 0;
}

code {
  font-family: $editor-font;
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

li {
  line-height: $line-height;
  margin-bottom: $padding-normal;
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

<script>
import TabView from '@/components/TabView.vue';
import Editor from '@/components/editor/Editor.vue';
import CommandReference from '@/components/reference/CommandReference.vue';
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
    Icon,
    MarkdownContent,
  },
  data() {
    return {
      defaultTab: 'reference',
      tabs: ['reference', 'about', 'updates'],
      panelScrollTop: 0,
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
        this.$gtag.event('editorEvent', { action: 'cleanupSyntax' });
      },
    },
  },
  methods: {
    handleScroll() {
      this.panelScrollTop = window.scrollY > 0 ? this.$refs.editor.clientHeight : 0;
    },
  },
  mounted() {
    this.$store.dispatch(GET_PRICESTRING).then((restoredString) => {
      this.$gtag.pageview({ page_path: window.location.pathname + window.location.hash });
      this.priceString = restoredString;
    });
  },
  created() {
    if (window.screen.width > 380) {
      window.addEventListener('scroll', this.handleScroll);
    }
  },
  beforeDestroy() {
    if (window.screen.width > 380) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  },
};
</script>
