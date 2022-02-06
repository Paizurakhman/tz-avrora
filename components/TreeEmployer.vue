<template>
  <li>
    <div
      @click="handleClick"
      class="node"
      :style="{ background: node.background }"
    >
      <div :style="{'padding-left': `${space}px`}">
        <i
          v-if="hasChildren"
          class="fas fa-chevron-right"
          :class="{ 'arrow_active': open }"
        ></i>
        {{ node.name }}
      </div>
      <div>{{ total }}</div>
      <div>{{ node.fact_count }}</div>
      <div class="actions">
        <button @click.stop="handleEdit(node)" class="btn transparent-btn">
          <i class="fas fa-pen"></i>
        </button>
        <button @click.stop="handleDelete(node)" class="btn transparent-btn">
          <i class="fas fa-times-circle"></i>
        </button>
      </div>
    </div>

    <transition-group
      tag="ul"
      name="expand"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
    >
      <TreeEmployer
        v-if="open"
        v-for="child in node.children"
        :key="child.name"
        :node="child"
        :space="space + 20"
        @edit="(node) => $emit('edit', node)"
        @delete="(node) => $emit('delete', node)"
      />
    </transition-group>
  </li>
</template>

<script>
export default {
  name: "TreeEmployer",
  props: {
    node: Object,
    space: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      open: false,
      res: 0
    }
  },
  computed: {
    hasChildren() {
      return this.node.children && this.node.children.length > 0
    },
    total() {
      this.res = 0
      this.sum(this.node)
      return this.res
    }
  },
  methods: {
    enter(el) {
      el.style.height = 'auto'
      const height = getComputedStyle(el).height
      el.style.height = 0

      setTimeout(() => {
        el.style.height = height
      })
    },
    afterEnter(el) {
      el.style.height = 'auto'
    },
    leave(el) {
      el.style.height = getComputedStyle(el).height
      setTimeout(() => {
        el.style.height = 0
      })
    },

    handleClick() {
      this.open = !this.open
    },
    handleEdit(node) {
      this.$emit('edit', node)
    },
    handleDelete(node) {
      this.$emit('delete', node)
    },

    sum(node) {
      this.res += node.fact_count
      if (node.children) {
        for (const el of node.children) {
          this.sum(el)
        }
      }
    }
  },
}
</script>

<style scoped lang="scss">

.expand-enter-active,
.expand-leave-active {
  transition: height 0.3s ease-in-out;
  overflow: hidden;
}

.node {
  .actions {
    button {
      margin-right: 10px;
    }
    i {
      font-size: 1.4em;
    }
  }
}
</style>
