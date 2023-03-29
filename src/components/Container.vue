<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script setup>
</script>

<style lang="less" scoped>
.container {
  width: 980px;
  margin: 0 auto;

  @media screen and (max-width: 980px) {
    width: 100%;
    padding: 10px;
  }
}
</style>