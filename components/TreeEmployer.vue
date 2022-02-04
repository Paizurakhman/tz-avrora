<template>
  <div>
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
      <div>{{node.total}}</div>
      <div>{{ node.fact_count }}</div>
      <div class="actions">
        <button @click.stop="handleEdit(node)"><i class="fas fa-edit"></i></button>
        <button @click.stop="handleDelete(node)"><i class="fas fa-trash-alt"></i></button>
      </div>
    </div>

    <transition-group
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
      />
    </transition-group>
  </div>
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
      open: false
    }
  },
  computed: {
    hasChildren() {
      return this.node.children && this.node.children.length > 0
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
      console.log(node)
    },
    handleDelete(node) {
      console.log(node)
    }
  },
}
</script>

<style scoped lang="scss">

  .expand-enter-active,
  .expand-leave-active
  {
    transition: height 0.3s ease-in-out;
    overflow: hidden;
  }
  .node {
    .actions {
      i {
        font-size: 1.3em;
      }
    }
  }
</style>
