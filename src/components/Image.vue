<template>
  <picture class="image">
    <!-- 如果webp不为false，默认取传过来的webp，如果没有，则将原src地址后缀改为.webp -->
    <source
      v-if="webp !== false"
      type="image/webp"
      :srcset="webp || (src || '').replace(/\.png|\.jpg|\.jpeg/i, '.webp')"
    />

    <img :src="src" :alt="alt" :class="{ 'responsive-img': responsive }" />
  </picture>
</template>

<script setup>
const { src, alt, webp } = defineProps({
  src: {
    type: String,
  },
  alt: {
    type: String,
  },
  webp: {
    type: [Boolean, String],
  },
  responsive: {
    type: Boolean,
    default: true,
  },
});
</script>

<style lang="less" scoped>
.image {
  display: inline-block;
  vertical-align: middle;
}
</style>