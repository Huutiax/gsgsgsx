<template>
  <div>
    <a-spin :spinning="loading">
      <a-result
        :status="isSuccess ? 'success' : 'error'"
        :title="isSuccess ? 'Congratulate!' : ''"
      >
        <template #subTitle>
          <div>
            <template v-if="!loading">
              <p v-if="isSuccess" style="margin-bottom: 0">
                Your custom requirements have been submitted, we will contact
                you within 24 hours;
              </p>
              <p v-else style="margin-bottom: 0">
                Order Failed. You Haven't pay yet.
              </p>
            </template>
            <p>Thank you for your support of iLoveNFT. Thank you!</p>
          </div>
        </template>

        <template #extra>
          <div>
            <!-- <a-button type="primary" @click="handleAction('order')"
            >View my order</a-button
          > -->
            <a-button type="link" @click="handleAction('back')"
              >Continue to DIY</a-button
            >
          </div>
        </template>
      </a-result>
    </a-spin>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { getOrderDetail, captureOrder } from "@/api";
import { onBeforeMount, ref } from "vue";

const router = useRouter();
const { params } = useRoute();

const isSuccess = ref(true);
const loading = ref(true);
onBeforeMount(async () => {
  loading.value = true;
  try {
    // 主动掉捕获订单状态接口，让后端及时更新支付状态
    await captureOrder(params.id);
    const data = await getOrderDetail(params.id);
    console.log("orderData: ", data);
    isSuccess.value = data.pay_status === 1;
  } catch (err) {
    isSuccess.value = false;
    console.error(err);
  }
  loading.value = false;
});

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