<template>
  <section class="tab-panel">
    <header>
      <ul>
        <li v-for="tab in tabs"
          :key="tab"
          :class="{ 'active-tab': activeTab === tab }"
          @click="switchTab(tab)">
          <span>
            <slot :name="getTabHeadSlotName(tab)">
              {{ tab }}
            </slot>
          </span>
        </li>
      </ul>
    </header>
    <div class="tab-body">
      <div>
        <slot :name="tabPanelSlotName"></slot>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.tab-panel header {
  margin: 0;
  padding: 0;
}

.tab-panel ul {
  display: inline;
  margin: 0;
  padding: 0;
}

.tab-panel ul li {
  display: inline-block;
  padding: $padding-sm $padding $padding-sm;
  margin: 0 0 0 $padding-sm;
  min-width: 6em;
  font-size: $ts-lg;
  font-weight: bold;
  border-top-left-radius: $border-radius * 2;
  border-top-right-radius: $border-radius * 2;
  background-color: $panel-background;
  cursor: pointer;
}

.tab-panel ul li span {
  color: $txt-faded;
}

.tab-panel ul li.active-tab span {
  color: $txt-loud;
}

.tab-panel ul li:hover {
  background-color: adjust-color($panel-background-active, $lightness: 2%);
}

.tab-panel ul li.active-tab, .tab-body {
  background-color: $panel-background-active;
}

@media only screen and (max-width : $mobile-breakpoint) {
  .tab-panel ul li {
    min-width: 0;
    font-size: $ts-med;
  }
}
</style>

<script>
export default {
  name: 'TabView',
  props: {
    defaultTab: String,
    tabs: Array,
  },
  data() {
    return {
      activeTab: this.defaultTab,
    };
  },
  computed: {
    tabPanelSlotName() {
      return `tab-panel-${this.activeTab}`;
    },
  },
  methods: {
    getTabHeadSlotName(tabName) {
      return `tab-head-${tabName}`;
    },
    switchTab(tabName) {
      this.activeTab = tabName;
    },
  },
};
</script>
