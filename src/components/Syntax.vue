<template>
  <span class="ide" v-html="stylizedContent"></span>
</template>

<style lang="scss" scoped>
.ide {
  font-family: $editor-font;
  margin: 0;
  padding: 0;
}

::v-deep .symbol {
  color: $symbol;
}

::v-deep .function, ::v-deep .parens {
  color: $function;
}

::v-deep .maths, ::v-deep .percent {
  color: $math;
}

::v-deep .gold {
  color: $gold;
}

::v-deep .silver {
  color: $silver;
}

::v-deep .copper {
  color: $copper;
}

::v-deep .item {
  color: $item;
}
</style>

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
