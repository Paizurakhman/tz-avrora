<template>
  <div class="add-modal">
    <div class="add-modal__content">
      <label>Имя организации</label>
      <base-input
        v-model="nameOrganization"
        placeholder="Имя организации"
        @input.native="updateValue"
      />
      <label>Фактическое количество</label>
      <base-input
        v-model.number="fact_count"
        placeholder="Фактическое количество"
        type="number"
        @input.native="updateValue"
      />
    </div>
  </div>
</template>

<script>
import BaseInput from "~/components/BaseInput";
export default {
  name: "AddData",
  components: {BaseInput},
  data() {
    return {
      nameOrganization: null,
      fact_count: null,
    }
  },
  methods: {
    updateValue() {
      this.$emit('input', {
        nameOrganization: this.nameOrganization,
        fact_count: this.fact_count,
      })
    }
  },
}
</script>

<style scoped lang="scss">
.add-modal {
  width: 500px;
  max-width: 100%;
  &__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    grid-row-gap: 15px;
  }
}
</style>
