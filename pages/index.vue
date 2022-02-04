<template>
  <div class="container">
    <div class="node node__header">
      <div></div>
      <div>Общее количество</div>
      <div>Фактическое количество</div>
      <div>Действия</div>
    </div>
    <TreeEmployer
      v-for="city in data.city"
      :key="city.name"
      :node="city"
    />
  </div>
</template>

<script>
import data from '@/assets/data/db.json'
export default {
  data() {
    return {
      data
    }
  },
}
</script>

<style lang="scss">
.container {
  max-width: 1140px;
  margin: 0 auto;
  box-shadow: 0 2px 15px rgba(0,0,0,0.05);
  .node {
    //color: #ccf3ff;
    display: grid;
    grid-template-columns: 3fr 1.5fr 1.5fr 1fr;
    cursor: pointer;
    & > div {
      padding: 10px;
    }
    &__header {
      background: rgb(45, 62, 80);
      color: #FFF;
      cursor: default;
      & > div {
        border-left: 1px solid #FFFFFF;
      }
    }
    i {
      transition: 0.3s ease-in-out;
      margin-right: 10px;
      &.fa-chevron-right {
        font-weight: 400;
        font-size: 12px;
      }
    }
    .arrow_active {
      transform: rotate(90deg);
    }
  }
}
</style>
