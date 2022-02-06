<template>
  <div class="base-input">
    <input
      :type="type"
      :value="value"
      @input="updateValue($event.target.value)"
      :placeholder="placeholder"
      :class="{ invalid: errorMessages }"
    >
    <span class="error" v-for="error in errorMessages" v-if="error">{{ error }}</span>
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    type: {
      type: String,
      default: "text"
    },
    value: {
      type: [Number, String],
      default: null
    },
    placeholder: {
      type: String,
      default: ""
    },
    errorMessages: {
      type: [Array, Object],
    },
  },
  methods: {
    updateValue(value) {
      this.$emit("input", value)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
