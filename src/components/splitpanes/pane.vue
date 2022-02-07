<template>
  <div class="splitpanes__pane relative" @click="onPaneClick($event, _.uid)" :style="style">
    <div v-if="!hiddenOptions" class="btns">
      <n-icon class="btn" @click="$emit('boxDetail')">
        <LogoDropbox />
      </n-icon>
      <n-icon class="btn" @click="$emit('detail')">
        <ExtensionPuzzleOutline />
      </n-icon>
      <n-icon v-if="!hiddenRm" class="btn" @click="$emit('rm')">
        <Trash />
      </n-icon>
      <n-dropdown :options="options" @select="key => $emit('add', key)">
        <n-icon class="btn" @click="$emit('addR')">
          <Add />
        </n-icon>
      </n-dropdown>
    </div>
    <slot />
  </div>
</template>

<script>
import { Add, Trash, DocumentOutline, LogoDropbox, ExtensionPuzzleOutline } from '@vicons/ionicons5'
export default {
  name: 'pane',
  inject: ['requestUpdate', 'onPaneAdd', 'onPaneRemove', 'onPaneClick'],

  props: {
    size: { type: [Number, String], default: null },
    minSize: { type: [Number, String], default: 0 },
    maxSize: { type: [Number, String], default: 100 },
    hiddenOptions: { type: Boolean, default: false },
    hiddenRm: { type: Boolean, default: false },
  },

  emit: ['add', "rm", "detail", 'boxDetail'],

  data: () => ({
    style: {}
  }),

  setup() {
    return {
      options: [
        { label: '右', key: 'r' },
        { label: '左', key: "l" },
        { label: '上', key: 't' },
        { label: '下', key: 'b' }
      ],
    }
  },

  mounted() {
    this.onPaneAdd(this)
  },

  beforeUnmount() {
    this.onPaneRemove(this)
  },

  methods: {
    // Called from the splitpanes component.
    update(style) {
      this.style = style
    }
  },

  computed: {
    sizeNumber() {
      return (this.size || this.size === 0) ? parseFloat(this.size) : null
    },
    minSizeNumber() {
      return parseFloat(this.minSize)
    },
    maxSizeNumber() {
      return parseFloat(this.maxSize)
    }
  },

  watch: {
    sizeNumber(size) {
      this.requestUpdate({ target: this, size })
    },
    minSizeNumber(min) {
      this.requestUpdate({ target: this, min })
    },
    maxSizeNumber(max) {
      this.requestUpdate({ target: this, max })
    }
  },
  components: {
    Add,
    Trash,
    DocumentOutline,
    LogoDropbox,
    ExtensionPuzzleOutline,
  }
}
</script>
<style scoped>
.btns {
  @apply flex absolute z-10  right-0 top-0 m-2;
}
.btn {
  @apply mx-1 w-6 h-6 flex justify-center items-center text-purple-600 font-semibold
      rounded-full border border-purple-200 dark:border-purple-800
      hover:text-white hover:bg-purple-600 hover:border-transparent
      focus:outline-none focus:ring-2 ring-purple-600 ring-opacity-40;
}
</style>