<template>
  <div class="price-info">
    <div class="quantity">{{ quantity }} items selected</div>
    <div class="price">
      <em>Total: ${{ amount }}</em>
      <span>incl. printing costs, plus shipping</span>
    </div>
  </div>
</template>

<script setup>
const { amount, quantity } = defineProps({
  amount: {
    type: [Number, String],
    default: 0,
  },
  quantity: {
    type: [Number, String],
    default: 0,
  },
});
</script>

<style lang="less" scoped>
.price-info {
  padding: 5px 0;

  &.is-mobile {
    padding: 0 15px 10px 15px;
    .price {
      > em {
        font-size: 16px;
      }
    }
  }
  .price {
    display: flex;
    align-items: center;
    > em {
      font-size: 24px;
      font-weight: 500;
      font-style: normal;
      margin-right: 15px;
    }
  }
}
</style>