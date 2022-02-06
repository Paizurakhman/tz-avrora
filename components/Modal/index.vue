<template>
  <div class="modal" :class="{ modal_active: modalActive }" @click.self="close">
    <div class="modal__content">
      <div class="modal__header">
        <div class="modal__title">
          <slot name="title"></slot>
        </div>
        <div class="modal__close" @click="close">
          <i class="fas fa-times"></i>
        </div>
      </div>
      <div class="modal__body">
        <slot name="body"></slot>
      </div>
      <div class="modal__action">
        <slot name="action"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: ['modalActive'],
  methods: {
    close() {
      this.$emit("toggle");
    }
  }
};
</script>


<style lang="scss" scoped>
@import "assets/style/variables";
.modal {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  transition: all 0.3s ease;
  opacity: 0;
  visibility: hidden;
  &.modal_active {
    opacity: 1;
    visibility: visible;
    .modal__content {
      top: 50%;
    }
  }
  &__content {
    min-width: 200px;
    max-width: 95%;
    min-height: 150px;
    background: #FFFFFF;
    left: 50%;
    transform: translate(-50%, -50%);
    position: fixed;
    top: 30%;
    transition: all 0.3s ease;
    border-radius: 10px;
  }
  &__header {
    padding: 1.5em 1.5em 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $base-color;
  }
  &__title {
    font-weight: 500;
    font-size: 1.5em;
    text-transform: capitalize;
  }
  &__close {
    cursor: pointer;
    i {
      font-size: 1.5em;
      font-weight: 300;
    }
  }
  &__body {
    padding: 1.5em;
  }
  &__action {
    padding: 0 1.5em 1.5em;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
