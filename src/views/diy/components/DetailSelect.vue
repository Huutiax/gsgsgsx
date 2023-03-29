<template>
  <div class="detail-select">
    <div class="detail-item">
      <span>Price: </span>
      <span style="color: green; font-size: 16px">${{ price }}</span>
    </div>
    <div class="detail-item">
      <span>Color: </span>
      <ul class="color-list">
        <li
          v-for="(skuItem, index) in props.skus"
          :key="index"
          class="color-item"
          :class="{ 'is-actived': props.sku.color === skuItem.color }"
          @click="changeSku(skuItem)"
          :style="{ backgroundColor: `#${skuItem.color}` }"
        >
          <i
            v-show="skuItem.color === sku.color"
            class="iconfont icon-checked"
          ></i>
        </li>
      </ul>
    </div>
    <div class="detail-item">
      <span>Design: </span>
      <a-radio-group v-model:value="printOptions.frontDesign">
        <a-radio value="default">Classic</a-radio>
        <a-radio value="small" v-if="isTShirt">Fashion</a-radio>
        <a-radio value="big" v-if="isTShirt">Personality</a-radio>
      </a-radio-group>
    </div>
    <!-- 衣服 -->
    <ul v-if="hasBackPrint">
      <li class="detail-item">
        <span>Back Print: </span>
        <a-radio-group v-model:value="printOptions.back" option-type="button">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </li>
      <!-- <li class="detail-item">
        <span>Left Print: </span>
        <a-radio-group v-model:value="printOptions.left" option-type="button">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </li>
      <li class="detail-item">
        <span>Right Print: </span>
        <a-radio-group v-model:value="printOptions.right">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </li> -->
    </ul>
  </div>
</template>

<script setup>
import { computed, watch } from "vue";

const props = defineProps({
  skus: {
    type: Array,
    default: () => [],
  },
  printOptions: {
    type: Object,
    default: () => ({}),
  },
  sku: {
    type: Object,
    default: () => ({}),
  },
  spu: {
    type: Object,
    default: () => ({}),
  },
  svgViewerData: {
    type: Object,
    default: () => ({}),
  },
});
const { printOptions } = props;

/** 触发change事件，传递form参数 */
const emit = defineEmits(["update:printOptions", "update:sku"]);
watch(
  () => printOptions,
  (newV) => {
    emit("update:printOptions", {
      ...newV,
    });
  },
  { immediate: true, deep: true }
);

const price = computed(() => {
  const svgViewerData = props.svgViewerData;
  // 基础价 + 正面喷图价 + 背面喷图价
  const frontPrintPrice =
    svgViewerData.front && svgViewerData.front.isPrint
      ? svgViewerData.front.price || 0
      : 0;
  const backPrintPrice =
    svgViewerData.back && svgViewerData.back.isPrint
      ? svgViewerData.back.price || 0
      : 0;
  return props.spu.price + frontPrintPrice + backPrintPrice;
});

const isTShirt = computed(() => {
  return props.spu.title === "T Shirt";
});
const hasBackPrint = computed(() => {
  return !props.spu.title.match(/Shorts|Cap|Bucket Hat|Frisbee/);
});

const changeSku = (item) => {
  emit("update:sku", item);
};
</script>

<style lang="less" scoped>
@color-main: #101010;
@border-color: #f8f8fa;

.detail-select {
  padding: 0 25px;
}

:deep(.ant-radio-group) {
  .ant-radio-wrapper + .ant-radio-wrapper {
    margin-left: 3px;
  }
  .ant-radio {
    display: none;

    & + span {
      border-radius: 4px;
      border: 2px solid @border-color;
      padding: 3px 13px;
      background-color: @border-color;
    }

    &.ant-radio-checked {
      & + span {
        border-color: @color-main;
        background-color: #fff;
      }
    }
  }
}

.detail-item {
  color: @color-main;

  margin-bottom: 25px;
  display: flex;

  > span {
    // font-family: SourceHanSansSC-bold, -apple-system, BlinkMacSystemFont,
    //   "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
    //   "Helvetica Neue", sans-serif;
    // width: 120px;
    // text-align: right;
    padding-right: 10px;
    line-height: 30px;
  }
}

.color-list {
  @item-size: 36px;
  @active-color: #85c545;

  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 0;

  .color-item {
    width: @item-size;
    height: @item-size;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #dedede;
    overflow: hidden;

    &:hover {
      border-color: @active-color;
    }

    &.is-actived {
      border: 2px solid @active-color;
    }

    > i {
      color: @color-main;
      background: @active-color;
      width: 14px;
      height: 14px;
      position: absolute;
      bottom: -1px;
      right: -1px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 10px;
    }
  }
}
</style>