<template>
  <ul class="type-select-list">
    <li
      v-for="(item, index) in diyData"
      :key="index"
      class="item"
      :class="{ 'is-selected': modelValue.title === item.title }"
      @click="changeSelectedItem(item)"
    >
      <div class="item-img">
        <img :src="item.img" :alt="item.title" />
      </div>
      <div class="item-title">
        <div>
          <span>{{ item.title }}</span> <span>${{ item.price }}</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { onBeforeMount, reactive, defineEmits, watch } from "vue";
// window.priceData来源后端加载的资源文件
// https://callback.erp.bz-bss.com/price.js
const { typeData: diyData } = window.priceData;
const { modelValue } = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits(["update:modelValue"]);
const changeSelectedItem = (currentItem) => {
  emit("update:modelValue", currentItem);
};
</script>

<style lang="less" scoped>
.type-select-list {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  gap: 20px;
  font-size: 12px;
  justify-content: center;

  &.is-mobile {
    gap: 10px;

    .item {
      width: 80px;
      margin-bottom: 20px;

      &.is-selected {
        .item-title {
          height: unset;
          color: inherit;
          color: #000;

          > div {
            white-space: pre-wrap;
            background-color: unset;
          }
        }
      }

      .item-img {
        width: 80px;
        height: 80px;
      }
      .item-title {
        color: #555;
        height: unset;
        > div {
          line-height: 14px;
          display: flex;
          flex-direction: column;

          span + span {
            margin-top: 5px;
          }
        }
      }
    }
  }

  .item {
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.15s;
    width: 110px;
    box-sizing: border-box;

    .item-img {
      height: 110px;
      width: 110px;
      padding: 10px;
      box-sizing: border-box;
      border: 2px solid transparent;
      border-radius: 4px;
      background-color: rgb(240, 240, 240);

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .item-title {
      color: #000;
      // display: flex;
      // justify-content: center;
      position: relative;
      height: 20px;

      > div {
        background-color: unset;
        border-radius: 28px;
        transition: all 0.2s;
        height: 28px;
        line-height: 28px;
        transform-origin: 0 0;
        margin-top: 10px;
      }
    }

    &:hover {
      .item-img {
        border-color: #aaa;
      }
    }

    &.is-selected {
      .item-img {
        border-color: #000;
      }
      .item-title {
        color: #fff;
        > div {
          background-color: #000;
        }
      }
    }
  }
}
</style>