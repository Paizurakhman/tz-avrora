<template>
  <div>
    <div class="organization">
      <div class="organization__header">
        <div class="organization__title">Организационная структура</div>
      </div>
      <div class="organization__body">
        <button class="btn base-btn" @click="$emit('add')">
          <span>+</span>
          <span>добавить</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrganizationStructure"
}
</script>

<style scoped lang="scss">
@import "assets/style/variables";
  .organization {
    margin: 30px auto;
    &__header {
      background: $base-color;
      padding: 20px;
      color: #FFFFFF;
      margin-bottom: 15px;
    }
    &__title {
      font-size: 1.1em;
      text-transform: uppercase;
    }
  }
</style>
