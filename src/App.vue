<script setup>
import { RouterLink, RouterView } from "vue-router";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import Container from "@/components/Container.vue";
import { onBeforeMount, onUnmounted, ref } from "vue";
import { debounce } from "throttle-debounce";
import { useMainStore } from "@/stores/main.js";
import { storeToRefs } from "pinia";

const mainStore = useMainStore();
const { setIsMobile } = mainStore;
const { isMobile } = storeToRefs(mainStore);
const handleResize = debounce(300, (e) => {
  const width = e.target.innerWidth;
  setIsMobile(width <= 768);
});

onBeforeMount(() => {
  setIsMobile(document.documentElement.clientWidth <= 768);
  window.addEventListener("resize", handleResize);
});
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <div :class="['page-wrapper', { 'is-mobile': isMobile }]">
    <AppHeader />

    <main>
      <RouterView />
    </main>

    <AppFooter v-if="!isMobile" />
  </div>
</template>

<style scoped lang="less">
@import "@/styles/var.less";
.page-wrapper {
  padding-top: var(--header-height);

  &.is-mobile {
    padding-top: @header-height-mobile;
    padding-bottom: @footer-height-mobile + 15px;
  }
}
</style>
