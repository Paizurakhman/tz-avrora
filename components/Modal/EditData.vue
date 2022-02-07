<template>
  <div class="edit-modal">
    <div class="edit-modal__content">
      <label>Имя организации</label>
      <div class="base-input">
        <input
          :value="value.nameOrganization"
          placeholder="Имя организации"
          @input="updateValue"
          ref="name"
        />
      </div>
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
    </div>

    <div class="add-section">
      <div class="add-section__content">
        <button class="btn transparent-btn" @click="addSection">
          <i class="fas fa-plus" :class="{ active: open }"></i>
        </button>
        Добавить секция
      </div>
      <dropdown>
        <div class="edit-modal__content" v-if="open">
          <label>Имя секции</label>
          <div class="base-input">
            <input
              :value="value.sectionNameOrganization"
              placeholder="Имя организации"
              @input="updateValue"
              ref="section_name"
            />
          </div>
<!--          <base-input-->
<!--            v-model="sectionNameOrganization"-->
<!--            placeholder="Имя организации"-->
<!--            @input.native="updateValue"-->
<!--          />-->
          <label>Фактическое количество</label>

          <div class="base-input">
            <input
              :value="value.sectionFact_count"
              placeholder="Фактическое количество"
              @input="updateValue"
              type="number"
              ref="section_fact_count"
            />
          </div>
<!--          <base-input-->
<!--            v-model.number="sectionFact_count"-->
<!--            placeholder="Фактическое количество"-->
<!--            type="number"-->
<!--            @input.native="updateValue"-->
<!--          />-->
        </div>
      </dropdown>
    </div>
  </div>
</template>

<script>
import BaseInput from "~/components/BaseInput";
export default {
  name: "EditData",
  components: {BaseInput},
  props: ['value'],
  data() {
    return {
      nameOrganization: null,
      fact_count: null,
      open: false,
      sectionNameOrganization: null,
      sectionFact_count: null
    }
  },
  methods: {
    addSection() {
      this.open = !this.open
    },
    updateValue() {
      this.$emit('input', {
        nameOrganization: this.$refs.name.value,
        fact_count: this.$refs.fact_count.value,
        sectionNameOrganization: this.$refs.section_name.value,
        sectionFact_count: this.$refs.section_fact_count.value
      })
    }
  },
}
</script>

<style scoped lang="scss">
  .edit-modal {
    width: 500px;
    max-width: 100%;
    &__content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      grid-row-gap: 15px;
    }
    .add-section {
      &__content {
        padding: 10px 0;
        font-size: 18px;
        i {
          font-weight: 400;
          font-size: 18px;
          transition: 0.3s ease;
          &.active {
            transform: rotate(45deg);
          }
        }
      }
    }
  }
</style>
