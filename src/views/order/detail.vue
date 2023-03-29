<template>
  <div>订单id: {{ orderId }}</div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const { params } = useRoute();
const orderId = ref(params.id);
</script>

<style lang="less" scoped>
</style>