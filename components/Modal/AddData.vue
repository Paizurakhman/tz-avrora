<template>
  <div class="add-modal">
    <div class="add-modal__content">
      <label>Имя организации</label>
      <div class="base-input">
        <input
          :value="value.nameOrganization"
          placeholder="Имя организации"
          @input="updateValue"
          ref="name"
        />
      </div>
<!--      <base-input-->
<!--        v-model="nameOrganization"-->
<!--        placeholder="Имя организации"-->
<!--        @input.native="updateValue"-->
<!--      />-->
      <label>Фактическое количество</label>
      <div class="base-input">
        <input
          :value="value.fact_count"
          placeholder="Фактическое количество"
          @input="updateValue"
          type="number"
          ref="fact_count"
        />
      </div>
<!--      <base-input-->
<!--        v-model.number="fact_count"-->
<!--        placeholder="Фактическое количество"-->
<!--        type="number"-->
<!--        @input.native="updateValue"-->
<!--      />-->
    </div>
  </div>
</template>

<script>
import BaseInput from "~/components/BaseInput";
export default {
  name: "AddData",
  components: {BaseInput},
  props: ['value'],
  data() {
    return {
      nameOrganization: null,
      fact_count: null,
    }
  },
  methods: {
    updateValue() {
      this.$emit('input', {
        nameOrganization: this.$refs.name.value,
        fact_count: this.$refs.fact_count.value,
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
