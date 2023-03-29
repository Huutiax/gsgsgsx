<template>
  <div class="size-select">
    <ul class="product-list">
      <li v-for="(item, skuId) in products" :key="skuId" class="product-item">
        <!-- <div class="product-item__close">
          <i class="iconfont icon-close" @click="deleteProduct(skuId)"></i>
        </div> -->

        <div class="product-item__views">
          <div v-for="(viewItem, viewKey) in item.printData" :key="viewKey">
            <a-tooltip
              color="#fff"
              :overlayStyle="{ width: '380px', height: '440px' }"
              overlayClassName="svg-viewer-tooltip"
            >
              <SvgViewer :dataSource="viewItem" />
              <template #title>
                <div class="tooltip-svg-viewer">
                  <SvgViewer :dataSource="viewItem" />
                </div>
              </template>
            </a-tooltip>
          </div>
        </div>
        <div style="margin-top: 5px; display: flex; gap: 20px">
          <div>Color: {{ item.sku.name }}</div>
          <div>
            Price:
            <span style="color: green; font-size: 16px"
              >${{ item.skuPrintPrice }}</span
            >
          </div>
        </div>
        <ul class="quantity-list">
          <li
            v-for="(sizeItem, index) in item.sizeData"
            :key="index"
            class="quantity-item"
          >
            <span>{{ sizeItem.size }}</span>
            <a-input-number
              v-model:value="sizeItem.quantity"
              :min="0"
              :max="100"
            />
          </li>
        </ul>
      </li>
    </ul>

    <!-- 满多少件才接单提示 -->
    <div v-show="remainQuantity > 0" style="margin-top: 15px; font-size: 16px">
      NFT customization needs more than
      <span style="color: red">50</span> pieces,
      <span style="color: red">{{ remainQuantity }}</span>
      {{ remainQuantity > 1 ? "pieces" : "piece" }} remain.
    </div>
  </div>
</template>

<script setup>
import { computed, watch, toRef, toRefs } from "vue";
import DesignViewer from "./DesignViewer.vue";
import SvgViewer from "@/components/SvgViewer.vue";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
const products = toRef(props, "modelValue");
watch(props.modelValue, (newV) => {
  console.log("products", newV);
});

const remainQuantity = computed(() => {
  let totalQuantity = 0;
  if (Object.keys(products.value).length === 0) {
    return 0;
  }
  for (let key in products.value) {
    totalQuantity += products.value[key].sizeData
      .map((item) => item.quantity)
      .reduce((a, b) => a + b);
  }
  return totalQuantity > 50 ? 0 : 50 - totalQuantity;
});

const emit = defineEmits(["update:modelValue", "close"]);
const deleteProduct = (skuId) => {
  delete products[skuId];
  emit("update:modelValue", products);
};

const handleClose = () => {
  emit("close");
};
</script>

<style lang="less" scoped>
@import "@/styles/var.less";

// .size-select {
//   padding: 0 25px;
// }
.product-item {
  border: @border-base;
  border-radius: 4px;
  padding: 15px;
  position: relative;

  & + .product-item {
    margin-top: 20px;
  }

  &__close {
    position: absolute;
    right: 10px;
    top: 0;
    font-size: 22px;
    color: #777;
    cursor: pointer;
    z-index: 2;

    .iconfont {
      font-size: 13px;
    }

    &:hover {
      opacity: 0.5;
    }
  }

  &__views {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    > div {
      width: 60px;
      height: 60px;
      box-sizing: border-box;
      padding: 5px;
      border: 1px solid #f1f2f3;
      border-radius: 4px;

      > svg {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.quantity-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 5px;

  .quantity-item {
    display: flex;
    flex-direction: column;
    // align-items: center;
    justify-content: center;

    :deep(.ant-input-number) {
      width: 65px;
    }
  }
}

.tooltip-svg-viewer {
  width: 350px;
  height: 350px;

  > svg {
    width: 100%;
    height: 100%;
  }
}
</style>

<style>
.ant-tooltip.svg-viewer-tooltip {
  max-width: unset !important;
}
</style>