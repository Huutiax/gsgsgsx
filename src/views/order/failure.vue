<template>
  <div>
    <a-result status="success" title="Congratulate!">
      <template #subTitle>
        <div>
          <p style="margin-bottom: 0">Order Failed. You Haven't pay yet.</p>
          <p>Thank you for your support of iLoveNFT. Thank you!</p>
        </div>
      </template>

      <template #extra>
        <div>
          <a-button type="link" @click="handleAction('back')"
            >Continue to DIY</a-button
          >
        </div>
      </template>
    </a-result>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const { params } = useRoute();

const handleAction = (type) => {
  if (type === "back") {
    router.push("/diy");
    return;
  }
  router.push(`/order/${params.id}`);
};
</script>

<style lang="less" scoped>
</style>