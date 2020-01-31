<template>
  <span class="ide" v-html="stylizedContent"></span>
</template>

<script>
import { stylizeString } from '@/lib/stylizer';

export default {
  name: 'Syntax',
  props: {
    code: String,
  },
  computed: {
    stylizedContent() {
      return stylizeString(this.code);
    },
  },
};
</script>

<style lang="scss" scoped>
.ide {
  font-family: $editor-font;
  margin: 0;
  padding: 0;
}

::v-deep .symbol {
  color: rgb(115, 209, 248);
}

::v-deep .function, ::v-deep .parens {
  color: rgb(0, 191, 161);
}

::v-deep .maths {
  color: rgb(38, 145, 211);
}

::v-deep .gold {
  color: orange;
}

::v-deep .silver {
  color: silver;
}

::v-deep .copper {
  color: rgb(228, 183, 125);
}

::v-deep .item {
  color: rgb(205, 117, 185);
}
</style>
